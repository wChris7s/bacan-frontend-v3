import {
  AddToCartRequest,
  ApiError,
  AuthResponse,
  Cart,
  Category,
  ChangePasswordRequest,
  ConfirmForgotPasswordRequest,
  CreateProductRequest,
  CreateVentureRequest,
  FileUploadResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  Product,
  RegisterRequest,
  UpdateProductRequest,
  UpdateVentureRequest,
  User,
  Venture,
} from "~/lib/api/types";

const API_BASE_URL = "http://localhost:8081/api";

// Token management
let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenManager = {
  setTokens(access: string, refresh: string) {
    accessToken = access;
    refreshToken = refresh;
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    }
  },

  getAccessToken(): string | null {
    if (accessToken) return accessToken;
    if (typeof window !== "undefined") {
      accessToken = localStorage.getItem("accessToken");
    }
    return accessToken;
  },

  getRefreshToken(): string | null {
    if (refreshToken) return refreshToken;
    if (typeof window !== "undefined") {
      refreshToken = localStorage.getItem("refreshToken");
    }
    return refreshToken;
  },

  clearTokens() {
    accessToken = null;
    refreshToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },

  hasValidToken(): boolean {
    return !!this.getAccessToken();
  },
};

// Helper function for authenticated requests
async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = tokenManager.getAccessToken();
  const headers: HeadersInit = {
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 - try to refresh token
  if (response.status === 401 && tokenManager.getRefreshToken()) {
    try {
      const refreshed = await apiClient.refreshToken();
      if (refreshed) {
        (headers as Record<string, string>)["Authorization"] =
          `Bearer ${tokenManager.getAccessToken()}`;
        return fetch(url, { ...options, headers });
      }
    } catch {
      tokenManager.clearTokens();
      throw new Error("Session expired. Please login again.");
    }
  }

  return response;
}

// Helper to handle API errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      timestamp: new Date().toISOString(),
      status: response.status,
      error: response.statusText,
      message: "An error occurred",
    }));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const apiClient = {
  // ==================== AUTH ====================

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<AuthResponse>(response);
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await handleResponse<LoginResponse>(response);

    // Store tokens
    tokenManager.setTokens(result.accessToken, result.refreshToken);

    return result;
  },

  async refreshToken(): Promise<LoginResponse | null> {
    const refresh = tokenManager.getRefreshToken();
    if (!refresh) return null;

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
    });

    if (!response.ok) {
      tokenManager.clearTokens();
      return null;
    }

    const result = await response.json();
    tokenManager.setTokens(result.accessToken, result.refreshToken);
    return result;
  },

  async logout(): Promise<void> {
    const token = tokenManager.getAccessToken();
    if (token) {
      try {
        await fetchWithAuth(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
        });
      } catch {
        // Ignore errors on logout
      }
    }
    tokenManager.clearTokens();
  },

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/auth/change-password`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    await handleResponse<{ message: string }>(response);
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await handleResponse<{ message: string }>(response);
  },

  async confirmForgotPassword(
    data: ConfirmForgotPasswordRequest
  ): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/auth/confirm-forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    await handleResponse<{ message: string }>(response);
  },

  // ==================== FILES (S3) ====================

  async uploadProductImage(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetchWithAuth(
      `${API_BASE_URL}/files/products/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    return handleResponse<FileUploadResponse>(response);
  },

  async uploadVentureImage(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetchWithAuth(
      `${API_BASE_URL}/files/ventures/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    return handleResponse<FileUploadResponse>(response);
  },

  async uploadProfileImage(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetchWithAuth(
      `${API_BASE_URL}/files/profiles/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    return handleResponse<FileUploadResponse>(response);
  },

  async deleteFile(key: string): Promise<void> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/files?key=${encodeURIComponent(key)}`,
      { method: "DELETE" }
    );
    await handleResponse<{ message: string }>(response);
  },

  async getFileUrl(key: string): Promise<string> {
    const response = await fetch(
      `${API_BASE_URL}/files/url?key=${encodeURIComponent(key)}`
    );
    const result = await handleResponse<{ url: string }>(response);
    return result.url;
  },

  async getPresignedUrl(key: string): Promise<string> {
    const response = await fetch(
      `${API_BASE_URL}/files/presigned-url?key=${encodeURIComponent(key)}`
    );
    const result = await handleResponse<{ url: string }>(response);
    return result.url;
  },

  // ==================== USERS ====================

  async getUser(externalId: string): Promise<User> {
    const response = await fetchWithAuth(`${API_BASE_URL}/users/${externalId}`);
    return handleResponse<User>(response);
  },

  async getUserByEmail(email: string): Promise<User> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/users/email/${encodeURIComponent(email)}`
    );
    return handleResponse<User>(response);
  },

  async updateUser(externalId: string, data: Partial<User>): Promise<User> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/users/${externalId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    return handleResponse<User>(response);
  },

  // ==================== CATEGORIES ====================

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse<Category[]>(response);
  },

  async getCategory(externalId: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${externalId}`);
    return handleResponse<Category>(response);
  },

  // ==================== VENTURES ====================

  async createVenture(data: CreateVentureRequest): Promise<Venture> {
    const response = await fetchWithAuth(`${API_BASE_URL}/ventures`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return handleResponse<Venture>(response);
  },

  async getVentures(params?: {
    categoryExternalId?: string;
    userExternalId?: string;
  }): Promise<Venture[]> {
    const queryParams = new URLSearchParams();
    if (params?.categoryExternalId)
      queryParams.append("categoryExternalId", params.categoryExternalId);
    if (params?.userExternalId)
      queryParams.append("userExternalId", params.userExternalId);

    const response = await fetch(`${API_BASE_URL}/ventures?${queryParams}`);
    return handleResponse<Venture[]>(response);
  },

  async getVenture(externalId: string): Promise<Venture> {
    const response = await fetch(`${API_BASE_URL}/ventures/${externalId}`);
    return handleResponse<Venture>(response);
  },

  async updateVenture(
    externalId: string,
    data: UpdateVentureRequest
  ): Promise<Venture> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/ventures/${externalId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    return handleResponse<Venture>(response);
  },

  async deleteVenture(externalId: string): Promise<void> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/ventures/${externalId}`,
      { method: "DELETE" }
    );
    await handleResponse<void>(response);
  },

  // ==================== PRODUCTS ====================

  async createProduct(data: CreateProductRequest): Promise<Product> {
    const response = await fetchWithAuth(`${API_BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return handleResponse<Product>(response);
  },

  async getProducts(params?: {
    categoryExternalId?: string;
    ventureExternalId?: string;
    available?: boolean;
  }): Promise<Product[]> {
    const queryParams = new URLSearchParams();
    if (params?.categoryExternalId)
      queryParams.append("categoryExternalId", params.categoryExternalId);
    if (params?.ventureExternalId)
      queryParams.append("ventureExternalId", params.ventureExternalId);
    if (params?.available) queryParams.append("available", "true");

    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
    return handleResponse<Product[]>(response);
  },

  async getProduct(externalId: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${externalId}`);
    return handleResponse<Product>(response);
  },

  async updateProduct(
    externalId: string,
    data: UpdateProductRequest
  ): Promise<Product> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/products/${externalId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    return handleResponse<Product>(response);
  },

  async deleteProduct(externalId: string): Promise<void> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/products/${externalId}`,
      { method: "DELETE" }
    );
    await handleResponse<void>(response);
  },

  // ==================== CART ====================

  async getCart(userExternalId: string): Promise<Cart> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/cart/user/${userExternalId}`
    );
    return handleResponse<Cart>(response);
  },

  async addToCart(
    userExternalId: string,
    data: AddToCartRequest
  ): Promise<Cart> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/cart/user/${userExternalId}/items`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return handleResponse<Cart>(response);
  },

  async updateCartItem(
    cartItemExternalId: string,
    quantity: number
  ): Promise<Cart> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/cart/items/${cartItemExternalId}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      }
    );
    return handleResponse<Cart>(response);
  },

  async removeFromCart(cartItemExternalId: string): Promise<Cart> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/cart/items/${cartItemExternalId}`,
      { method: "DELETE" }
    );
    return handleResponse<Cart>(response);
  },

  async clearCart(userExternalId: string): Promise<void> {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/cart/user/${userExternalId}/clear`,
      { method: "DELETE" }
    );
    await handleResponse<void>(response);
  },
};

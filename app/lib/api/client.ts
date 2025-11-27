import {
  AddToCartRequest,
  Cart,
  Category,
  CreateProductRequest,
  CreateUserRequest,
  CreateVentureRequest,
  Product,
  User,
  Venture,
} from "~/lib/api/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const apiClient = {
  // Users
  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
  },

  async getUser(externalId: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${externalId}`);
    if (!response.ok) throw new Error("Failed to get user");
    return response.json();
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error("Failed to get categories");
    return response.json();
  },

  // Ventures
  async createVenture(data: CreateVentureRequest): Promise<Venture> {
    const response = await fetch(`${API_BASE_URL}/ventures`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create venture");
    return response.json();
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
    if (!response.ok) throw new Error("Failed to get ventures");
    return response.json();
  },

  async getVenture(externalId: string): Promise<Venture> {
    const response = await fetch(`${API_BASE_URL}/ventures/${externalId}`);
    if (!response.ok) throw new Error("Failed to get venture");
    return response.json();
  },

  // Products
  async createProduct(data: CreateProductRequest): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
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
    if (!response.ok) throw new Error("Failed to get products");
    return response.json();
  },

  async getProduct(externalId: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${externalId}`);
    if (!response.ok) throw new Error("Failed to get product");
    return response.json();
  },

  // Cart
  async getCart(userExternalId: string): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart/user/${userExternalId}`);
    if (!response.ok) throw new Error("Failed to get cart");
    return response.json();
  },

  async addToCart(
    userExternalId: string,
    data: AddToCartRequest
  ): Promise<Cart> {
    const response = await fetch(
      `${API_BASE_URL}/cart/user/${userExternalId}/items`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to add to cart");
    return response.json();
  },

  async updateCartItem(
    cartItemExternalId: string,
    quantity: number
  ): Promise<Cart> {
    const response = await fetch(
      `${API_BASE_URL}/cart/items/${cartItemExternalId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      }
    );
    if (!response.ok) throw new Error("Failed to update cart item");
    return response.json();
  },

  async removeFromCart(cartItemExternalId: string): Promise<Cart> {
    const response = await fetch(
      `${API_BASE_URL}/cart/items/${cartItemExternalId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to remove from cart");
    return response.json();
  },

  async clearCart(userExternalId: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/cart/user/${userExternalId}/clear`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to clear cart");
  },
};

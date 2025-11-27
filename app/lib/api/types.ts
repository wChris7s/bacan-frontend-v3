export enum UserRole {
  ENTREPRENEUR = "ENTREPRENEUR",
  CUSTOMER = "CUSTOMER",
}

export interface User {
  externalId: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  profilePhotoUrl?: string;
}

export interface Category {
  externalId: string;
  name: string;
  description?: string;
}

export interface Venture {
  externalId: string;
  userExternalId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  categories: Category[];
}

export interface Product {
  externalId: string;
  ventureExternalId: string;
  ventureName: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categories: Category[];
}

export interface CartItem {
  externalId: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  externalId: string;
  userExternalId: string;
  items: CartItem[];
  total: number;
  totalItems: number;
}

// Auth Types
export interface RegisterRequest {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
}

export interface AuthResponse {
  message: string;
  userExternalId: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  userExternalId: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  accessToken: string;
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ConfirmForgotPasswordRequest {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

// File Upload Types
export interface FileUploadResponse {
  key: string;
  url: string;
  fileName: string;
  contentType: string;
  size: number;
}

// Request Types
export interface CreateUserRequest {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  profilePhotoUrl?: string;
}

export interface CreateVentureRequest {
  userExternalId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  categoryExternalIds: string[];
}

export interface UpdateVentureRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  categoryExternalIds: string[];
}

export interface CreateProductRequest {
  ventureExternalId: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryExternalIds: string[];
}

export interface UpdateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryExternalIds: string[];
}

export interface AddToCartRequest {
  productExternalId: string;
  quantity: number;
}

// API Error Type
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  errors?: Record<string, string>;
}

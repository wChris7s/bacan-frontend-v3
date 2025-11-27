export enum UserRole {
  ENTREPRENEUR = 'ENTREPRENEUR',
  CUSTOMER = 'CUSTOMER',
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

export interface CreateProductRequest {
  ventureExternalId: string;
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
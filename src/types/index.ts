export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'store_admin' | 'customer';
  createdAt: Date;
  updatedAt?: Date;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  adminId: string;
  status: 'active' | 'inactive';
  settings: StoreSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreSettings {
  currency: string;
  allowReviews: boolean;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number; // Added for promotional pricing
  promoPrice?: number; // Alternative naming for promo price
  isPromo?: boolean; // Whether product is on promotion
  promoPercent?: number; // Promotion percentage
  isNew?: boolean; // Whether product is new
  isBestSeller?: boolean; // Whether product is a bestseller
  rating?: number; // Product rating
  soldCount?: number; // Number of units sold
  images: string[];
  category: string;
  storeId: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  tags: string[];
  variants?: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: Record<string, string>; // e.g., { color: 'red', size: 'M' }
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  product: Product;
  selectedVariant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  userId?: string;
  storeId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  userId?: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'applepay' | 'googlepay';
  name: string;
  icon: string;
  isDefault?: boolean;
}

export interface ShippingAddress {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface NavRoute {
  href: string;
  label: string;
}

export interface ICategory {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export interface ErrorResponse {
  error: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  images: string[];
  stockQuantity: number;
  specifications: string[];
  isFeatured: boolean;
  category: string | ICategory;
  isWishlisted: boolean;
}

export interface IAddress {
  _id: string;
  address_line1: string;
  address_line2: string;
  address_type: "Home" | "Work" | "Other";
  city: string;
  state: string;
  country: string;
  postal_code: string;
  isDefault: boolean;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: "user" | "admin";
  image: string;
  addresses: Array<IAddress>;
  isProfileComplete: boolean;
  lastLogin: Date;
}

export interface IWishlist {
  _id: string;
  user: string;
  products: IProduct[];
}

export interface ICart {
  _id: string | undefined;
  user: string;
  items: ICartItem[];
}

export interface ICartItem {
  _id: string | null;
  quantity: number;
  product: IProduct;
}

export interface OrderItem {
  product: IProduct;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: IUser;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: IAddress;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: string;
}

export interface Feedback {
  _id: string;
  user: IUser;
  message: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

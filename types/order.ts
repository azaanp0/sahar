export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress?: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  trackingEvents?: TrackingEvent[];
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  productNameAr: string;
  productNameEn: string;
  productImage: string;
  variant?: string;
  quantity: number;
  price: number;
  salePrice?: number;
  total: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  area: string;
  street: string;
  building?: string;
  apartment?: string;
  landmark?: string;
  postalCode?: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  price: number;
  estimatedDays: string;
  description?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'apple_pay' | 'stc_pay' | 'tabby' | 'tamara' | 'cash';
  name: string;
  nameAr: string;
  nameEn: string;
  icon?: string;
}

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export interface TrackingEvent {
  id: string;
  status: OrderStatus;
  title: string;
  titleAr: string;
  titleEn: string;
  description?: string;
  timestamp: string;
  location?: string;
}

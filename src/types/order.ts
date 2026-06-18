export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
    currency: string;
    shippingAddress: Address;
    billingAddress?: Address;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    trackingNumber?: string;
    trackingUrl?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    estimatedDelivery?: string;
}

export type OrderStatus =
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "in_transit"
    | "delivered"
    | "cancelled"
    | "refunded";

export type PaymentMethod =
    | "credit_card"
    | "moyasar"
    | "tabby"
    | "tamara"
    | "apple_pay"
    | "cash_on_delivery";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    variant?: {
        color?: string;
        size?: string;
    };
    quantity: number;
    price: number;
    discount?: number;
    total: number;
}

export interface Address {
    id: string;
    label: string;
    fullName: string;
    phone: string;
    city: string;
    district: string;
    street: string;
    building?: string;
    floor?: string;
    apartment?: string;
    postalCode?: string;
    isDefault: boolean;
    location?: {
        lat: number;
        lng: number;
    };
}

export interface OrderTracking {
    orderId: string;
    trackingNumber: string;
    status: OrderStatus;
    currentLocation?: {
        lat: number;
        lng: number;
    };
    estimatedDelivery: string;
    updates: TrackingUpdate[];
}

export interface TrackingUpdate {
    id: string;
    status: OrderStatus;
    description: string;
    timestamp: string;
    location?: {
        lat: number;
        lng: number;
        address: string;
    };
}

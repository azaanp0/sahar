export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    brand?: string;
    brandSlug?: string;
    categorySlug?: string;
    subcategory?: string;
    rating?: number;
    reviews?: number;
    description?: string;
    badge?: string;
    badgeColor?: string;
    href: string;
    tags?: string[];
    inStock?: boolean;
    features?: string[];
}

export interface Category {
    slug: string;
    name: string;
    description: string;
    image: string;
}

export interface Brand {
    slug: string;
    name: string;
    image: string;
    category: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface User {
    name: string;
    phone: string;
    email: string;
    birthDate?: string;
    gender?: "male" | "female";
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
    landmark?: string;
    isDefault: boolean;
}

export interface OrderItem {
    id: string;
    name: string;
    image: string;
    variant?: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    date: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    items: OrderItem[];
    total: number;
    subtotal?: number;
    shipping?: number;
    tax?: number;
    paymentMethod?: string;
    shippingAddress?: {
        name: string;
        phone: string;
        address: string;
    };
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    date: string;
    href?: string;
}

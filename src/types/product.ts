export interface Product {
    id: string;
    name: string;
    nameAr?: string;
    slug: string;
    description: string;
    descriptionAr?: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    images?: string[];
    brand: string;
    brandSlug?: string;
    category: string;
    categorySlug?: string;
    subcategory?: string;
    rating?: number;
    reviews?: number;
    inStock?: boolean;
    stock?: number;
    badge?: string;
    badgeColor?: string;
    tags?: string[];
    features?: string[];
    variants?: ProductVariant[];
    seo?: ProductSEO;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductVariant {
    id: string;
    name: string;
    value: string;
    price?: number;
    stock?: number;
    image?: string;
}

export interface ProductSEO {
    title?: string;
    description?: string;
    keywords?: string[];
}

export interface ProductReview {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title: string;
    content: string;
    images?: string[];
    verified: boolean;
    helpful: number;
    createdAt: string;
}

export interface ProductFilter {
    category?: string;
    brand?: string;
    priceRange?: [number, number];
    rating?: number;
    inStock?: boolean;
    tags?: string[];
    sortBy?: "price-asc" | "price-desc" | "newest" | "rating" | "popular";
}

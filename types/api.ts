export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SearchParams {
  query?: string;
  category?: string;
  brand?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  filters?: Record<string, any>;
}

export interface CartItem {
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
  stock: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  couponCode?: string;
  couponDiscount?: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  productNameAr: string;
  productNameEn: string;
  productImage: string;
  price: number;
  salePrice?: number;
  addedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  titleEn: string;
  excerpt: string;
  excerptAr: string;
  excerptEn: string;
  content: string;
  contentAr: string;
  contentEn: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  banner?: string;
  description?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  website?: string;
  productCount: number;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  nameEn: string;
  icon?: string;
  image?: string;
  description?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  parent?: string;
  children?: Category[];
  productCount: number;
  order: number;
}

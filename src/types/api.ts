export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status?: number;
}

export interface LoginRequest {
    phone: string;
    password?: string;
    otp?: string;
}

export interface RegisterRequest {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface OTPRequest {
    phone: string;
    purpose: "login" | "register" | "reset_password";
}

export interface OTPVerifyRequest {
    phone: string;
    code: string;
    purpose: "login" | "register" | "reset_password";
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar?: string;
    };
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

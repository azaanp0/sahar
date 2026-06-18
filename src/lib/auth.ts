import api from "./api";

export interface LoginCredentials {
    phone: string;
    password: string;
}

export interface RegisterData {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        phone: string;
        email: string;
    };
    access_token: string;
    refresh_token: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // Mock implementation - replace with actual API call
        // const response = await api.post<AuthResponse>('/auth/login', credentials);
        // return response.data;
        
        // Mock response for development
        return {
            user: {
                id: "1",
                name: "عميلة سحر",
                phone: credentials.phone,
                email: `${credentials.phone}@saher.com.sa`,
            },
            access_token: "mock_access_token",
            refresh_token: "mock_refresh_token",
        };
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        // Mock implementation - replace with actual API call
        // const response = await api.post<AuthResponse>('/auth/register', data);
        // return response.data;
        
        // Mock response for development
        return {
            user: {
                id: "1",
                name: data.name,
                phone: data.phone,
                email: data.email,
            },
            access_token: "mock_access_token",
            refresh_token: "mock_refresh_token",
        };
    },

    async logout(): Promise<void> {
        // Mock implementation - replace with actual API call
        // await api.post('/auth/logout');
        
        localStorage.removeItem("sahar_access_token");
        localStorage.removeItem("sahar_refresh_token");
    },

    async refreshToken(): Promise<AuthResponse> {
        const refreshToken = localStorage.getItem("sahar_refresh_token");
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }

        // Mock implementation - replace with actual API call
        // const response = await api.post<AuthResponse>('/auth/refresh', {
        //     refresh_token: refreshToken,
        // });
        // return response.data;
        
        return {
            user: {
                id: "1",
                name: "عميلة سحر",
                phone: "",
                email: "",
            },
            access_token: "mock_access_token",
            refresh_token: refreshToken,
        };
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem("sahar_access_token");
    },

    getCurrentUser() {
        const userStr = localStorage.getItem("sahar_user");
        return userStr ? JSON.parse(userStr) : null;
    },
};

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://api.sahar.sa/api/v1";

const api = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
    },
});

// Request interceptor - add token automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("sahar_access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                const refreshToken = localStorage.getItem("sahar_refresh_token");
                if (refreshToken) {
                    const { data } = await axios.post(`${API_URL}/auth/refresh`, {
                        refresh_token: refreshToken,
                    });
                    localStorage.setItem("sahar_access_token", data.access_token);
                    error.config.headers.Authorization = `Bearer ${data.access_token}`;
                    return api(error.config);
                } else {
                    // No refresh token, redirect to login
                    localStorage.removeItem("sahar_access_token");
                    window.location.href = "/login";
                }
            } catch {
                localStorage.removeItem("sahar_access_token");
                localStorage.removeItem("sahar_refresh_token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;

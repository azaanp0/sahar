import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Product } from "@/types";

export const useProducts = (params?: {
    category?: string;
    tag?: string;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const response = await api.get("/products", { params });
            return response.data as Product[];
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await api.get(`/products/${id}`);
            return response.data as Product;
        },
        enabled: !!id,
    });
};

export const useFeaturedProducts = () => {
    return useQuery({
        queryKey: ["products", "featured"],
        queryFn: async () => {
            const response = await api.get("/products", { params: { featured: true, limit: 8 } });
            return response.data as Product[];
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useBestSellers = () => {
    return useQuery({
        queryKey: ["products", "bestsellers"],
        queryFn: async () => {
            const response = await api.get("/products", { params: { sort: "bestsellers", limit: 8 } });
            return response.data as Product[];
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useNewArrivals = () => {
    return useQuery({
        queryKey: ["products", "new"],
        queryFn: async () => {
            const response = await api.get("/products", { params: { sort: "new", limit: 8 } });
            return response.data as Product[];
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useOffers = () => {
    return useQuery({
        queryKey: ["products", "offers"],
        queryFn: async () => {
            const response = await api.get("/products", { params: { discount: true, limit: 8 } });
            return response.data as Product[];
        },
        staleTime: 5 * 60 * 1000,
    });
};

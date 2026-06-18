import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Brand {
    id: string;
    name: string;
    logo: string;
    productCount: number;
    slug: string;
}

export const useBrands = () => {
    return useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            const response = await api.get("/brands");
            return response.data as Brand[];
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useBrand = (slug: string) => {
    return useQuery({
        queryKey: ["brand", slug],
        queryFn: async () => {
            const response = await api.get(`/brands/${slug}`);
            return response.data as Brand;
        },
        enabled: !!slug,
    });
};

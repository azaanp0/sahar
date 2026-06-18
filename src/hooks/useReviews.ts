import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Review {
    id: string;
    customerName: string;
    customerAvatar: string;
    rating: number;
    comment: string;
    date: string;
    productId: string;
}

export const useReviews = (productId?: string) => {
    return useQuery({
        queryKey: ["reviews", productId],
        queryFn: async () => {
            const response = await api.get("/reviews", { params: productId ? { productId } : {} });
            return response.data as Review[];
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

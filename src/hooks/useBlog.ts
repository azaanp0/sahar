import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    slug: string;
    publishedAt: string;
    readTime: string;
    author: {
        name: string;
        avatar: string;
    };
}

export const useBlogPosts = (limit?: number) => {
    return useQuery({
        queryKey: ["blog", limit],
        queryFn: async () => {
            const response = await api.get("/blog", { params: limit ? { limit } : {} });
            return response.data as BlogPost[];
        },
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
};

export const useBlogPost = (slug: string) => {
    return useQuery({
        queryKey: ["blog", slug],
        queryFn: async () => {
            const response = await api.get(`/blog/${slug}`);
            return response.data as BlogPost;
        },
        enabled: !!slug,
    });
};

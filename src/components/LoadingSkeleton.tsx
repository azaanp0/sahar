import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700", className)}
            role="status"
            aria-label="Loading"
        />
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-[#16213e] rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
            <Skeleton className="w-full h-48" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
};

export default Skeleton;

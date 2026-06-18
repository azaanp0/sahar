const ProductCardSkeleton = () => {
    return (
        <div className="bg-card rounded-lg overflow-hidden border animate-pulse">
            <div className="w-full h-64 bg-muted" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-5 bg-muted rounded w-full" />
                <div className="h-5 bg-muted rounded w-2/3" />
                <div className="flex items-center gap-2">
                    <div className="h-4 bg-muted rounded w-20" />
                    <div className="h-4 bg-muted rounded w-10" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-6 bg-muted rounded w-16" />
                    <div className="h-4 bg-muted rounded w-12" />
                </div>
                <div className="h-10 bg-muted rounded" />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;

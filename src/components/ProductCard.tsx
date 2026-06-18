import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye, GitCompare, Star } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
import QuickViewModal from "./QuickViewModal";
import ProductBadge from "./product/ProductBadge";
import type { Product } from "@/types";

interface ProductCardProps {
    product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const { t } = useTranslation();
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const wished = isInWishlist(product.id);
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;
    const hoverImage = product.images?.[1] || product.image;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product.id);
        toast.success(t('cart.added_to_cart'));
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggleWishlist(product.id);
        toast.success(added ? t('cart.added_to_wishlist') : t('cart.removed_from_wishlist'));
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setQuickViewOpen(true);
    };

    const handleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toast.success(t('product.added_to_compare'));
    };

    return (
        <>
            <div 
                className="product-card-entry product-card-vertical group relative bg-white dark:bg-[#1a1a2e] rounded-[14px] overflow-hidden border border-[#E91E63] dark:border-[#C2185B] hover:border-[#C2185B] dark:hover:border-[#AD1457] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Badges */}
                <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
                    {product.badge && (
                        <ProductBadge 
                            type={product.badge as any} 
                            className="text-xs"
                        />
                    )}
                    {discount > 0 && !product.badge && (
                        <ProductBadge type="sale" text={`-${discount}%`} className="text-xs" />
                    )}
                    {product.tags?.includes("1plus1") && (
                        <ProductBadge type="sale" text="1+1" className="text-xs" />
                    )}
                    {product.tags?.includes("free-gift") && (
                        <ProductBadge type="sale" text="هدية مجانية" className="text-xs" />
                    )}
                    {product.tags?.includes("new") && (
                        <ProductBadge type="new" className="text-xs" />
                    )}
                    {product.tags?.includes("trending") && (
                        <ProductBadge type="bestseller" text="ترند" className="text-xs" />
                    )}
                </div>

                {/* Action Buttons - Always visible on mobile, hover on desktop */}
                <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5 md:gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleWishlist}
                        className="w-7 h-7 md:w-8 md:h-8 bg-white dark:bg-[#1a1a2e] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex items-center justify-center hover:bg-[#E91E63] dark:hover:bg-[#C2185B] hover:text-white transition-colors duration-300 ease border border-[#E91E63] dark:border-[#C2185B]"
                        aria-label={wished ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                    >
                        <Heart
                            className="h-3.5 w-3.5 md:h-4 md:w-4 text-black dark:text-white group-hover:text-white transition-colors duration-300 ease"
                            fill={wished ? "currentColor" : "none"}
                        />
                    </button>
                    <button
                        onClick={handleCompare}
                        className="hidden md:flex w-7 h-7 md:w-8 md:h-8 bg-white dark:bg-[#1a1a2e] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] items-center justify-center hover:bg-[#E91E63] dark:hover:bg-[#C2185B] hover:text-white transition-colors duration-300 ease border border-[#E91E63] dark:border-[#C2185B]"
                        aria-label="مقارنة"
                    >
                        <GitCompare className="h-3.5 w-3.5 md:h-4 md:w-4 text-black dark:text-white group-hover:text-white transition-colors duration-300 ease" />
                    </button>
                    <button
                        onClick={handleQuickView}
                        className="hidden md:flex w-7 h-7 md:w-8 md:h-8 bg-white dark:bg-[#1a1a2e] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] items-center justify-center hover:bg-[#E91E63] dark:hover:bg-[#C2185B] hover:text-white transition-colors duration-300 ease border border-[#E91E63] dark:border-[#C2185B]"
                        aria-label="عرض سريع"
                    >
                        <Eye className="h-3.5 w-3.5 md:h-4 md:w-4 text-black dark:text-white group-hover:text-white transition-colors duration-300 ease" />
                    </button>
                </div>

                {/* Image */}
                <Link to={product.href} className="product-card-image relative overflow-hidden block aspect-[3/4]">
                    <img
                        src={proxyImageUrl(product.image)}
                        alt={`${product.name} - ${product.brand || 'سحر'}`}
                        className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'} ${isHovered && hoverImage !== product.image ? 'opacity-0' : 'opacity-100'}`}
                        loading="lazy"
                        onError={handleImageError}
                    />
                    {hoverImage !== product.image && (
                        <img
                            src={proxyImageUrl(hoverImage)}
                            alt={`${product.name} - ${product.brand || 'سحر'} hover`}
                            className={`w-full h-full object-cover absolute inset-0 transition-transform duration-300 ${isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'}`}
                            loading="lazy"
                            onError={handleImageError}
                        />
                    )}
                </Link>

                {/* Content */}
                <div className="p-3 md:p-4">
                    {product.brand && (
                        <Link 
                            to={`/brand/${product.brand.toLowerCase()}`}
                            className="text-xs md:text-sm text-black/60 dark:text-gray-400 hover:text-[#E91E63] transition-colors duration-300 ease font-medium"
                        >
                            {product.brand}
                        </Link>
                    )}

                    <h2 className="font-bold line-clamp-2 mt-1 mb-2 text-black dark:text-white" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                        <Link to={product.href} className="hover:text-[#E91E63] transition-colors duration-300 ease">
                            {product.name}
                        </Link>
                    </h2>

                    {product.rating && (
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-3 h-3 md:w-4 md:h-4 ${star <= product.rating! ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600"}`}
                                    />
                                ))}
                            </div>
                            {product.reviews && (
                                <span className="text-xs text-black/60 dark:text-gray-400">({product.reviews})</span>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-[#E91E63]" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>{product.price.toFixed(2)} ر.س</span>
                        {product.originalPrice && (
                            <span className="text-xs md:text-sm text-black/60 dark:text-gray-400 line-through">
                                {product.originalPrice.toFixed(2)} ر.س
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-[#E91E63] dark:bg-[#C2185B] text-white py-2 rounded-[14px] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease flex items-center justify-center gap-2 group-hover:scale-105 transition-transform"
                        aria-label="أضيفي للسلة"
                        style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}
                    >
                        <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        أضيفي للسلة
                    </button>
                </div>
            </div>

            <QuickViewModal product={quickViewOpen ? product : null} onClose={() => setQuickViewOpen(false)} />
        </>
    );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
export type { Product };

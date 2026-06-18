import { Link } from "react-router-dom";
import { X, ShoppingCart, Heart, Star } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
import type { Product } from "@/types";

interface QuickViewModalProps {
    product: Product | null;
    onClose: () => void;
}

const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();

    if (!product) return null;

    const wished = isInWishlist(product.id);
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        addToCart(product.id);
        toast.success("تمت الإضافة للسلة");
        onClose();
    };

    const handleWishlist = () => {
        const added = toggleWishlist(product.id);
        toast.success(added ? "تمت الإضافة للمفضلة" : "تمت الإزالة من المفضلة");
    };

    return (
        <>
            <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
            <div className="fixed inset-0 z-[111] flex items-center justify-center p-4 pointer-events-none">
                <div className="pointer-events-auto w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="flex justify-end p-2">
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" aria-label="إغلاق">
                            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 px-6 pb-6">
                        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                            <img
                                src={proxyImageUrl(product.image)}
                                alt={product.name}
                                className="w-full h-full object-contain"
                                onError={handleImageError}
                            />
                            {(product.badge || discount > 0) && (
                                <span className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded" style={{ background: "#b22424" }}>
                                    {product.badge || `-${discount}%`}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {product.brand && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</span>
                            )}
                            <h2 className="text-lg font-bold mb-2 text-black dark:text-white">{product.name}</h2>
                            {product.rating && (
                                <div className="flex items-center gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className={`h-3.5 w-3.5 ${s <= product.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}`} />
                                    ))}
                                    {product.reviews && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">({product.reviews})</span>
                                    )}
                                </div>
                            )}
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-2xl font-bold text-[#E91E63]">
                                    {product.price.toFixed(2)} ر.س
                                </span>
                                {product.originalPrice && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                        {product.originalPrice.toFixed(2)} ر.س
                                    </span>
                                )}
                            </div>
                            {product.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{product.description}</p>
                            )}
                            <div className="flex gap-2 mt-auto">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-90 bg-[#E91E63] hover:bg-[#C2185B]"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    أضيفي للسلة
                                </button>
                                <button
                                    onClick={handleWishlist}
                                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-[#E91E63] dark:hover:border-[#C2185B] transition-colors"
                                    aria-label="المفضلة"
                                >
                                    <Heart className={`h-5 w-5 ${wished ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`} />
                                </button>
                            </div>
                            <Link
                                to={product.href}
                                onClick={onClose}
                                className="text-center text-sm text-[#E91E63] hover:underline mt-3"
                            >
                                عرض تفاصيل المنتج
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickViewModal;

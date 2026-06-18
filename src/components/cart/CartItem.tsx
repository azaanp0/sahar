import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { proxyImageUrl } from "@/lib/imageProxy";
import { handleImageError } from "@/lib/imageHandler";
import type { Product } from "@/types";

interface CartItemProps {
    item: Product & { quantity: number };
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    return (
        <div className="flex gap-4 p-4 bg-white dark:bg-[#16213e] rounded-[14px] border border-[#E91E63] dark:border-[#C2185B] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease">
            <div className="flex-shrink-0 w-24 h-24 rounded-[14px] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(233,30,99,0.15)] overflow-hidden">
                <img
                    src={proxyImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                />
            </div>
            <div className="flex-1 flex flex-col">
                <h4 className="font-medium line-clamp-2 text-black dark:text-white">{item.name}</h4>
                {item.brand && (
                    <p className="text-sm text-black/60 dark:text-gray-400 mt-1">{item.brand}</p>
                )}
                {item.subcategory && (
                    <p className="text-xs text-black/60 dark:text-gray-400">{item.subcategory}</p>
                )}
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#E91E63] dark:border-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors duration-300 ease"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                            <Minus className="h-4 w-4 text-black dark:text-white" />
                        </Button>
                        <span className="w-10 text-center font-medium text-black dark:text-white">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#E91E63] dark:border-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors duration-300 ease"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="h-4 w-4 text-black dark:text-white" />
                        </Button>
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-black dark:text-white">{(item.price * item.quantity).toFixed(2)} ر.س</p>
                        {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-sm text-black/60 dark:text-gray-400 line-through">
                                {item.originalPrice.toFixed(2)} ر.س
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="text-black/60 dark:text-gray-400 hover:text-[#F44336] self-start transition-colors duration-300 ease"
                onClick={() => onRemove(item.id)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default CartItem;

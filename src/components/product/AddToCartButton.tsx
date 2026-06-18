import { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

interface AddToCartButtonProps {
    productId: string;
    quantity?: number;
    variant?: "default" | "full" | "icon";
    disabled?: boolean;
}

const AddToCartButton = ({ 
    productId, 
    quantity = 1, 
    variant = "default",
    disabled = false 
}: AddToCartButtonProps) => {
    const { addToCart } = useStore();
    const [isAdding, setIsAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = async () => {
        if (disabled) return;
        
        setIsAdding(true);
        try {
            addToCart(productId, quantity);
            setAdded(true);
            toast.success("تمت الإضافة للسلة");
            
            setTimeout(() => {
                setAdded(false);
            }, 2000);
        } catch (error) {
            toast.error("حدث خطأ أثناء الإضافة للسلة");
        } finally {
            setIsAdding(false);
        }
    };

    if (variant === "icon") {
        return (
            <Button
                size="icon"
                onClick={handleAddToCart}
                disabled={disabled || isAdding}
                className="relative"
            >
                {isAdding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : added ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <ShoppingCart className="h-4 w-4" />
                )}
            </Button>
        );
    }

    if (variant === "full") {
        return (
            <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={disabled || isAdding}
            >
                {isAdding ? (
                    <>
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                        جاري الإضافة...
                    </>
                ) : added ? (
                    <>
                        <Check className="h-4 w-4 ml-2" />
                        تمت الإضافة
                    </>
                ) : (
                    <>
                        <ShoppingCart className="h-4 w-4 ml-2" />
                        أضيفي للسلة
                    </>
                )}
            </Button>
        );
    }

    return (
        <Button
            onClick={handleAddToCart}
            disabled={disabled || isAdding}
            className="gap-2"
        >
            {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : added ? (
                <Check className="h-4 w-4" />
            ) : (
                <ShoppingCart className="h-4 w-4" />
            )}
            {added ? "تمت الإضافة" : "أضيفي للسلة"}
        </Button>
    );
};

export default AddToCartButton;

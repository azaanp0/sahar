import { useState } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, Gift } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { proxyImageUrl } from "@/lib/imageProxy";
import { handleImageError } from "@/lib/imageHandler";

const CartDrawer = ({ children }: { children?: React.ReactNode }) => {
    const { cart, removeFromCart, updateCartQuantity, cartProducts, cartSubtotal, cartCount } = useStore();
    const [open, setOpen] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

    const discount = appliedCoupon?.discount || 0;
    const shipping = cartSubtotal >= 199 ? 0 : 29;
    const tax = (cartSubtotal - discount + shipping) * 0.15;
    const total = cartSubtotal - discount + shipping + tax;

    const handleApplyCoupon = () => {
        if (couponCode.trim()) {
            // محاكاة تطبيق الكوبون - سيتم ربطه بالـ API لاحقاً
            setAppliedCoupon({ code: couponCode, discount: cartSubtotal * 0.1 });
            setCouponCode("");
            toast.success("تم تطبيق كود الخصم");
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        toast.success("تم إزالة كود الخصم");
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children || (
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#E91E63] text-white rounded-full transition-all duration-300 ease">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>
                )}
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh] bg-white dark:bg-gray-800">
                <DrawerHeader className="border-b border-[#E91E63] dark:border-[#C2185B]">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-right text-black dark:text-white">سلة التسوق ({cartCount})</DrawerTitle>
                        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors duration-300 ease">
                            <X className="h-5 w-5 text-black dark:text-white" />
                        </Button>
                    </div>
                </DrawerHeader>

                <div className="flex flex-col h-full overflow-hidden">
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {cartProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <ShoppingBag className="h-16 w-16 text-black/60 dark:text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium mb-2 text-black dark:text-white">السلة فارغة</h3>
                                <p className="text-sm text-black/60 dark:text-gray-400 mb-4">ابدئي بإضافة منتجات لسلتك</p>
                                <Button onClick={() => setOpen(false)} className="bg-[#E91E63] hover:bg-[#C2185B] text-white transition-colors duration-300 ease">تصفحي المنتجات</Button>
                            </div>
                        ) : (
                            cartProducts.map((item) => (
                                <div key={item.id} className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-[14px] border border-[#E91E63] dark:border-[#C2185B] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease">
                                    <div className="flex-shrink-0 w-20 h-20 rounded-[14px] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(233,30,99,0.15)] overflow-hidden">
                                        <img
                                            src={proxyImageUrl(item.image)}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={handleImageError}
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <h4 className="font-medium text-sm line-clamp-2 text-black dark:text-white">{item.name}</h4>
                                        {item.brand && (
                                            <p className="text-xs text-black/60 dark:text-gray-400 mt-1">{item.brand}</p>
                                        )}
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 border-[#E91E63] dark:border-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors duration-300 ease"
                                                    onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                >
                                                    <Minus className="h-3 w-3 text-black dark:text-white" />
                                                </Button>
                                                <span className="w-8 text-center text-sm font-medium text-black dark:text-white">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 border-[#E91E63] dark:border-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors duration-300 ease"
                                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3 text-black dark:text-white" />
                                                </Button>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-sm text-black dark:text-white">{(item.price * item.quantity).toFixed(2)} ر.س</p>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-black/60 dark:text-gray-400 hover:text-[#F44336] transition-colors duration-300 ease"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Cart Summary */}
                    {cartProducts.length > 0 && (
                        <div className="border-t border-[#E91E63] dark:border-[#C2185B] bg-white dark:bg-[#16213e] p-4 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease">
                            {/* Coupon */}
                            <div className="flex gap-2">
                                <Input
                                    placeholder="كود الخصم"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="flex-1 border-[#E91E63] dark:border-[#C2185B] focus:ring-2 focus:ring-[#E91E63] transition-all duration-300 ease bg-white dark:bg-gray-800 text-black dark:text-white"
                                />
                                {appliedCoupon ? (
                                    <Button variant="outline" onClick={handleRemoveCoupon} className="border-[#E91E63] dark:border-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors duration-300 ease">
                                        <Gift className="h-4 w-4 ml-2 text-[#E91E63]" />
                                        إزالة
                                    </Button>
                                ) : (
                                    <Button onClick={handleApplyCoupon} className="bg-[#E91E63] hover:bg-[#C2185B] text-white transition-colors duration-300 ease">تطبيق</Button>
                                )}
                            </div>

                            <Separator />

                            {/* Summary */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-black/60 dark:text-gray-400">المجموع الفرعي</span>
                                    <span className="text-black dark:text-white">{cartSubtotal.toFixed(2)} ر.س</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-[#4CAF50]">
                                        <span className="text-black/60 dark:text-gray-400">الخصم</span>
                                        <span>-{discount.toFixed(2)} ر.س</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-black/60 dark:text-gray-400">الشحن</span>
                                    <span className="text-black dark:text-white">{shipping === 0 ? "مجاني" : shipping.toFixed(2) + " ر.س"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-black/60 dark:text-gray-400">الضريبة (15%)</span>
                                    <span className="text-black dark:text-white">{tax.toFixed(2)} ر.س</span>
                                </div>
                                <Separator className="bg-[#E91E63] dark:bg-[#C2185B]" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span className="text-black dark:text-white">الإجمالي</span>
                                    <span className="text-[#E91E63]">{total.toFixed(2)} ر.س</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-[#E91E63] hover:bg-[#C2185B] text-white transition-colors duration-300 ease"
                                size="lg"
                                onClick={() => {
                                    setOpen(false);
                                    window.location.href = "/checkout";
                                }}
                            >
                                إتمام الشراء
                            </Button>

                            {cartSubtotal < 199 && (
                                <p className="text-xs text-center text-black/60 dark:text-gray-400">
                                    شحن مجاني للطلبات فوق 199 ر.س
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CartDrawer;

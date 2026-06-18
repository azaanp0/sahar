import { useState } from "react";
import { Gift, Truck, Shield, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CartSummaryProps {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    coupon?: { code: string; discount: number } | null;
    onApplyCoupon: (code: string) => void;
    onRemoveCoupon: () => void;
    onCheckout: () => void;
}

const CartSummary = ({
    subtotal,
    discount,
    shipping,
    tax,
    total,
    coupon,
    onApplyCoupon,
    onRemoveCoupon,
    onCheckout,
}: CartSummaryProps) => {
    const [couponCode, setCouponCode] = useState("");

    const handleApplyCoupon = () => {
        if (couponCode.trim()) {
            onApplyCoupon(couponCode);
            setCouponCode("");
        }
    };

    return (
        <div className="bg-white dark:bg-[#16213e] rounded-[14px] border border-[#E91E63] dark:border-[#C2185B] p-6 space-y-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease">
            {/* Coupon Section */}
            <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2 text-black dark:text-white">
                    <Gift className="h-4 w-4 text-[#E91E63]" />
                    كود الخصم
                </label>
                <div className="flex gap-2">
                    <Input
                        placeholder="أدخلي كود الخصم"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={!!coupon}
                        className="flex-1 border-[#E91E63] dark:border-[#C2185B] focus:ring-2 focus:ring-[#E91E63] transition-all duration-300 ease bg-white dark:bg-gray-800 text-black dark:text-white"
                    />
                    {coupon ? (
                        <Button variant="outline" onClick={onRemoveCoupon} className="border-[#E91E63] dark:border-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors duration-300 ease text-black dark:text-white">
                            <Badge variant="secondary" className="ml-2 bg-[#E91E63] text-white">
                                {coupon.code}
                            </Badge>
                            إزالة
                        </Button>
                    ) : (
                        <Button onClick={handleApplyCoupon} className="bg-[#E91E63] hover:bg-[#C2185B] text-white transition-colors duration-300 ease">تطبيق</Button>
                    )}
                </div>
            </div>

            <Separator />

            {/* Price Summary */}
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-black/60 dark:text-gray-400">المجموع الفرعي</span>
                    <span className="font-medium text-black dark:text-white">{subtotal.toFixed(2)} ر.س</span>
                </div>
                
                {discount > 0 && (
                    <div className="flex justify-between text-sm text-[#4CAF50]">
                        <span className="text-black/60 dark:text-gray-400">الخصم</span>
                        <span className="font-medium">-{discount.toFixed(2)} ر.س</span>
                    </div>
                )}
                
                <div className="flex justify-between text-sm">
                    <span className="text-black/60 dark:text-gray-400">الشحن</span>
                    <span className="font-medium text-black dark:text-white">
                        {shipping === 0 ? (
                            <span className="text-[#4CAF50]">مجاني</span>
                        ) : (
                            `${shipping.toFixed(2)} ر.س`
                        )}
                    </span>
                </div>
                
                <div className="flex justify-between text-sm">
                    <span className="text-black/60 dark:text-gray-400">الضريبة (15%)</span>
                    <span className="font-medium text-black dark:text-white">{tax.toFixed(2)} ر.س</span>
                </div>
                
                <Separator className="bg-[#E91E63] dark:bg-[#C2185B]" />
                
                <div className="flex justify-between text-lg font-bold">
                    <span className="text-black dark:text-white">الإجمالي</span>
                    <span className="text-[#E91E63]">{total.toFixed(2)} ر.س</span>
                </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-black dark:text-white">
                    <Truck className="h-4 w-4 text-[#E91E63]" />
                    <span>شحن مجاني للطلبات فوق 199 ر.س</span>
                </div>
                <div className="flex items-center gap-2 text-black dark:text-white">
                    <Shield className="h-4 w-4 text-[#E91E63]" />
                    <span>ضمان استرجاع خلال 14 يوم</span>
                </div>
                <div className="flex items-center gap-2 text-black dark:text-white">
                    <Percent className="h-4 w-4 text-[#E91E63]" />
                    <span>نظام ولاء نقاطي</span>
                </div>
            </div>

            <Button size="lg" className="w-full bg-[#E91E63] hover:bg-[#C2185B] text-white transition-colors duration-300 ease" onClick={onCheckout}>
                إتمام الشراء
            </Button>
        </div>
    );
};

export default CartSummary;

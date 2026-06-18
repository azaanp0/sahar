import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Truck, Shield, Percent, Gift } from "lucide-react";
import type { Product } from "@/types";

interface OrderSummaryProps {
    items: (Product & { quantity: number })[];
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    coupon?: { code: string; discount: number } | null;
}

const OrderSummary = ({
    items,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    coupon,
}: OrderSummaryProps) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-black dark:text-white">
                <ShoppingBag className="h-5 w-5" />
                ملخص الطلب
            </h3>

            {/* Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-3 py-2">
                        <div className="flex-shrink-0 w-16 h-16 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-2 text-black dark:text-white">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">الكمية: {item.quantity}</p>
                            <p className="text-sm font-medium mt-1 text-black dark:text-white">
                                {(item.price * item.quantity).toFixed(2)} ر.س
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">المجموع الفرعي</span>
                    <span className="font-medium text-black dark:text-white">{subtotal.toFixed(2)} ر.س</span>
                </div>

                {coupon && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Gift className="h-3 w-3" />
                            كود الخصم ({coupon.code})
                        </span>
                        <span className="font-medium text-green-600">-{discount.toFixed(2)} ر.س</span>
                    </div>
                )}

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        الشحن
                    </span>
                    <span className="font-medium text-black dark:text-white">
                        {shipping === 0 ? (
                            <span className="text-green-600">مجاني</span>
                        ) : (
                            `${shipping.toFixed(2)} ر.س`
                        )}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">الضريبة (15%)</span>
                    <span className="font-medium text-black dark:text-white">{tax.toFixed(2)} ر.س</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                    <span className="text-black dark:text-white">الإجمالي</span>
                    <span className="text-[#E91E63]">{total.toFixed(2)} ر.س</span>
                </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-[#E91E63]" />
                    <span className="text-gray-600 dark:text-gray-400">شحن مجاني للطلبات فوق 199 ر.س</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-[#E91E63]" />
                    <span className="text-gray-600 dark:text-gray-400">ضمان استرجاع خلال 14 يوم</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Percent className="h-4 w-4 text-[#E91E63]" />
                    <span className="text-gray-600 dark:text-gray-400">نظام ولاء نقاطي</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;

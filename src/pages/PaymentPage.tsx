import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";
import { ChevronLeft, CreditCard, Apple, Smartphone, Wallet, Check } from "lucide-react";

const PaymentPage = () => {
    const navigate = useNavigate();
    const { cartSubtotal, cartCount } = useStore();
    const [selectedMethod, setSelectedMethod] = useState<string>("cod");
    const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
    const [loading, setLoading] = useState(false);

    const shipping = cartSubtotal >= 199 ? 0 : 29;
    const tax = cartSubtotal * 0.15;
    const total = cartSubtotal + shipping + tax;

    const paymentMethods = [
        { id: "credit", name: "بطاقة ائتمانية / مدى", icon: CreditCard, description: "Visa, MasterCard, Mada" },
        { id: "applepay", name: "Apple Pay", icon: Apple, description: "الدفع السريع والآمن" },
        { id: "stcpay", name: "STC Pay", icon: Smartphone, description: "الدفع عبر STC Pay" },
        { id: "tabby", name: "Tabby", icon: Wallet, description: "4 أقساط بدون فوائد" },
        { id: "tamara", name: "Tamara", icon: Wallet, description: "3 أقساط بدون فوائد" },
        { id: "cod", name: "الدفع عند الاستلام", icon: Check, description: "ادفعي عند استلام الطلب" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            toast.success("تم تأكيد الطلب بنجاح");
            navigate("/checkout/success");
        }, 2000);
    };

    return (
        <PageLayout title="الدفع">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl">
                    <Link to="/checkout" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
                        <ChevronLeft className="h-4 w-4" />
                        العودة للإتمام
                    </Link>

                    <h1 className="text-2xl font-bold mb-6">اختيار طريقة الدفع</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Payment Methods */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h2 className="font-bold mb-4">طرق الدفع المتاحة</h2>
                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                                            selectedMethod === method.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.id}
                                            checked={selectedMethod === method.id}
                                            onChange={(e) => setSelectedMethod(e.target.value)}
                                            className="w-5 h-5 text-primary border-border"
                                        />
                                        <div className={`p-3 rounded-lg ${
                                            selectedMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted"
                                        }`}>
                                            <method.icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{method.name}</p>
                                            <p className="text-sm text-muted-foreground">{method.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Loyalty Points */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-bold mb-1">نقاط الولاء</h2>
                                    <p className="text-sm text-muted-foreground">لديك 500 نقطة (قيمتها 25 ريال)</p>
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={useLoyaltyPoints}
                                        onChange={(e) => setUseLoyaltyPoints(e.target.checked)}
                                        className="w-5 h-5 rounded border-border"
                                    />
                                    <span className="text-sm font-medium">استخدام النقاط</span>
                                </label>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h2 className="font-bold mb-4">ملخص الطلب</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">المجموع الفرعي ({cartCount} منتج)</span>
                                    <span>{cartSubtotal.toFixed(2)} ر.س</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">الشحن</span>
                                    <span>{shipping === 0 ? "مجاني" : shipping.toFixed(2) + " ر.س"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">الضريبة (15%)</span>
                                    <span>{tax.toFixed(2)} ر.س</span>
                                </div>
                                {useLoyaltyPoints && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>خصم نقاط الولاء</span>
                                        <span>-25.00 ر.س</span>
                                    </div>
                                )}
                                <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                                    <span>الإجمالي</span>
                                    <span>{(useLoyaltyPoints ? total - 25 : total).toFixed(2)} ر.س</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "جاري معالجة الدفع..." : "تأكيد الدفع"}
                        </button>

                        {/* Security Note */}
                        <p className="text-center text-xs text-muted-foreground">
                            🔒 معلوماتك محمية بتشفير SSL آمن
                        </p>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
};

export default PaymentPage;

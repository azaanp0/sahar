import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/context/StoreContext";
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react";

const CheckoutSuccessPage = () => {
    const navigate = useNavigate();
    const { placeOrder, cartSubtotal } = useStore();
    const orderId = placeOrder(cartSubtotal);

    return (
        <PageLayout title="تم تأكيد الطلب">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-2xl text-center py-12">
                    {/* Success Icon */}
                    <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>

                    <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">تم تأكيد طلبك بنجاح!</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">شكراً لتسوقك مع سحر</p>

                    {/* Order Info */}
                    <div className="bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Package className="h-5 w-5 text-[#E91E63] dark:text-[#C2185B]" />
                            <span className="font-bold text-gray-900 dark:text-white">رقم الطلب: {orderId}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            تم إرسال تأكيد الطلب إلى بريدك الإلكتروني
                        </p>
                        <div className="bg-[#E91E63]/10 dark:bg-[#C2185B]/20 rounded-lg p-4">
                            <div className="flex items-center justify-center gap-2 text-[#E91E63] dark:text-[#C2185B]">
                                <Truck className="h-5 w-5" />
                                <span className="font-medium">التوصيل المتوقع: 3-5 أيام عمل</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Link
                            to={`/account/orders/${orderId}`}
                            className="flex items-center justify-center gap-2 bg-[#E91E63] dark:bg-[#C2185B] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                        >
                            تتبع الطلب
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            to="/account/orders"
                            className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        >
                            عرض جميع طلباتي
                        </Link>
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 text-[#E91E63] dark:text-[#C2185B] hover:underline"
                        >
                            <Home className="h-4 w-4" />
                            العودة للرئيسية
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default CheckoutSuccessPage;

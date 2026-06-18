import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Trash2, Plus, Minus, ShoppingBag, Tag, Truck, RotateCcw, ChevronLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

const CartPage = () => {
    const { cartProducts, cartSubtotal, updateCartQuantity, removeFromCart } = useStore();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const shipping = cartSubtotal >= 199 ? 0 : 25;
    const discount = couponApplied ? cartSubtotal * 0.1 : 0;
    const subtotalAfterDiscount = cartSubtotal - discount;
    const tax = subtotalAfterDiscount * 0.15;
    const total = subtotalAfterDiscount + shipping + tax;

    const applyCoupon = () => {
        if (coupon.toLowerCase() === "saher10") setCouponApplied(true);
    };

    return (
        <PageLayout title="سلة التسوق">
            <div className="px-4 py-4 md:py-6">
                <div className="mx-auto max-w-5xl">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] mb-4 transition-colors duration-300 ease">
                        <ChevronLeft className="h-4 w-4" />
                        رجوع
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold mb-2 text-black dark:text-white">سلة التسوق</h1>
                    <div className="home-block-line mb-4 md:mb-6" />

                    {cartProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 md:py-20 gap-4 text-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary-light, #ecd0f6)' }}>
                                <ShoppingBag className="h-8 w-8 md:h-10 md:w-10" style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <h2 className="text-base md:text-lg font-semibold text-black dark:text-white">سلتك فارغة</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">أضيفي منتجاتك المفضلة للسلة</p>
                            <Link to="/products" className="px-6 py-3 md:px-8 md:py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-90 bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">
                                تسوقي الآن
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-3">
                                {cartProducts.map((item) => (
                                    <div key={item.id} className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-2xl transition-shadow hover:shadow-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#16213e]">
                                        <Link to={item.href} className="flex-shrink-0">
                                            <img src={proxyImageUrl(item.image)} alt={item.name} className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-xl bg-gray-100 dark:bg-gray-700" style={{ background: '#f3f4f6' }} onError={handleImageError} />
                                        </Link>
                                        <div className="flex-1 flex flex-col gap-1 md:gap-1.5 min-w-0">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.brand}</span>
                                            <Link to={item.href} className="text-sm font-medium line-clamp-2 hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors text-black dark:text-white">{item.name}</Link>
                                            <span className="font-bold text-sm md:text-base text-[#E91E63] dark:text-[#C2185B]">{item.price.toFixed(2)} ر.س</span>
                                            <div className="flex items-center gap-2 md:gap-3 mt-auto">
                                                <div className="flex items-center rounded-xl overflow-hidden border-2 border-[#E91E63] dark:border-[#C2185B]">
                                                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-[#E91E63] dark:text-[#C2185B]" aria-label="تقليل"><Minus className="h-3 w-3 md:h-3.5 md:w-3.5" /></button>
                                                    <span className="px-2 md:px-3 py-1 text-sm font-medium min-w-[2rem] text-center text-black dark:text-white">{item.quantity}</span>
                                                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-[#E91E63] dark:text-[#C2185B]" aria-label="زيادة"><Plus className="h-3 w-3 md:h-3.5 md:w-3.5" /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1" aria-label="حذف">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="space-y-4">
                                <div className="rounded-2xl p-3 md:p-4 space-y-3 md:space-y-4 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                                    <h2 className="font-bold text-base md:text-lg text-black dark:text-white">ملخص الطلب</h2>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2 text-black dark:text-white">
                                            <Tag className="h-4 w-4 text-[#E91E63] dark:text-[#C2185B]" />
                                            كود الخصم
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={coupon}
                                                onChange={(e) => setCoupon(e.target.value)}
                                                placeholder="SAHER10"
                                                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] bg-white dark:bg-gray-800 text-black dark:text-white"
                                                style={{ borderColor: couponApplied ? 'var(--color-primary)' : '#e5e7eb' }}
                                                disabled={couponApplied}
                                            />
                                            <button onClick={applyCoupon} disabled={couponApplied || !coupon} className="px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 bg-[#E91E63] dark:bg-[#C2185B] text-white hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">
                                                تطبيق
                                            </button>
                                        </div>
                                        {couponApplied && <p className="text-xs text-green-600 font-medium">✓ تم تطبيق خصم 10%</p>}
                                    </div>

                                    <div className="space-y-2 text-sm border-t pt-3 md:pt-4 border-gray-200 dark:border-gray-600">
                                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">المجموع الفرعي</span><span className="text-black dark:text-white">{cartSubtotal.toFixed(2)} ر.س</span></div>
                                        {discount > 0 && <div className="flex justify-between text-green-600 dark:text-green-400"><span>خصم الكود</span><span>-{discount.toFixed(2)} ر.س</span></div>}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><Truck className="h-3.5 w-3.5" />الشحن</span>
                                            <span className={shipping === 0 ? "text-green-600 dark:text-green-400 font-medium" : "text-black dark:text-white"}>{shipping === 0 ? "مجاني 🎉" : `${shipping.toFixed(2)} ر.س`}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">ضريبة القيمة المضافة (15%)</span>
                                            <span className="text-black dark:text-white">{tax.toFixed(2)} ر.س</span>
                                        </div>
                                        {shipping > 0 && <p className="text-xs p-2 rounded-lg text-center bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#472b51] dark:text-gray-300">أضيفي {(199 - cartSubtotal).toFixed(2)} ر.س للشحن المجاني</p>}
                                        <div className="border-t pt-2 flex justify-between font-bold text-base border-gray-200 dark:border-gray-600">
                                            <span className="text-black dark:text-white">الإجمالي</span>
                                            <span className="text-[#E91E63] dark:text-[#C2185B]" style={{ fontSize: '1.1rem' }}>{total.toFixed(2)} ر.س</span>
                                        </div>
                                    </div>

                                    <button onClick={() => navigate("/checkout")} className="w-full py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">
                                        إتمام الطلب ←
                                    </button>
                                    <Link to="/products" className="block text-center text-sm transition-colors hover:underline text-[#E91E63] dark:text-[#C2185B]">
                                        متابعة التسوق
                                    </Link>
                                </div>

                                <div className="rounded-2xl p-3 md:p-4 space-y-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#16213e]">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"><Truck className="h-4 w-4 flex-shrink-0 text-[#E91E63] dark:text-[#C2185B]" /><span>توصيل مجاني للطلبات فوق 199 ر.س</span></div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"><RotateCcw className="h-4 w-4 flex-shrink-0 text-[#E91E63] dark:text-[#C2185B]" /><span>إرجاع مجاني خلال 15 يوم</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default CartPage;

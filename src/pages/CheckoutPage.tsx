import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";
import { CheckCircle, ShoppingBag, CreditCard, Truck, MapPin, User, Phone, Mail, ChevronDown } from "lucide-react";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

const CITIES = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "الطائف", "تبوك", "بريدة", "أبها"];

const PAYMENT_OPTIONS = [
    { value: "card", label: "بطاقة ائتمان / مدى", icon: "💳", desc: "Visa, Mastercard, Mada" },
    { value: "tabby", label: "تابي", icon: "⏳", desc: "اشتري الآن وادفع لاحقاً - 4 دفعات" },
    { value: "tamara", label: "تمارا", icon: "📅", desc: "قسّمي على 3 دفعات بدون فوائد" },
    { value: "stcpay", label: "STC Pay", icon: "📱", desc: "ادفعي ببساطة مع STC Pay" },
    { value: "cod", label: "الدفع عند الاستلام", icon: "🏠", desc: "ادفعي عند وصول طلبك" },
];

const CheckoutPage = () => {
    const { cartProducts, cartSubtotal, placeOrder, user } = useStore();
    const navigate = useNavigate();
    const [step, setStep] = useState<"form" | "success">("form");
    const [orderId, setOrderId] = useState("");
    const [form, setForm] = useState({
        name: user?.name ?? "",
        phone: user?.phone ?? "",
        email: user?.email ?? "",
        city: "",
        district: "",
        street: "",
        payment: "card",
    });

    const shipping = cartSubtotal >= 199 ? 0 : 25;
    const total = cartSubtotal + shipping;

    if (cartProducts.length === 0 && step === "form") {
        return (
            <PageLayout title="إتمام الطلب">
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-4">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary-light, #ecd0f6)' }}>
                        <ShoppingBag className="h-10 w-10" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h2 className="text-lg font-semibold text-black dark:text-white">سلتك فارغة</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">أضيفي منتجات للسلة أولاً</p>
                    <Link to="/products" className="px-8 py-3 rounded-xl font-medium text-white bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">تسوقي الآن</Link>
                </div>
            </PageLayout>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = placeOrder(total);
        setOrderId(id);
        setStep("success");
        toast.success("تم تأكيد طلبك بنجاح!");
    };

    if (step === "success") {
        return (
            <PageLayout title="تم الطلب">
                <div className="flex flex-col items-center justify-center py-20 gap-4 px-4 text-center">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30">
                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-1 text-black dark:text-white">شكراً لطلبك! 🎉</h1>
                        <p className="text-gray-600 dark:text-gray-400">تم استلام طلبك بنجاح وسيتم التواصل معك قريباً</p>
                    </div>
                    <div className="px-6 py-3 rounded-xl text-sm font-medium bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#472b51] dark:text-gray-300">
                        رقم الطلب: <span className="font-bold">#{orderId}</span>
                    </div>
                    <div className="flex gap-3 mt-2 flex-wrap justify-center">
                        <Link to="/track-order" className="px-6 py-2.5 rounded-xl font-medium text-white bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">تتبع الطلب</Link>
                        <button onClick={() => navigate("/")} className="px-6 py-2.5 rounded-xl font-medium border-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 border-[#E91E63] dark:border-[#C2185B] text-[#E91E63] dark:text-[#C2185B]">الرئيسية</button>
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="إتمام الطلب">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl">
                    <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "السلة", href: "/cart" }, { label: "إتمام الطلب" }]} />
                    <h1 className="text-2xl font-bold mb-2 text-black dark:text-white">إتمام الطلب</h1>
                    <div className="home-block-line mb-6" />

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left: Form */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Delivery Info */}
                            <div className="rounded-2xl p-4 space-y-4 border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#16213e]">
                                <h2 className="font-bold text-base flex items-center gap-2 text-black dark:text-white">
                                    <MapPin className="h-5 w-5 text-[#E91E63] dark:text-[#C2185B]" />
                                    معلومات التوصيل
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium mb-1.5 flex items-center gap-1 text-black dark:text-white">
                                            <User className="h-3.5 w-3.5 text-[#E91E63] dark:text-[#C2185B]" />
                                            الاسم الكامل
                                        </label>
                                        <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="store-input" placeholder="اسمك الكامل" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1.5 flex items-center gap-1 text-black dark:text-white">
                                            <Phone className="h-3.5 w-3.5 text-[#E91E63] dark:text-[#C2185B]" />
                                            رقم الجوال
                                        </label>
                                        <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="store-input" placeholder="05xxxxxxxx" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-medium mb-1.5 flex items-center gap-1 text-black dark:text-white">
                                            <Mail className="h-3.5 w-3.5 text-[#E91E63] dark:text-[#C2185B]" />
                                            البريد الإلكتروني
                                        </label>
                                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="store-input" placeholder="example@email.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1.5 text-black dark:text-white">المدينة</label>
                                        <div className="relative">
                                            <select required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="store-input appearance-none pr-4 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600" style={{ paddingLeft: '2rem' }}>
                                                <option value="">اختر المدينة</option>
                                                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-[#E91E63] dark:text-[#C2185B]" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1.5 text-black dark:text-white">الحي</label>
                                        <input required type="text" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="store-input" placeholder="اسم الحي" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-medium mb-1.5 text-black dark:text-white">الشارع والرقم</label>
                                        <input required type="text" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="store-input" placeholder="اسم الشارع ورقم المنزل" />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="rounded-2xl p-4 space-y-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#16213e]">
                                <h2 className="font-bold text-base flex items-center gap-2 text-black dark:text-white">
                                    <CreditCard className="h-5 w-5 text-[#E91E63] dark:text-[#C2185B]" />
                                    طريقة الدفع
                                </h2>
                                <div className="space-y-2">
                                    {PAYMENT_OPTIONS.map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-[#E91E63] dark:hover:border-[#C2185B]"
                                            style={{
                                                borderColor: form.payment === opt.value ? 'var(--color-primary)' : '',
                                                background: form.payment === opt.value ? 'var(--color-primary-light, #ecd0f6)' : '',
                                            }}
                                        >
                                            <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={() => setForm({ ...form, payment: opt.value })} style={{ accentColor: 'var(--color-primary)' }} />
                                            <span className="text-xl">{opt.icon}</span>
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-black dark:text-white">{opt.label}</span>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{opt.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery info */}
                            <div className="flex items-center gap-2 text-xs p-3 rounded-xl bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#472b51] dark:text-gray-300">
                                <Truck className="h-4 w-4 flex-shrink-0 text-[#E91E63] dark:text-[#C2185B]" />
                                {shipping === 0 ? "✓ يحظى طلبك بشحن مجاني!" : `رسوم الشحن ${shipping} ر.س — أضيفي ${(199 - cartSubtotal).toFixed(2)} ر.س للشحن المجاني`}
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl p-4 space-y-4 sticky top-24 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                                <h2 className="font-bold text-base text-black dark:text-white">ملخص الطلب</h2>

                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {cartProducts.map((item) => (
                                        <div key={item.id} className="flex gap-3 text-sm">
                                            <div className="relative flex-shrink-0">
                                                <img src={proxyImageUrl(item.image)} alt={item.name} className="h-14 w-14 rounded-xl object-cover bg-gray-100 dark:bg-gray-700" style={{ background: '#f3f4f6' }} onError={handleImageError} />
                                                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: 'var(--color-primary)' }}>{item.quantity}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="line-clamp-2 text-xs text-black dark:text-white">{item.name}</p>
                                                <p className="font-bold text-sm mt-0.5 text-[#E91E63] dark:text-[#C2185B]">{(item.price * item.quantity).toFixed(2)} ر.س</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-3 space-y-2 text-sm border-gray-200 dark:border-gray-600">
                                    <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">المجموع</span><span className="text-black dark:text-white">{cartSubtotal.toFixed(2)} ر.س</span></div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><Truck className="h-3.5 w-3.5" />الشحن</span>
                                        <span className={shipping === 0 ? "text-green-600 dark:text-green-400 font-medium" : "text-black dark:text-white"}>{shipping === 0 ? "مجاني" : `${shipping} ر.س`}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-base border-t pt-2 border-gray-200 dark:border-gray-600">
                                        <span className="text-black dark:text-white">الإجمالي</span>
                                        <span className="text-[#E91E63] dark:text-[#C2185B]" style={{ fontSize: '1.1rem' }}>{total.toFixed(2)} ر.س</span>
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">
                                    تأكيد الطلب ✓
                                </button>
                                <Link to="/cart" className="block text-center text-xs transition-colors hover:underline text-[#E91E63] dark:text-[#C2185B]">
                                    ← العودة للسلة
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
};

export default CheckoutPage;

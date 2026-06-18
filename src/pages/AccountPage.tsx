import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/context/StoreContext";
import { User, Package, Heart, MapPin, LogOut, ChevronLeft, Globe } from "lucide-react";
import { toast } from "sonner";
import { SITE } from "@/data/catalog";
import { useTranslation } from "react-i18next";

const menuItems = [
    { icon: User, label: "بياناتي الشخصية", section: "profile" },
    { icon: Package, label: "طلباتي", section: "orders" },
    { icon: Heart, label: "المفضلة", href: "/wishlist" },
    { icon: MapPin, label: "عناويني", section: "addresses" },
];

const AccountPage = () => {
    const { section } = useParams<{ section: string }>();
    const navigate = useNavigate();
    const { user, login, register, logout, orders, addresses, addAddress } = useStore();
    const { i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
    const [registerForm, setRegisterForm] = useState({ name: "", phone: "", email: "", password: "" });
    const [addressForm, setAddressForm] = useState({ label: "المنزل", city: "", district: "", street: "", isDefault: true });

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
        toast.success(newLang === 'ar' ? "تم التحويل إلى العربية" : "Switched to English");
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(loginForm.phone, loginForm.password)) {
            toast.success("تم تسجيل الدخول بنجاح");
            navigate("/account");
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (register(registerForm)) {
            toast.success("تم إنشاء الحساب بنجاح");
            navigate("/account");
        }
    };

    if (!user) {
        return (
            <PageLayout title="حسابي">
                <div className="flex-1 flex items-center justify-center px-4 py-10">
                    <div className="w-full max-w-md bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-2xl p-6 shadow-sm">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
                            {(["login", "register"] as const).map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? "bg-white dark:bg-gray-700 shadow text-black dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                                    {tab === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
                                </button>
                            ))}
                        </div>

                        {activeTab === "login" ? (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">رقم الجوال أو البريد</label>
                                    <input type="text" required value={loginForm.phone} onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })} placeholder="05xxxxxxxx" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] bg-white dark:bg-gray-800 text-black dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">كلمة المرور</label>
                                    <input type="password" required value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] bg-white dark:bg-gray-800 text-black dark:text-white" />
                                </div>
                                <Link to="/forgot-password" className="block text-xs text-[#E91E63] dark:text-[#C2185B] hover:underline text-left">نسيت كلمة المرور؟</Link>
                                <button type="submit" className="w-full bg-[#E91E63] dark:bg-[#C2185B] text-white py-3 rounded-lg font-medium hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">تسجيل الدخول</button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">الاسم الكامل</label>
                                    <input type="text" required value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] bg-white dark:bg-gray-800 text-black dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">رقم الجوال</label>
                                    <input type="tel" required value={registerForm.phone} onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })} placeholder="05xxxxxxxx" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] bg-white dark:bg-gray-800 text-black dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">البريد الإلكتروني</label>
                                    <input type="email" required value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] bg-white dark:bg-gray-800 text-black dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">كلمة المرور</label>
                                    <input type="password" required value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] bg-white dark:bg-gray-800 text-black dark:text-white" />
                                </div>
                                <button type="submit" className="w-full bg-[#E91E63] dark:bg-[#C2185B] text-white py-3 rounded-lg font-medium hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">إنشاء الحساب</button>
                            </form>
                        )}
                    </div>
                </div>
            </PageLayout>
        );
    }

    const renderSection = () => {
        if (section === "profile") {
            return (
                <div className="space-y-4">
                    <h2 className="font-bold text-lg text-black dark:text-white">بياناتي الشخصية</h2>
                    <div className="bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-xl p-4 space-y-3">
                        <div><span className="text-sm text-gray-600 dark:text-gray-400">الاسم:</span> <span className="font-medium text-black dark:text-white">{user.name}</span></div>
                        <div><span className="text-sm text-gray-600 dark:text-gray-400">الجوال:</span> <span className="font-medium text-black dark:text-white">{user.phone}</span></div>
                        <div><span className="text-sm text-gray-600 dark:text-gray-400">البريد:</span> <span className="font-medium text-black dark:text-white">{user.email}</span></div>
                    </div>
                </div>
            );
        }
        if (section === "orders") {
            return (
                <div className="space-y-4">
                    <h2 className="font-bold text-lg text-black dark:text-white">طلباتي</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">لا توجد طلبات سابقة</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-black dark:text-white">#{order.id}</span>
                                    <span className="text-sm text-[#E91E63] dark:text-[#C2185B]">{order.status === "processing" ? "قيد المعالجة" : order.status}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(order.date).toLocaleDateString("ar-SA")}</p>
                                <p className="font-bold mt-1 text-black dark:text-white">{order.total.toFixed(2)} ر.س</p>
                            </div>
                        ))
                    )}
                </div>
            );
        }
        if (section === "addresses") {
            return (
                <div className="space-y-4">
                    <h2 className="font-bold text-lg text-black dark:text-white">عناويني</h2>
                    {addresses.map((addr) => (
                        <div key={addr.id} className="bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                            <p className="font-medium text-black dark:text-white">{addr.label}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{addr.city} - {addr.district} - {addr.street}</p>
                        </div>
                    ))}
                    <form onSubmit={(e) => { e.preventDefault(); addAddress(addressForm); toast.success("تمت إضافة العنوان"); setAddressForm({ label: "المنزل", city: "", district: "", street: "", isDefault: false }); }} className="bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-xl p-4 space-y-3">
                        <h3 className="font-medium text-black dark:text-white">إضافة عنوان جديد</h3>
                        <input required placeholder="المدينة" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-black dark:text-white" />
                        <input required placeholder="الحي" value={addressForm.district} onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-black dark:text-white" />
                        <input required placeholder="الشارع" value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-black dark:text-white" />
                        <button type="submit" className="w-full bg-[#E91E63] dark:bg-[#C2185B] text-white py-2 rounded-lg text-sm hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">حفظ العنوان</button>
                    </form>
                </div>
            );
        }
        return null;
    };

    return (
        <PageLayout title="حسابي">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-3xl">
                    <div className="bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-2xl p-6 mb-6 flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                            <User className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-white">مرحباً {user.name}</h2>
                            <p className="text-sm opacity-80 text-white">عضو في {SITE.name}</p>
                        </div>
                    </div>

                    {section ? (
                        <div>
                            <button onClick={() => navigate("/account")} className="text-sm text-[#E91E63] dark:text-[#C2185B] mb-4 hover:underline">← العودة</button>
                            {renderSection()}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {menuItems.map((item) => (
                                <Link key={item.label} to={item.href ?? `/account/${item.section}`} className="flex items-center gap-3 p-4 bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#E91E63] dark:hover:border-[#C2185B] transition-colors group">
                                    <item.icon className="h-5 w-5 text-[#E91E63] dark:text-[#C2185B]" />
                                    <span className="flex-1 text-sm font-medium text-black dark:text-white">{item.label}</span>
                                    <ChevronLeft className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-[#E91E63] dark:group-hover:text-[#C2185B] transition-colors" />
                                </Link>
                            ))}
                            <button onClick={toggleLanguage} className="flex items-center gap-3 p-4 w-full bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#E91E63] dark:hover:border-[#C2185B] transition-colors">
                                <Globe className="h-5 w-5 text-[#E91E63] dark:text-[#C2185B]" />
                                <span className="flex-1 text-sm font-medium text-right text-black dark:text-white">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
                            </button>
                            <button onClick={() => { logout(); toast.success("تم تسجيل الخروج"); }} className="flex items-center gap-3 p-4 w-full bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-xl hover:border-red-600 dark:hover:border-red-400 transition-colors text-red-600 dark:text-red-400">
                                <LogOut className="h-5 w-5" />
                                <span className="flex-1 text-sm font-medium text-right">تسجيل الخروج</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default AccountPage;

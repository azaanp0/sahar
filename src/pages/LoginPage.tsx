import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";
import { Apple, Facebook, Mail } from "lucide-react";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useStore();
    const [formData, setFormData] = useState({ phone: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            if (login(formData.phone, formData.password)) {
                toast.success("تم تسجيل الدخول بنجاح");
                navigate("/account");
            } else {
                toast.error("بيانات الدخول غير صحيحة");
            }
            setLoading(false);
        }, 1000);
    };

    const handleSocialLogin = (provider: string) => {
        toast.info(`تسجيل الدخول عبر ${provider} قيد التطوير`);
    };

    return (
        <PageLayout title="تسجيل الدخول">
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] mb-4 transition-colors duration-300 ease">
                        ← رجوع
                    </button>
                    <div className="bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-center mb-6">
                            <img src="/images/dashboard-logo.png" alt="عطور و تجميل" className="h-16 w-auto object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-center mb-2 text-black dark:text-white">مرحباً بعودتك</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">سجلي دخولك لمتابعة تسوقك</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">
                                    رقم الجوال أو البريد الإلكتروني
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="05xxxxxxxx أو email@example.com"
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] focus:ring-1 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all"
                                    dir="ltr"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">كلمة المرور</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] focus:ring-1 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all"
                                    dir="ltr"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-black dark:text-white">
                                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                                    <span>تذكيري</span>
                                </label>
                                <Link to="/forgot-password" className="text-sm text-[#E91E63] dark:text-[#C2185B] hover:underline">
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#E91E63] dark:bg-[#C2185B] text-white py-3 rounded-lg font-medium hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                            </button>
                        </form>

                        <div className="my-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-600" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-[#16213e] text-gray-600 dark:text-gray-400">أو</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleSocialLogin("Apple")}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Apple className="h-5 w-5" />
                                تسجيل الدخول بـ Apple
                            </button>
                            <button
                                onClick={() => handleSocialLogin("Facebook")}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Facebook className="h-5 w-5 text-blue-600" />
                                تسجيل الدخول بـ Facebook
                            </button>
                            <button
                                onClick={() => handleSocialLogin("Google")}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Mail className="h-5 w-5 text-red-500" />
                                تسجيل الدخول بـ Google
                            </button>
                        </div>

                        <p className="text-center text-sm mt-6">
                            ليس لديك حساب؟{" "}
                            <Link to="/register" className="text-[#E91E63] dark:text-[#C2185B] font-medium hover:underline">
                                إنشاء حساب جديد
                            </Link>
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors duration-300 ease">
                            العودة للرئيسية
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default LoginPage;

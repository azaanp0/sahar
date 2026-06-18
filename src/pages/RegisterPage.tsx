import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";
import { Apple, Facebook, Mail } from "lucide-react";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useStore();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("كلمات المرور غير متطابقة");
            return;
        }
        
        if (!acceptTerms) {
            toast.error("يجب الموافقة على الشروط والأحكام");
            return;
        }

        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            if (register(formData)) {
                toast.success("تم إنشاء الحساب بنجاح");
                navigate("/verify-otp", { state: { phone: formData.phone } });
            } else {
                toast.error("حدث خطأ أثناء إنشاء الحساب");
            }
            setLoading(false);
        }, 1000);
    };

    const handleSocialLogin = (provider: string) => {
        toast.info(`تسجيل الدخول عبر ${provider} قيد التطوير`);
    };

    return (
        <PageLayout title="إنشاء حساب">
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] mb-4 transition-colors duration-300 ease">
                        ← رجوع
                    </button>
                    <div className="bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-center mb-6">
                            <img src="/images/dashboard-logo.png" alt="عطور و تجميل" className="h-16 w-auto object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-center mb-2 text-black dark:text-white">إنشاء حساب جديد</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">انضمي إلى عائلة سحر</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">الاسم الكامل</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="أدخلي اسمك الكامل"
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] focus:ring-1 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">رقم الجوال</label>
                                <div className="flex gap-2">
                                    <span className="flex items-center justify-center px-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
                                        🇸🇦 +966
                                    </span>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="5xxxxxxxx"
                                        maxLength={9}
                                        className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] focus:ring-1 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">البريد الإلكتروني</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@example.com"
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
                                    minLength={8}
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] focus:ring-1 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all"
                                    dir="ltr"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-black dark:text-white">تأكيد كلمة المرور</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    minLength={8}
                                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] focus:ring-1 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all"
                                    dir="ltr"
                                />
                            </div>
                            <label className="flex items-start gap-2 text-sm text-black dark:text-white">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="mt-1 rounded border-gray-300 dark:border-gray-600"
                                    required
                                />
                                <span>
                                    أوافق على{" "}
                                    <Link to="/terms" className="text-[#E91E63] dark:text-[#C2185B] hover:underline">
                                        الشروط والأحكام
                                    </Link>{" "}
                                    و{" "}
                                    <Link to="/privacy" className="text-[#E91E63] dark:text-[#C2185B] hover:underline">
                                        سياسة الخصوصية
                                    </Link>
                                </span>
                            </label>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#E91E63] dark:bg-[#C2185B] text-white py-3 rounded-lg font-medium hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
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
                                تسجيل بـ Apple
                            </button>
                            <button
                                onClick={() => handleSocialLogin("Facebook")}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Facebook className="h-5 w-5 text-blue-600" />
                                تسجيل بـ Facebook
                            </button>
                            <button
                                onClick={() => handleSocialLogin("Google")}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Mail className="h-5 w-5 text-red-500" />
                                تسجيل بـ Google
                            </button>
                        </div>

                        <p className="text-center text-sm mt-6">
                            لديك حساب بالفعل؟{" "}
                            <Link to="/login" className="text-[#E91E63] dark:text-[#C2185B] font-medium hover:underline">
                                تسجيل الدخول
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

export default RegisterPage;

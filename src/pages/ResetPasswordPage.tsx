import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("كلمات المرور غير متطابقة");
            return;
        }

        if (formData.password.length < 8) {
            toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
            return;
        }

        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            toast.success("تم إعادة تعيين كلمة المرور بنجاح");
            navigate("/login");
        }, 1000);
    };

    if (!token) {
        return (
            <PageLayout title="رابط غير صالح">
                <div className="flex-1 flex items-center justify-center px-4 py-10">
                    <div className="w-full max-w-md text-center">
                        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                            <h1 className="text-xl font-bold mb-2">رابط غير صالح</h1>
                            <p className="text-muted-foreground mb-6">
                                رابط إعادة تعيين كلمة المرور منتهي الصلاحية أو غير صحيح
                            </p>
                            <Link
                                to="/forgot-password"
                                className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                طلب رابط جديد
                            </Link>
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="إعادة تعيين كلمة المرور">
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <div className="text-center mb-6">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Lock className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mb-2">إعادة تعيين كلمة المرور</h1>
                            <p className="text-muted-foreground text-sm">
                                أدخلي كلمة المرور الجديدة لحسابك
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">كلمة المرور الجديدة</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        minLength={8}
                                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
                                        dir="ltr"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">تأكيد كلمة المرور</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="••••••••"
                                        minLength={8}
                                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
                                        dir="ltr"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-muted rounded-lg p-3 text-xs text-muted-foreground">
                                <p className="font-medium mb-1">كلمة المرور يجب أن تحتوي على:</p>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>8 أحرف على الأقل</li>
                                    <li>حرف كبير واحد على الأقل</li>
                                    <li>حرف صغير واحد على الأقل</li>
                                    <li>رقم واحد على الأقل</li>
                                </ul>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                                العودة لتسجيل الدخول
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ResetPasswordPage;

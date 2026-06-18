import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";
import { ArrowRight, Mail } from "lucide-react";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setSent(true);
            toast.success("تم إرسال رابط إعادة تعيين كلمة المرور");
            setLoading(false);
        }, 1000);
    };

    return (
        <PageLayout title="نسيت كلمة المرور">
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        {!sent ? (
                            <>
                                <div className="text-center mb-6">
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <Mail className="h-8 w-8 text-primary" />
                                    </div>
                                    <h1 className="text-2xl font-bold mb-2">نسيت كلمة المرور؟</h1>
                                    <p className="text-muted-foreground text-sm">
                                        أدخلي بريدك الإلكتروني أو رقم الجوال وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">
                                            البريد الإلكتروني أو رقم الجوال
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="email@example.com أو 05xxxxxxxx"
                                            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            dir="ltr"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? "جاري الإرسال..." : (
                                            <>
                                                إرسال رابط إعادة التعيين
                                                <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <Mail className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold mb-2">تم الإرسال بنجاح!</h2>
                                <p className="text-muted-foreground text-sm mb-6">
                                    تم إرسال رابط إعادة تعيين كلمة المرور إلى {email}
                                </p>
                                        <button
                                    onClick={() => setSent(false)}
                                    className="text-primary font-medium hover:underline"
                                >
                                    إعادة الإرسال
                                </button>
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                                العودة لتسجيل الدخول
                            </Link>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                            العودة للرئيسية
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ForgotPasswordPage;

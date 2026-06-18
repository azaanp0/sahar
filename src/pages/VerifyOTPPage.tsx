import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";
import { Shield, ArrowRight } from "lucide-react";

const VerifyOTPPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const phone = location.state?.phone || "";
    
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0 && !canResend) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [countdown, canResend]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
            const newOtp = [...otp];
            pastedData.split("").forEach((char, i) => {
                if (i < 6) newOtp[i] = char;
            });
            setOtp(newOtp);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        
        if (otpValue.length !== 6) {
            toast.error("أدخلي رمز التحقق المكون من 6 أرقام");
            return;
        }

        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            toast.success("تم التحقق بنجاح");
            navigate("/account");
            setLoading(false);
        }, 1000);
    };

    const handleResend = () => {
        setCountdown(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        toast.success("تم إرسال رمز تحقق جديد");
    };

    return (
        <PageLayout title="التحقق برمز OTP">
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                        <div className="text-center mb-6">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mb-2">التحقق برمز OTP</h1>
                            <p className="text-muted-foreground text-sm">
                                تم إرسال رمز تحقق مكون من 6 أرقام إلى {phone}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-center gap-2" dir="ltr">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 h-12 text-center text-2xl font-bold border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        required
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.join("").length !== 6}
                                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? "جاري التحقق..." : (
                                    <>
                                        تحقق
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            {canResend ? (
                                <button
                                    onClick={handleResend}
                                    className="text-primary font-medium hover:underline"
                                >
                                    إعادة إرسال الرمز
                                </button>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    إعادة الإرسال خلال <span className="font-bold text-primary">{countdown}</span> ثانية
                                </p>
                            )}
                        </div>

                        <div className="mt-4 text-center">
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

export default VerifyOTPPage;

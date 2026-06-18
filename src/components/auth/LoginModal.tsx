import { useState } from "react";
import { X, Mail, Lock, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OTPInput from "@/components/auth/OTPInput";
import SocialLogin from "@/components/auth/SocialLogin";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const { login } = useStore();
    const [step, setStep] = useState<"phone" | "otp" | "register">("phone");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) {
            toast.error("يرجى إدخال رقم الجوال");
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep("otp");
            toast.success("تم إرسال رمز التحقق");
        }, 1000);
    };

    const handleOTPSubmit = (otp: string) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            login(phone, "");
            toast.success("تم تسجيل الدخول بنجاح");
            onClose();
        }, 1000);
    };

    const handlePasswordLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone || !password) {
            toast.error("يرجى ملء جميع الحقول");
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            login(phone, password);
            toast.success("تم تسجيل الدخول بنجاح");
            onClose();
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-[#16213e]">
                <DialogHeader>
                    <button
                        onClick={onClose}
                        className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </DialogHeader>

                <div className="pt-8 pb-4">
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <img src="/images/dashboard-logo.png" alt="منصة سحر" className="h-12 w-auto object-contain" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">منصة سحر</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Care & Beauty</p>
                    </div>

                    {step === "phone" && (
                        <form onSubmit={handlePhoneSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="phone" className="text-gray-900 dark:text-white">رقم الجوال أو البريد الإلكتروني</Label>
                                <div className="relative mt-2">
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        id="phone"
                                        type="text"
                                        placeholder="05XXXXXXXX أو email@example.com"
                                        className="pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-gray-900 dark:text-white">كلمة المرور</Label>
                                <div className="relative mt-2">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#E91E63] hover:bg-[#B089C0]"
                                disabled={loading}
                            >
                                {loading ? "جاري التحميل..." : "دخول"}
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setStep("otp")}
                                    className="text-sm text-[#E91E63] hover:underline"
                                >
                                    أو دخول برمز التحقق (OTP)
                                </button>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-[#16213e] px-2 text-gray-500 dark:text-gray-400">أو</span>
                                </div>
                            </div>

                            <SocialLogin />

                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep("register")}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63]"
                                >
                                    ليس لديك حساب؟ <span className="font-medium">إنشاء حساب جديد</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {step === "otp" && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    تم إرسال رمز التحقق إلى {phone}
                                </p>
                                <OTPInput length={6} onComplete={handleOTPSubmit} />
                            </div>

                            <button
                                onClick={() => setStep("phone")}
                                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] mx-auto"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                العودة
                            </button>
                        </div>
                    )}

                    {step === "register" && (
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="text-gray-900 dark:text-white">الاسم الكامل</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="الاسم الكامل"
                                    className="mt-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <Label htmlFor="reg-phone" className="text-gray-900 dark:text-white">رقم الجوال</Label>
                                <div className="relative mt-2">
                                    <Input
                                        id="reg-phone"
                                        type="text"
                                        placeholder="05XXXXXXXX"
                                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-gray-900 dark:text-white">البريد الإلكتروني</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    className="mt-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                    dir="ltr"
                                />
                            </div>

                            <div>
                                <Label htmlFor="reg-password" className="text-gray-900 dark:text-white">كلمة المرور</Label>
                                <Input
                                    id="reg-password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="mt-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <Label htmlFor="confirm-password" className="text-gray-900 dark:text-white">تأكيد كلمة المرور</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="mt-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#E91E63] hover:bg-[#B089C0]"
                            >
                                إنشاء الحساب
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setStep("phone")}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63]"
                                >
                                    لديك حساب بالفعل؟ <span className="font-medium">تسجيل الدخول</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;

import { useState } from "react";
import { User, Mail, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import OTPInput from "./OTPInput";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

interface RegisterFormProps {
    onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const { register } = useStore();
    const [step, setStep] = useState<"form" | "otp">("form");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.email || !formData.password) {
            toast.error("يرجى ملء جميع الحقول المطلوبة");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("كلمة المرور غير متطابقة");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
            return;
        }

        if (!agreeTerms) {
            toast.error("يرجى الموافقة على الشروط والأحكام");
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep("otp");
            toast.success("تم إرسال رمز التحقق إلى جوالك");
        }, 1000);
    };

    const handleOTPComplete = (otp: string) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            register({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                password: formData.password
            });
            toast.success("تم إنشاء الحساب بنجاح");
            onSuccess?.();
        }, 1000);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {step === "form" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <div className="relative mt-2">
                            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="name"
                                type="text"
                                placeholder="الاسم الكامل"
                                className="pr-10"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="phone">رقم الجوال *</Label>
                        <div className="relative mt-2">
                            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="05XXXXXXXX"
                                className="pr-10"
                                dir="ltr"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <div className="relative mt-2">
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                className="pr-10"
                                dir="ltr"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="password">كلمة المرور *</Label>
                        <div className="relative mt-2">
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pr-10"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="confirm-password">تأكيد كلمة المرور *</Label>
                        <div className="relative mt-2">
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="••••••••"
                                className="pr-10"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="terms"
                            checked={agreeTerms}
                            onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer leading-relaxed"
                        >
                            أوافق على <a href="/terms" className="text-[#E91E63] hover:underline">الشروط والأحكام</a> و{" "}
                            <a href="/privacy" className="text-[#E91E63] hover:underline">سياسة الخصوصية</a>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#E91E63] hover:bg-[#B089C0]"
                        disabled={loading}
                    >
                        {loading ? "جاري التحميل..." : "إنشاء الحساب"}
                    </Button>
                </form>
            )}

            {step === "otp" && (
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            تم إرسال رمز التحقق إلى {formData.phone}
                        </p>
                        <OTPInput length={6} onComplete={handleOTPComplete} />
                    </div>

                    <button
                        onClick={() => setStep("form")}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63]"
                    >
                        العودة وتعديل البيانات
                    </button>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Clock, RefreshCw } from "lucide-react";

interface OTPVerificationProps {
    phone: string;
    onVerify: (code: string) => void;
    onResend: () => void;
    isLoading?: boolean;
}

const OTPVerification = ({ phone, onVerify, onResend, isLoading }: OTPVerificationProps) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft > 0 && !canResend) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !canResend) {
            setCanResend(true);
        }
    }, [timeLeft, canResend]);

    const handleInputChange = (index: number, value: string) => {
        // Allow only numbers
        const numericValue = value.replace(/[^0-9]/g, "");
        
        const newOtp = [...otp];
        newOtp[index] = numericValue.slice(-1); // Take only the last character
        setOtp(newOtp);

        // Auto-focus next input
        if (numericValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all fields are filled
        if (newOtp.every((digit) => digit !== "")) {
            onVerify(newOtp.join(""));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
        const newOtp = [...otp];
        
        pastedData.split("").forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char;
            }
        });
        
        setOtp(newOtp);
        
        // Focus the next empty input or the last one
        const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();

        // Auto-submit if all filled
        if (newOtp.every((digit) => digit !== "")) {
            onVerify(newOtp.join(""));
        }
    };

    const handleResend = () => {
        onResend();
        setTimeLeft(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-[#E91E63]/10 dark:bg-[#C2185B]/20 rounded-full">
                        <ShieldCheck className="h-8 w-8 text-[#E91E63] dark:text-[#C2185B]" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white">تأكيد رقم الجوال</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    أرسلنا كود تحقق مكون من 6 أرقام إلى
                </p>
                <p className="font-medium text-lg text-black dark:text-white" dir="ltr">
                    {phone}
                </p>
            </div>

            <div className="space-y-4">
                <Label>أدخلي كود التحقق</Label>
                <div className="flex gap-2 justify-center" dir="ltr">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center text-xl font-bold bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:border-[#E91E63] dark:focus:border-[#C2185B] focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20 dark:focus:ring-[#C2185B]/20"
                            autoFocus={index === 0}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                {canResend ? (
                    <Button
                        variant="link"
                        className="p-0 h-auto text-[#E91E63] hover:text-[#C2185B]"
                        onClick={handleResend}
                        disabled={isLoading}
                    >
                        <RefreshCw className="h-4 w-4 ml-1" />
                        إعادة إرسال الكود
                    </Button>
                ) : (
                    <span>إعادة الإرسال خلال {formatTime(timeLeft)}</span>
                )}
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm space-y-2">
                <p className="font-medium text-black dark:text-white">لم تصلك الرسالة؟</p>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-xs">
                    <li>• تأكدي من صحة رقم الجوال</li>
                    <li>• تأكدي من عدم حظر الرسائل من أرقام غير معروفة</li>
                    <li>• انتظري بضع دقائق قبل طلب إعادة الإرسال</li>
                </ul>
            </div>
        </div>
    );
};

export default OTPVerification;

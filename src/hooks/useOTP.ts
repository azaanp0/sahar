import { useState, useCallback } from "react";

interface UseOTPReturn {
    sendOTP: (phone: string, purpose?: string) => Promise<boolean>;
    verifyOTP: (phone: string, code: string, purpose?: string) => Promise<boolean>;
    loading: boolean;
    error: string | null;
    countdown: number;
    startCountdown: () => void;
}

export const useOTP = (): UseOTPReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);

    const sendOTP = useCallback(async (phone: string, purpose = "login"): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // In real implementation, call API
            // await api.post('/auth/send-otp', { phone, purpose });
            
            return true;
        } catch (err) {
            setError("فشل إرسال رمز التحقق");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const verifyOTP = useCallback(async (phone: string, code: string, purpose = "login"): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // In real implementation, call API
            // await api.post('/auth/verify-otp', { phone, code, purpose });
            
            return true;
        } catch (err) {
            setError("رمز التحقق غير صحيح");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const startCountdown = useCallback(() => {
        setCountdown(60);
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    return {
        sendOTP,
        verifyOTP,
        loading,
        error,
        countdown,
        startCountdown
    };
};

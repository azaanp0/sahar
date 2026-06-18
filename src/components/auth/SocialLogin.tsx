import { Apple, Facebook, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SocialLogin = () => {
    const handleSocialLogin = (provider: string) => {
        toast.success(`تسجيل الدخول عبر ${provider} قيد التطوير`);
    };

    return (
        <div className="space-y-3">
            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 border-gray-200 dark:border-gray-600 hover:border-[#E91E63] dark:hover:border-[#C2185B] text-black dark:text-white"
                onClick={() => handleSocialLogin("Google")}
            >
                <Chrome className="w-5 h-5" />
                <span>تسجيل الدخول عبر Google</span>
            </Button>

            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 border-gray-200 dark:border-gray-600 hover:border-[#E91E63] dark:hover:border-[#C2185B] text-black dark:text-white"
                onClick={() => handleSocialLogin("Apple")}
            >
                <Apple className="w-5 h-5" />
                <span>تسجيل الدخول عبر Apple</span>
            </Button>

            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 border-gray-200 dark:border-gray-600 hover:border-[#E91E63] dark:hover:border-[#C2185B] text-black dark:text-white"
                onClick={() => handleSocialLogin("Facebook")}
            >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span>تسجيل الدخول عبر Facebook</span>
            </Button>
        </div>
    );
};

export default SocialLogin;

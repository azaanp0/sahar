import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // محاكاة إرسال للـ API
        setTimeout(() => {
            toast.success("تم الاشتراك بنجاح في النشرة البريدية");
            setEmail("");
            setIsLoading(false);
        }, 1000);
    };

    return (
        <section className="py-6 md:py-8 lg:py-12 bg-[#E91E63]/10 dark:bg-[#C2185B]/20">
            <div className="container mx-auto px-4 max-w-screen-xl">
                <div className="max-w-full sm:max-w-2xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="p-2 bg-[#E91E63] dark:bg-[#C2185B] rounded-lg">
                            <Mail className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">اشتركي في نشرتنا البريدية</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        احصلي على أحدث العروض والخصومات الحصرية مباشرة في بريدك الإلكتروني
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-full sm:max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="أدخلي بريدك الإلكتروني"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1"
                        />
                        <Button type="submit" disabled={isLoading} className="gap-2 w-full sm:w-auto bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] text-white transition-colors duration-300 ease">
                            {isLoading ? (
                                "جاري الإرسال..."
                            ) : (
                                <>
                                    اشتراك
                                    <Send className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                        بالاشتراك أنت توافقين على سياسة الخصوصية الخاصة بنا
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;

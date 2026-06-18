import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { SITE } from "@/data/catalog";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

const STORAGE_KEY = "saher-promo-popup";

const PromotionalPopup = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hidden = localStorage.getItem(STORAGE_KEY);
        if (!hidden) {
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setVisible(false);
        localStorage.setItem(STORAGE_KEY, "hidden");
    };

    if (!visible) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={handleClose}
                aria-hidden="true"
            />
            <div
                className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                role="dialog"
                aria-label="عرض ترويجي"
            >
                <div className="pointer-events-auto relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                    <button
                        onClick={handleClose}
                        className="absolute top-3 left-3 z-10 p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
                        aria-label="إغلاق"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="p-6 text-center" style={{ background: "linear-gradient(135deg, var(--color-primary-light) 0%, #fff 100%)" }}>
                        <img
                            src={proxyImageUrl(SITE.logo)}
                            alt={SITE.name}
                            className="h-16 w-auto mx-auto mb-4 object-contain"
                            onError={handleImageError}
                        />
                        <h2 className="text-2xl font-bold mb-2 text-black dark:text-white" style={{ color: "var(--color-primary-reverse)" }}>
                            مرحباً بك في {SITE.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            خصومات حصرية تصل إلى 50% + شحن مجاني للطلبات فوق 199 ريال
                        </p>
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/offers"
                                onClick={handleClose}
                                className="w-full py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 bg-[#E91E63] hover:bg-[#C2185B]"
                            >
                                تسوقي العروض الآن
                            </Link>
                            <button
                                onClick={handleClose}
                                className="w-full py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                لا شكراً، سأتصفح لاحقاً
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PromotionalPopup;

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

const slides = [
    { 
        id: 1, 
        image: "https://cdn.files.salla.network/homepage/1945128061/58552c94-ff77-4839-9a1b-1ff5cc719110.webp", 
        href: "/offers",
        title: "عروض الصيف الاستثنائية",
        description: "خصومات تصل إلى 50% على جميع منتجات العناية بالبشرة",
        cta: "تسوقي الآن",
        ctaColor: "bg-primary"
    },
    { 
        id: 2, 
        image: "https://cdn.files.salla.network/homepage/1945128061/50ded52f-5ded-4148-b1c7-f51ea016a4b9.webp", 
        href: "/category/korean",
        title: "الجمال الكوري الأصلي",
        description: "اكتشفي أحدث منتجات العناية الكورية من أشهر الماركات",
        cta: "اكتشفي المزيد",
        ctaColor: "bg-pink-500"
    },
    { 
        id: 3, 
        image: "https://cdn.files.salla.network/homepage/1945128061/b48162e1-f523-468f-a5a6-7c2914f69c73.webp", 
        href: "/category/makeup",
        title: "مكياج احترافي",
        description: "جميع ما تحتاجينه لإطلالة مثالية",
        cta: "تسوقي المكياج",
        ctaColor: "bg-purple-500"
    },
    { 
        id: 4, 
        image: "https://cdn.files.salla.network/homepage/1945128061/e90fa198-e472-4e11-80ff-9769f4488552.webp", 
        href: "/category/perfume",
        title: "عطور فاخرة",
        description: "عطور من أشهر الماركات العالمية",
        cta: "اكتشفي العطور",
        ctaColor: "bg-amber-500"
    },
    { 
        id: 5, 
        image: "https://cdn.files.salla.network/homepage/1945128061/dcb9029e-9e45-4096-bd0f-de6d6565a976.webp", 
        href: "/offers",
        title: "شحن مجاني",
        description: "توصيل مجاني للطلبات فوق 199 ريال",
        cta: "تسوقي الآن",
        ctaColor: "bg-green-500"
    },
];

const HeroBanner = () => {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
    const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

    useEffect(() => {
        const t = setInterval(next, 4000);
        return () => clearInterval(t);
    }, [next]);

    return (
        <section className="advanced-slider advanced-slider--0 overflow-hidden bg-background dark:bg-gray-800">
            <div className="relative overflow-hidden w-full" dir="ltr">
                {/* Slides track */}
                <div
                    className="flex transition-all duration-700 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <Link key={slide.id} to={slide.href} className="min-w-full block flex-shrink-0">
                            <img
                                src={proxyImageUrl(slide.image)}
                                alt="عرض سحر"
                                className="advanced-slider__image w-full object-cover"
                                loading={current === slides.indexOf(slide) ? "eager" : "lazy"}
                                onError={handleImageError}
                            />
                        </Link>
                    ))}
                </div>

                {/* Navigation Buttons */}
                {/* Prev Button (Right in RTL) */}
                <button
                    onClick={prev}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 dark:bg-white/20 dark:hover:bg-white/40 shadow transition-all z-10"
                    aria-label="الشريحة السابقة"
                >
                    <ChevronRight className="h-5 w-5 text-white dark:text-gray-200" />
                </button>

                {/* Next Button (Left in RTL) */}
                <button
                    onClick={next}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 dark:bg-white/20 dark:hover:bg-white/40 shadow transition-all z-10"
                    aria-label="الشريحة التالية"
                >
                    <ChevronLeft className="h-5 w-5 text-white dark:text-gray-200" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full transition-all ${
                                i === current 
                                    ? "w-6 bg-[#E91E63]" 
                                    : "w-2 bg-white/50 hover:bg-white/70 dark:bg-white/30 dark:hover:bg-white/50"
                            }`}
                            aria-label={`الذهاب إلى الشريحة ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;

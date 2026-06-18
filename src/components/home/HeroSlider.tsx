import { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

interface Slide {
    id: number;
    image: string;
    href: string;
    title: string;
    description: string;
    cta: string;
    ctaColor: string;
}

const slides: Slide[] = [
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
];

const HeroSlider = memo(() => {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const next = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent((p) => (p + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 700);
    }, [isAnimating]);

    const prev = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent((p) => (p - 1 + slides.length) % slides.length);
        setTimeout(() => setIsAnimating(false), 700);
    }, [isAnimating]);

    const goToSlide = useCallback((index: number) => {
        if (isAnimating || index === current) return;
        setIsAnimating(true);
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 700);
    }, [isAnimating, current]);

    useEffect(() => {
        const t = setInterval(next, 5000);
        return () => clearInterval(t);
    }, [next]);

    return (
        <section className="relative overflow-hidden bg-background dark:bg-[#1a1a2e]">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                {/* Slides */}
                <div className="relative w-full h-full">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        >
                            <Link to={slide.href} className="block w-full h-full">
                                <img
                                    src={proxyImageUrl(slide.image)}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                    loading={index === current ? "eager" : "lazy"}
                                    onError={handleImageError}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-white px-3 sm:px-4 max-w-4xl">
                                        <h2 className="font-bold mb-3 sm:mb-4 drop-shadow-lg" style={{ fontSize: 'clamp(1.25rem, 4vw, 3rem)' }}>
                                            {slide.title}
                                        </h2>
                                        <p className="mb-4 sm:mb-6 drop-shadow-md" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)' }}>
                                            {slide.description}
                                        </p>
                                        <Button
                                            className={`${slide.ctaColor} hover:opacity-90 text-white px-5 py-2 sm:px-8 sm:py-3`}
                                            style={{ fontSize: 'clamp(0.75rem, 2vw, 1.125rem)' }}
                                        >
                                            {slide.cta}
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prev}
                    className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 dark:bg-[#1a1a2e]/90 hover:bg-white dark:hover:bg-[#16213e] shadow-lg transition-all hover:scale-110"
                    aria-label="الشريحة السابقة"
                >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800 dark:text-white" />
                </button>

                <button
                    onClick={next}
                    className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 dark:bg-[#1a1a2e]/90 hover:bg-white dark:hover:bg-[#16213e] shadow-lg transition-all hover:scale-110"
                    aria-label="الشريحة التالية"
                >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800 dark:text-white" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`h-3 rounded-full transition-all duration-300 ${
                                i === current 
                                    ? "w-8 bg-[#E91E63] dark:bg-[#C2185B]" 
                                    : "w-3 bg-white/50 dark:bg-gray-500/50 hover:bg-white/80 dark:hover:bg-gray-500/80"
                            }`}
                            aria-label={`الذهاب إلى الشريحة ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
});

HeroSlider.displayName = "HeroSlider";

export default HeroSlider;

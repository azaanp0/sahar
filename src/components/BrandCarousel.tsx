import { Link } from "react-router-dom";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

interface BrandItem {
    image: string;
    href: string;
    name?: string;
}

interface BrandCarouselProps {
    title?: string;
    showAllHref?: string;
    brands: BrandItem[];
}

const BrandCarousel = ({ title, showAllHref, brands }: BrandCarouselProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
        }
    };

    return (
        <section className="py-3 md:py-4 px-4">
            <div className="mx-auto max-w-screen-xl">
                {(title || showAllHref) && (
                    <div className="flex items-center justify-between mb-4">
                        {title && <h2 className="text-lg font-bold text-black dark:text-white">{title}</h2>}
                        {showAllHref && (
                            <Link to={showAllHref} className="text-sm text-[#E91E63] hover:underline">
                                عرض الكل
                            </Link>
                        )}
                    </div>
                )}
                <div className="relative">
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 hover:border-[#E91E63] transition-colors"
                    >
                        <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 hover:border-[#E91E63] transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar px-4">
                        {brands.map((brand, i) => (
                            <Link
                                key={i}
                                to={brand.href}
                                className="flex-shrink-0 block overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <img
                                    src={proxyImageUrl(brand.image)}
                                    alt={brand.name || "ماركة"}
                                    className="h-auto object-cover w-20 sm:w-28 md:w-32"
                                    loading="lazy"
                                    onError={handleImageError}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandCarousel;

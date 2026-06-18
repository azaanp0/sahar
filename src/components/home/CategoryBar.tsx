import { Link } from "react-router-dom";
import { useRef, useState, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
    { name: "المكياج", image: "/images/categories/makeup.jpg", href: "/category/makeup" },
    { name: "العناية", image: "/images/categories/skincare.jpg", href: "/category/skincare" },
    { name: "الجمال الكوري", image: "/images/categories/korean.jpg", href: "/category/korean" },
    { name: "صحة الفم", image: "/images/categories/oral.jpg", href: "/category/oral" },
    { name: "الأظافر", image: "/images/categories/nails.jpg", href: "/category/nails" },
    { name: "التان", image: "/images/categories/tan.jpg", href: "/category/tan" },
    { name: "واقي الشمس", image: "/images/categories/sunscreen.jpg", href: "/category/sunscreen" },
    { name: "الأجهزة", image: "/images/categories/devices.jpg", href: "/category/devices" },
    { name: "العطور", image: "/images/categories/perfume.jpg", href: "/category/perfume" },
    { name: "الصيدلية", image: "/images/categories/pharmacy.jpg", href: "/category/pharmacy" },
    { name: "تجهيز صالونات", image: "/images/categories/salon.jpg", href: "/category/salon" },
    { name: "السفر", image: "/images/categories/travel.jpg", href: "/category/travel" },
    { name: "منتجات المواسم", image: "/images/categories/seasonal.jpg", href: "/category/seasonal" },
];

const CategoryBar = memo(() => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const handleScroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });

            setTimeout(() => {
                if (scrollRef.current) {
                    const hasLeftScroll = scrollRef.current.scrollLeft > 0;
                    const hasRightScroll =
                        scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10;
                    setShowLeft(hasLeftScroll);
                    setShowRight(hasRightScroll);
                }
            }, 100);
        }
    };

    return (
        <section className="py-4 md:py-6 px-4 bg-background dark:bg-[#1a1a2e]">
            <div className="mx-auto max-w-screen-xl relative">
                {showRight && (
                    <button
                        onClick={() => handleScroll("right")}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#1a1a2e] shadow-md border border-gray-200 dark:border-gray-600 hover:border-[#E91E63] dark:hover:border-[#C2185B] transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-4 w-4 text-gray-800 dark:text-white" />
                    </button>
                )}
                {showLeft && (
                    <button
                        onClick={() => handleScroll("left")}
                        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#1a1a2e] shadow-md border border-gray-200 dark:border-gray-600 hover:border-[#E91E63] dark:hover:border-[#C2185B] transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-4 w-4 text-gray-800 dark:text-white" />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar px-4"
                >
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            to={cat.href}
                            className="flex-shrink-0 flex flex-col items-center gap-2 group min-w-[70px] sm:min-w-[80px]"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-[#E91E63]/10 dark:bg-[#C2185B]/20 group-hover:bg-[#E91E63]/20 dark:group-hover:bg-[#C2185B]/30 transition-colors">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        const parent = target.parentElement;
                                        if (parent) {
                                            target.style.display = 'none';
                                            parent.classList.add('flex', 'items-center', 'justify-center');
                                            parent.innerHTML = `<span class="text-2xl">📦</span>`;
                                        }
                                    }}
                                />
                            </div>
                            <span className="text-[11px] sm:text-xs font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#E91E63] dark:group-hover:text-[#C2185B] transition-colors whitespace-nowrap">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
});

CategoryBar.displayName = "CategoryBar";

export default CategoryBar;

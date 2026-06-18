import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { proxyImageUrl } from "@/lib/imageProxy";
import { handleImageError } from "@/lib/imageHandler";

const categories = [
    {
        name: "المكياج",
        image: "https://cdn.files.salla.network/homepage/1945128061/92a9fe54-4e63-424b-9d14-76eb65c0c882.webp",
        href: "/category/makeup",
    },
    {
        name: "العناية",
        image: "https://cdn.files.salla.network/homepage/1945128061/8f9923bb-afdd-431f-98dd-12b9a239b903.webp",
        href: "/category/skincare",
    },
    {
        name: "الجمال الكوري",
        image: "https://cdn.files.salla.network/homepage/1945128061/aa6af782-56bf-48c2-9013-6393dbd3d2ec.webp",
        href: "/category/korean",
    },
    {
        name: "صحة الفم",
        image: "https://cdn.files.salla.network/homepage/1945128061/8df2cb5a-c036-4a95-b77f-2ec36499fb13.webp",
        href: "/category/oral",
    },
    {
        name: "الأظافر",
        image: "https://cdn.files.salla.network/homepage/1945128061/442a9766-af67-41af-b2eb-509fcdd31edf.webp",
        href: "/category/nails",
    },
    {
        name: "التان",
        image: "https://cdn.files.salla.network/homepage/1945128061/606f4f69-32d4-44ef-b2be-f0278d8c6267.webp",
        href: "/category/tan",
    },
    {
        name: "واقي الشمس",
        image: "https://cdn.files.salla.network/homepage/1945128061/8cf2d671-26fd-4341-acf6-6c6bfa81e6e8.webp",
        href: "/category/sunscreen",
    },
    {
        name: "الأجهزة",
        image: "https://cdn.files.salla.network/homepage/1945128061/e5dc8015-e8e9-426a-aab9-59d1da7d0019.webp",
        href: "/category/devices",
    },
];

const CategorySection = () => {
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

            // Update button visibility
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
        <section className="py-6 px-4">
            <div className="mx-auto max-w-7xl relative">
                <button
                    onClick={() => handleScroll("right")}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 hover:border-pink-500 transition-colors"
                >
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                    onClick={() => handleScroll("left")}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 hover:border-pink-500 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar px-4"
                >
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            to={cat.href}
                            className="flex-shrink-0 flex flex-col items-center gap-2 group"
                        >
                            <div className="category-tile overflow-hidden rounded-md flex items-center justify-center">
                                <img
                                    src={proxyImageUrl(cat.image)}
                                    alt={cat.name}
                                    className="h-full w-full object-cover transition-transform duration-300"
                                    loading="lazy"
                                    onError={handleImageError}
                                />
                            </div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-200 group-hover:text-pink-600 transition-colors whitespace-nowrap">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;

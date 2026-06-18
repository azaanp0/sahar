import { Link } from "react-router-dom";
import { useRef, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface ProductSectionProps {
    title: string;
    showAllHref?: string;
    products: Product[];
    variant?: "scroll" | "grid";
}

const ProductSection = memo(({ title, showAllHref, products, variant = "scroll" }: ProductSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
        }
    };

    return (
        <section className="s-block py-6 md:py-8">
            <div className="container mx-auto px-4 max-w-screen-xl">
                <div className="home-block-title text-center mb-4 md:mb-6">
                    <h2 className="font-bold tracking-tight" style={{ color: 'var(--store-text-primary)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                        {title}
                    </h2>
                    <div className="title-underline my-2 mx-auto w-28 h-0 border-2" style={{ borderColor: 'var(--color-primary)' }}></div>
                </div>

                {variant === "scroll" ? (
                    <div className="relative">
                        <button 
                            onClick={() => scroll("right")} 
                            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 hover:border-pink-500 transition-colors" 
                            aria-label="التالي"
                        >
                            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button 
                            onClick={() => scroll("left")} 
                            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 hover:border-pink-500 transition-colors" 
                            aria-label="السابق"
                        >
                            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar px-4">
                            {products.map((product) => (
                                <div key={product.id} className="flex-shrink-0 w-[calc(50%-6px)] sm:w-44 md:w-52">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="product-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {showAllHref && (
                    <div className="flex justify-center mt-4 md:mt-6">
                        <Link 
                            to={showAllHref} 
                            className="view-all-link group inline-flex items-center gap-2 font-medium relative pb-1"
                            style={{ color: 'var(--color-primary)', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                        >
                            <span>عرض الكل</span>
                            <svg className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
});

ProductSection.displayName = "ProductSection";

export default ProductSection;

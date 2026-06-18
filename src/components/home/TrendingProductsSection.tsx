import { Link } from "react-router-dom";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface TrendingProductsSectionProps {
    products: Product[];
}

const TrendingProductsSection = ({ products }: TrendingProductsSectionProps) => {
    const trendingProducts = products.filter(p => p.badge === "trending" || p.tags?.includes("trending")).slice(0, 8);

    if (trendingProducts.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#E91E63]/10 dark:bg-[#C2185B]/20 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-[#E91E63] dark:text-[#C2185B]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-black dark:text-white">المنتجات الرائجة</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">الأكثر طلباً هذه الفترة</p>
                        </div>
                    </div>
                    <Link to="/products?sort=trending">
                        <Button variant="ghost" className="gap-2 text-black dark:text-white hover:text-[#E91E63] dark:hover:text-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease">
                            عرض الكل
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {trendingProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProductsSection;

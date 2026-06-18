import { Link } from "react-router-dom";
import { Award, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface BestSellersSectionProps {
    products: Product[];
}

const BestSellersSection = ({ products }: BestSellersSectionProps) => {
    const bestSellers = products.filter(p => p.badge === "bestseller" || p.rating && p.rating >= 4.5).slice(0, 8);

    if (bestSellers.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#E91E63]/10 dark:bg-[#C2185B]/20 rounded-lg">
                            <Award className="h-5 w-5 text-[#E91E63] dark:text-[#C2185B]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-black dark:text-white">الأكثر مبيعاً</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">المنتجات المفضلة لدى عملائنا</p>
                        </div>
                    </div>
                    <Link to="/products?sort=bestseller">
                        <Button variant="ghost" className="gap-2 text-black dark:text-white hover:text-[#E91E63] dark:hover:text-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease">
                            عرض الكل
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellersSection;

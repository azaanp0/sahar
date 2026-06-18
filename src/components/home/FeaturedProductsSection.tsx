import { Link } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsSectionProps {
    products: Product[];
}

const FeaturedProductsSection = ({ products }: FeaturedProductsSectionProps) => {
    const featuredProducts = products.filter(p => p.badge === "featured" || p.tags?.includes("featured")).slice(0, 8);

    if (featuredProducts.length === 0) return null;

    return (
        <section className="py-8 md:py-12 bg-[rgba(233,30,99,0.08)]">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-[rgba(255,193,7,0.1)] rounded-[14px] border border-[#FFC107]">
                            <Star className="h-5 w-5 text-[#FFC107]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-black">منتجات مختارة</h2>
                            <p className="text-sm text-black/60">اختيارات فريق سحر لك</p>
                        </div>
                    </div>
                    <Link to="/products?sort=featured">
                        <Button variant="ghost" className="gap-2 text-black hover:text-[#E91E63] hover:bg-[rgba(233,30,99,0.08)] transition-colors duration-300 ease">
                            عرض الكل
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProductsSection;

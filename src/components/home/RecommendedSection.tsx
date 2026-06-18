import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface RecommendedSectionProps {
    products: Product[];
}

const RecommendedSection = ({ products }: RecommendedSectionProps) => {
    const recommendedProducts = products.filter(p => p.tags?.includes("recommended")).slice(0, 8);

    if (recommendedProducts.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-pink-100 rounded-lg">
                            <Heart className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">موصى به لك</h2>
                            <p className="text-sm text-muted-foreground">منتجات مخصصة حسب ذوقك</p>
                        </div>
                    </div>
                    <Link to="/products?sort=recommended">
                        <Button variant="ghost" className="gap-2">
                            عرض الكل
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recommendedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedSection;

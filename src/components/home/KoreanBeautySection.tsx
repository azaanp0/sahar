import { Link } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface KoreanBeautySectionProps {
    products: Product[];
}

const KoreanBeautySection = ({ products }: KoreanBeautySectionProps) => {
    const koreanProducts = products
        .filter(p => p.tags?.includes("korean") || p.categorySlug === "korean")
        .slice(0, 8);

    if (koreanProducts.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">الجمال الكوري</h2>
                            <p className="text-sm text-muted-foreground">منتجات العناية الكورية الأصلية</p>
                        </div>
                    </div>
                    <Link to="/category/korean">
                        <Button variant="ghost" className="gap-2">
                            عرض الكل
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {koreanProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KoreanBeautySection;

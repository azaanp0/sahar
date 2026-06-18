import { Link } from "react-router-dom";
import { Palette, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface MakeupSectionProps {
    products: Product[];
}

const MakeupSection = ({ products }: MakeupSectionProps) => {
    const makeupProducts = products
        .filter(p => p.categorySlug === "makeup" || p.tags?.includes("makeup"))
        .slice(0, 8);

    if (makeupProducts.length === 0) return null;

    return (
        <section className="py-8 md:py-12 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-pink-100 rounded-lg">
                            <Palette className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">المكياج</h2>
                            <p className="text-sm text-muted-foreground">أحدث صيحات المكياج العالمية</p>
                        </div>
                    </div>
                    <Link to="/category/makeup">
                        <Button variant="ghost" className="gap-2">
                            عرض الكل
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {makeupProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MakeupSection;

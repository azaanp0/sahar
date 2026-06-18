import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface RelatedProductsProps {
    products: Product[];
    title?: string;
}

const RelatedProducts = ({ products, title = "منتجات ذات صلة" }: RelatedProductsProps) => {
    if (products.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <Button variant="ghost" className="gap-2">
                        عرض الكل
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;

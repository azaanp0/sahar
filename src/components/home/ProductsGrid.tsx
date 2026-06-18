import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";
import { useAppStore } from "@/store/appStore";

interface ProductsGridProps {
    products?: Product[];
    columns?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
}

const ProductsGrid = ({ products: externalProducts, columns = { mobile: 2, tablet: 3, desktop: 4 } }: ProductsGridProps) => {
    // Read products from central store if not provided externally
    const storeProducts = useAppStore(state => state.products);
    const products = externalProducts || storeProducts;
    
    if (products.length === 0) return null;

    return (
        <div
            className={`grid gap-4 ${
                columns.mobile === 2 ? 'grid-cols-2' : 'grid-cols-1'
            } md:grid-cols-${columns.tablet || 3} lg:grid-cols-${columns.desktop || 4}`}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductsGrid;

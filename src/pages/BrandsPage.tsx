import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { brands, getBrandBySlug, getProductsByBrand, products } from "@/data/catalog";
import { Link } from "react-router-dom";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
import { ChevronLeft } from "lucide-react";

const BrandsPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const brand = slug ? getBrandBySlug(slug) : undefined;
    const brandProducts = slug ? getProductsByBrand(slug) : [];

    if (slug && brand) {
        return (
            <PageLayout title={brand.name}>
                <div className="px-4 py-6">
                    <div className="mx-auto max-w-7xl">
                        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                            <ChevronLeft className="h-4 w-4" />
                            رجوع
                        </button>
                        <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الماركات", href: "/brands" }, { label: brand.name }]} />
                        <div className="flex items-center gap-4 mb-8 p-6 bg-card border border-border rounded-2xl">
                            <img src={proxyImageUrl(brand.image)} alt={brand.name} className="h-24 w-24 object-contain" onError={handleImageError} />
                            <div>
                                <h1 className="text-2xl font-bold">{brand.name}</h1>
                                <p className="text-muted-foreground text-sm">{brand.category}</p>
                            </div>
                        </div>
                        {brandProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {brandProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {products.slice(0, 10).map((p) => <ProductCard key={p.id} product={p} />)}
                            </div>
                        )}
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="جميع الماركات">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-2xl font-bold text-foreground mb-6">جميع الماركات</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {brands.map((b) => (
                            <Link key={b.slug} to={`/brand/${b.slug}`} className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all group">
                                <img src={proxyImageUrl(b.image)} alt={b.name} className="w-full h-20 object-contain" loading="lazy" onError={handleImageError} />
                                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors text-center">{b.name}</span>
                                <span className="text-xs text-muted-foreground">{b.category}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default BrandsPage;

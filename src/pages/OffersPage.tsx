import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ProductCard from "@/components/ProductCard";
import { getOfferProducts, getProductsByTag } from "@/data/catalog";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const CDN = "https://cdn.files.salla.network/homepage/1945128061";

const OFFER_TABS = [
    { key: "all", label: "جميع العروض" },
    { key: "online", label: "حصري للاونلاين" },
    { key: "1plus1", label: "1+1 مجاناً" },
    { key: "gifts", label: "هدايا مجانية" },
    { key: "half", label: "نص السعر" },
];

const OffersPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");

    const getProducts = (key: string) => {
        if (key === "all") return getOfferProducts();
        const tagMap: Record<string, string> = { online: "online", "1plus1": "1plus1", gifts: "gifts", half: "half" };
        return getProductsByTag(tagMap[key] ?? key);
    };

    const products = getProducts(activeTab);

    return (
        <PageLayout title="عروض سحر">
            {/* Hero Banner */}
            <div className="relative overflow-hidden" style={{ minHeight: '200px', background: 'linear-gradient(135deg, var(--color-primary-light, #F48FB1) 0%, var(--color-primary, #E91E63) 100%)' }}>
                <img
                    src={proxyImageUrl(`${CDN}/f2036e5d-42e1-402d-9b4e-94c46c9599d6.webp`)}
                    alt="عروض سحر"
                    className="w-full h-48 sm:h-64 object-cover"
                    onError={handleImageError}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg mb-2">عروض سحر 🛍️</h1>
                    <p className="text-white/90 text-sm sm:text-base">أفضل الخصومات والعروض الحصرية</p>
                </div>
            </div>

            <div className="px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] mb-4 transition-colors duration-300 ease">
                        <ChevronLeft className="h-4 w-4" />
                        رجوع
                    </button>
                    {/* Tabs */}
                    <div className="product-tabs-container mb-8">
                        <div className="btn-tabs-container flex flex-wrap justify-center gap-2">
                            {OFFER_TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`btn-tab-primary ${activeTab === tab.key ? "active" : ""}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-black dark:text-white">{products.length}</span> منتج
                        </span>
                    </div>

                    {/* Products Grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">لا توجد منتجات في هذا القسم حالياً</p>
                            <Link to="/products" className="px-6 py-2.5 rounded-xl text-white font-medium bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">
                                تصفح جميع المنتجات
                            </Link>
                        </div>
                    ) : (
                        <div className="product-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default OffersPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface Tab {
    key: string;
    label: string;
}

interface TabbedProductSectionProps {
    title: string;
    tabs: Tab[];
    getProducts: (tabKey: string) => Product[];
    showAllHref?: string;
    centered?: boolean;
}

const TabbedProductSection = ({ title, tabs, getProducts, showAllHref, centered = false }: TabbedProductSectionProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "");
    const products = getProducts(activeTab);

    return (
        <section className="s-block py-8">
            <div className="container mx-auto">
                {title && (
                    <div className="home-block-title text-center mb-6">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--store-text-primary)' }}>
                            {title}
                        </h2>
                        <div className="title-underline my-2 mx-auto w-28 h-0 border-2" style={{ borderColor: 'var(--color-primary)' }}></div>
                    </div>
                )}

                <div className="product-tabs-container mb-6">
                    <div className="btn-tabs-container flex flex-wrap justify-center gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`btn-tab-primary product-tab ${activeTab === tab.key ? "active" : ""}`}
                            >
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="product-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.length > 0 ? (
                        products.slice(0, 8).map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 opacity-70">
                            <p className="text-black dark:text-gray-300">لا توجد منتجات في هذا القسم حالياً</p>
                            {showAllHref && (
                                <Link to={showAllHref} className="text-[#E91E63] hover:underline text-sm mt-2 inline-block">
                                    تصفحي جميع المنتجات
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {showAllHref && products.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <Link 
                            to={showAllHref} 
                            className="view-all-link group inline-flex items-center gap-2 font-medium relative pb-1"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            <span>عرض الكل</span>
                            <svg className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TabbedProductSection;

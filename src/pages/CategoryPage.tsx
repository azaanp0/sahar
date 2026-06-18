import { useMemo, useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, getProductsByCategory, products, sortProducts } from "@/data/catalog";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
import { ChevronDown, Home, ChevronLeft, LayoutGrid } from "lucide-react";

const SORT_OPTIONS = ["الأكثر مبيعاً", "السعر: من الأقل", "السعر: من الأعلى", "الأحدث", "الأعلى تقييماً"];

const SUBCAT_LABELS: Record<string, string> = {
    "makeup-lips": "الشفاه", "makeup-eyes": "العيون", "makeup-face": "الوجه",
    "makeup-setting": "مثبت المكياج", "makeup-remover": "مزيل المكياج",
    "makeup-lenses": "العدسات", "makeup-brushes": "الفرش",
    "perfume-women": "للمرأة", "perfume-hair": "للشعر", "perfume-solid": "صلب",
    "perfume-kids": "للأطفال", "perfume-mini": "ميني", "perfume-home": "المنزل",
    "perfume-incense": "بخور",
};

const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const subParam = searchParams.get("sub");
    const cat = getCategoryBySlug(slug ?? "") ?? {
        slug: slug ?? "",
        name: "الفئة",
        description: "منتجات متنوعة",
        image: "https://cdn.files.salla.network/homepage/1945128061/8f9923bb-afdd-431f-98dd-12b9a239b903.webp",
    };

    const categoryProducts = useMemo(() => {
        const list = getProductsByCategory(slug ?? "");
        return list.length > 0 ? list : products.slice(0, 12);
    }, [slug]);

    const subcategories = useMemo(() => {
        const seen = new Set<string>();
        const list: string[] = [];
        categoryProducts.forEach((p) => {
            if (p.subcategory && !seen.has(p.subcategory)) {
                seen.add(p.subcategory);
                list.push(p.subcategory);
            }
        });
        return list;
    }, [categoryProducts]);

    const [activeSubcat, setActiveSubcat] = useState<string>(subParam || "all");
    const [sort, setSort] = useState(SORT_OPTIONS[0]);
    const [sortOpen, setSortOpen] = useState(false);

    useEffect(() => {
        if (subParam) setActiveSubcat(subParam);
    }, [subParam]);

    const filtered = useMemo(() => {
        let list = activeSubcat === "all" ? categoryProducts : categoryProducts.filter((p) => p.subcategory === activeSubcat);
        return sortProducts(list, sort);
    }, [categoryProducts, activeSubcat, sort]);

    return (
        <PageLayout title={cat.name} description={cat.description}>
            {/* Hero Banner */}
            <div className="relative overflow-hidden" style={{ height: "260px" }}>
                <img src={proxyImageUrl(cat.image)} alt={cat.name} className="w-full h-full object-cover" onError={handleImageError} style={{ objectPosition: "center 30%" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)" }} />
                <div className="absolute inset-0 flex flex-col items-end justify-center px-8 sm:px-12">
                    <nav className="flex items-center gap-1 text-white/80 text-xs mb-3">
                        <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <Home className="w-3.5 h-3.5" />
                            الرئيسية
                        </Link>
                        <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
                        <span className="text-white font-medium">{cat.name}</span>
                    </nav>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">{cat.name}</h1>
                    {cat.description && <p className="text-white/85 text-sm mt-2 max-w-sm">{cat.description}</p>}
                    <div className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.18)", color: "#fff", backdropFilter: "blur(4px)" }}>
                        <LayoutGrid className="w-3.5 h-3.5" />
                        {filtered.length} منتج
                    </div>
                </div>
            </div>

            {/* Sticky Toolbar */}
            <div className="sticky top-0 z-20 px-4 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-600">
                <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 flex-wrap">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors duration-300 ease">
                        <ChevronLeft className="h-4 w-4" />
                        رجوع
                    </button>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0">
                        <button onClick={() => setActiveSubcat("all")} className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" style={{ background: activeSubcat === "all" ? "var(--color-primary)" : "", color: activeSubcat === "all" ? "#fff" : "", borderColor: activeSubcat === "all" ? "var(--color-primary)" : "" }}>
                            الكل
                        </button>
                        {subcategories.map((sc) => (
                            <button key={sc} onClick={() => setActiveSubcat(sc)} className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" style={{ background: activeSubcat === sc ? "var(--color-primary)" : "", color: activeSubcat === sc ? "#fff" : "", borderColor: activeSubcat === sc ? "var(--color-primary)" : "" }}>
                                {SUBCAT_LABELS[sc] ?? sc}
                            </button>
                        ))}
                    </div>
                    <div className="relative flex-shrink-0">
                        <button onClick={() => setSortOpen((o) => !o)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ease" style={{ minWidth: "145px" }}>
                            <span className="flex-1 text-right">{sort}</span>
                            <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 transition-transform text-[#E91E63] dark:text-[#C2185B]" style={{ transform: sortOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                        </button>
                        {sortOpen && (
                            <div className="absolute left-0 top-full mt-1 rounded-xl overflow-hidden z-30 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg" style={{ minWidth: "165px" }}>
                                {SORT_OPTIONS.map((opt) => (
                                    <button key={opt} onClick={() => { setSort(opt); setSortOpen(false); }} className="w-full text-right px-4 py-2.5 text-sm transition-colors bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" style={{ fontWeight: sort === opt ? "600" : "400", color: sort === opt ? "var(--color-primary)" : "" }}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="px-4 py-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            عرض <span className="font-semibold text-black dark:text-white">{filtered.length}</span> منتج
                            {activeSubcat !== "all" && <> في <span className="text-[#E91E63] dark:text-[#C2185B] font-semibold">{SUBCAT_LABELS[activeSubcat] ?? activeSubcat}</span></>}
                        </span>
                    </div>
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                            <LayoutGrid className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="text-lg font-medium text-black dark:text-white">لا توجد منتجات في هذه الفئة حالياً</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
                        </div>
                    )}
                </div>
            </div>
            {sortOpen && <div className="fixed inset-0 z-20" onClick={() => setSortOpen(false)} />}
        </PageLayout>
    );
};

export default CategoryPage;

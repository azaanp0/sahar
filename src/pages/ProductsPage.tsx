import { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { products, categories, sortProducts } from "@/data/catalog";
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, X, Star, ChevronRight, ChevronLeft } from "lucide-react";

const SORT_OPTIONS = ["الأكثر مبيعاً", "السعر: من الأقل", "السعر: من الأعلى", "الأحدث", "الأعلى تقييماً"];
const PRICE_RANGES = [
    { label: "أقل من 50 ر.س", min: 0, max: 50 },
    { label: "50 – 100 ر.س", min: 50, max: 100 },
    { label: "100 – 200 ر.س", min: 100, max: 200 },
    { label: "200 ر.س وأكثر", min: 200, max: Infinity },
];
const RATING_OPTIONS = [5, 4, 3];
const PAGE_SIZE = 20;

function StarRow({ count }: { count: number }) {
    return (
        <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5" style={{ fill: s <= count ? "#f59e0b" : "#d1d5db", color: s <= count ? "#f59e0b" : "#d1d5db" }} />
            ))}
        </span>
    );
}

const ProductsPage = () => {
    const [sort, setSort] = useState(SORT_OPTIONS[0]);
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [activePriceRanges, setActivePriceRanges] = useState<number[]>([]);
    const [activeRatings, setActiveRatings] = useState<number[]>([]);
    const [activeBrands, setActiveBrands] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortOpen, setSortOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [page, setPage] = useState(1);

    const availableBrands = useMemo(() => {
        const seen = new Set<string>();
        const list: { slug: string; name: string }[] = [];
        products.forEach((p) => {
            if (p.brandSlug && p.brand && !seen.has(p.brandSlug)) {
                seen.add(p.brandSlug);
                list.push({ slug: p.brandSlug, name: p.brand });
            }
        });
        return list;
    }, []);

    const filtered = useMemo(() => {
        let list = [...products];
        if (activeCategories.length > 0) list = list.filter((p) => p.categorySlug && activeCategories.includes(p.categorySlug));
        if (activePriceRanges.length > 0) list = list.filter((p) => activePriceRanges.some((i) => { const r = PRICE_RANGES[i]; return p.price >= r.min && p.price < r.max; }));
        if (activeRatings.length > 0) list = list.filter((p) => p.rating && activeRatings.some((r) => p.rating! >= r));
        if (activeBrands.length > 0) list = list.filter((p) => p.brandSlug && activeBrands.includes(p.brandSlug));
        return sortProducts(list, sort);
    }, [sort, activeCategories, activePriceRanges, activeRatings, activeBrands]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const activeTags: { label: string; onRemove: () => void }[] = [
        ...activeCategories.map((slug) => ({ label: categories.find((c) => c.slug === slug)?.name ?? slug, onRemove: () => { setActiveCategories((p) => p.filter((c) => c !== slug)); setPage(1); } })),
        ...activePriceRanges.map((i) => ({ label: PRICE_RANGES[i].label, onRemove: () => { setActivePriceRanges((p) => p.filter((x) => x !== i)); setPage(1); } })),
        ...activeRatings.map((r) => ({ label: `${r} نجوم وأكثر`, onRemove: () => { setActiveRatings((p) => p.filter((x) => x !== r)); setPage(1); } })),
        ...activeBrands.map((slug) => ({ label: availableBrands.find((b) => b.slug === slug)?.name ?? slug, onRemove: () => { setActiveBrands((p) => p.filter((x) => x !== slug)); setPage(1); } })),
    ];

    const clearAll = () => { setActiveCategories([]); setActivePriceRanges([]); setActiveRatings([]); setActiveBrands([]); setPage(1); };

    const toggleArr = <T,>(arr: T[], val: T, set: React.Dispatch<React.SetStateAction<T[]>>) => {
        set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
        setPage(1);
    };

    const SidebarContent = () => (
        <div>
            <div className="mb-6">
                <p className="font-semibold mb-3" style={{ color: "var(--store-text-primary)" }}>الفئات</p>
                <div className="space-y-2">
                    {categories.slice(0, 10).map((cat) => (
                        <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" checked={activeCategories.includes(cat.slug)} onChange={() => toggleArr(activeCategories, cat.slug, setActiveCategories)} style={{ accentColor: "var(--color-primary)" }} className="w-4 h-4 rounded" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-700 mb-6" />
            <div className="mb-6">
                <p className="font-semibold mb-3" style={{ color: "var(--store-text-primary)" }}>السعر</p>
                <div className="space-y-2">
                    {PRICE_RANGES.map((r, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" checked={activePriceRanges.includes(i)} onChange={() => toggleArr(activePriceRanges, i, setActivePriceRanges)} style={{ accentColor: "var(--color-primary)" }} className="w-4 h-4 rounded" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{r.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-700 mb-6" />
            <div className="mb-6">
                <p className="font-semibold mb-3" style={{ color: "var(--store-text-primary)" }}>التقييم</p>
                <div className="space-y-2">
                    {RATING_OPTIONS.map((r) => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" checked={activeRatings.includes(r)} onChange={() => toggleArr(activeRatings, r, setActiveRatings)} style={{ accentColor: "var(--color-primary)" }} className="w-4 h-4 rounded" />
                            <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300"><StarRow count={r} /><span>وأكثر</span></span>
                        </label>
                    ))}
                </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-700 mb-6" />
            <div className="mb-2">
                <p className="font-semibold mb-3" style={{ color: "var(--store-text-primary)" }}>الماركات</p>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                    {availableBrands.map((b) => (
                        <label key={b.slug} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" checked={activeBrands.includes(b.slug)} onChange={() => toggleArr(activeBrands, b.slug, setActiveBrands)} style={{ accentColor: "var(--color-primary)" }} className="w-4 h-4 rounded" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{b.name}</span>
                        </label>
                    ))}
                </div>
            </div>
            {activeTags.length > 0 && (
                <button onClick={clearAll} className="mt-4 w-full py-2 rounded-lg text-sm font-medium transition-colors" style={{ border: "1px solid var(--color-primary)", color: "var(--color-primary)", background: "transparent" }}>
                    مسح الكل
                </button>
            )}
        </div>
    );

    return (
        <PageLayout title="جميع المنتجات">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-7xl">
                    <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "المنتجات" }]} />
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-black dark:text-white">جميع المنتجات</h1>
                        <div className="home-block-line mt-1" />
                    </div>

                    <div className="flex gap-6">
                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block w-60 flex-shrink-0">
                            <div className="rounded-2xl p-5 sticky top-24 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                                <p className="text-base font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                                    <SlidersHorizontal className="w-4 h-4 text-[#E91E63] dark:text-[#C2185B]" />
                                    تصفية النتائج
                                </p>
                                <SidebarContent />
                            </div>
                        </aside>

                        <div className="flex-1 min-w-0">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#E91E63] dark:bg-[#C2185B] text-white hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">
                                        <SlidersHorizontal className="w-4 h-4" />
                                        الفلاتر
                                    </button>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-semibold text-black dark:text-white">{filtered.length}</span> منتج
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                                        <button onClick={() => setViewMode("grid")} className="px-2.5 py-1.5 transition-colors bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" title="شبكي"><LayoutGrid className="w-4 h-4" /></button>
                                        <button onClick={() => setViewMode("list")} className="px-2.5 py-1.5 transition-colors bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" title="قائمة"><List className="w-4 h-4" /></button>
                                    </div>
                                    <div className="relative">
                                        <button onClick={() => setSortOpen((o) => !o)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ease" style={{ minWidth: "150px" }}>
                                            <span className="flex-1 text-right">{sort}</span>
                                            <ChevronDown className="w-3.5 h-3.5 text-[#E91E63] dark:text-[#C2185B]" style={{ transform: sortOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                                        </button>
                                        {sortOpen && (
                                            <div className="absolute left-0 top-full mt-1 rounded-xl overflow-hidden z-30 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg" style={{ minWidth: "170px" }}>
                                                {SORT_OPTIONS.map((opt) => (
                                                    <button key={opt} onClick={() => { setSort(opt); setSortOpen(false); setPage(1); }} className="w-full text-right px-4 py-2.5 text-sm transition-colors bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" style={{ fontWeight: sort === opt ? "600" : "400", color: sort === opt ? "var(--color-primary)" : "" }}>
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Active filters */}
                            {activeTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {activeTags.map((tag, i) => (
                                        <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#E91E63] dark:text-[#C2185B] border border-[#E91E63]/30 dark:border-[#C2185B]/30">
                                            {tag.label}
                                            <button onClick={tag.onRemove} className="hover:opacity-70" aria-label="حذف"><X className="w-3 h-3" /></button>
                                        </span>
                                    ))}
                                    <button onClick={clearAll} className="text-xs underline text-gray-500 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors duration-300 ease">مسح الكل</button>
                                </div>
                            )}

                            {/* Products */}
                            {paginated.length === 0 ? (
                                <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                                    <SlidersHorizontal className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="text-lg font-medium text-black dark:text-white">لا توجد منتجات تطابق الفلاتر</p>
                                    <button onClick={clearAll} className="mt-4 px-6 py-2 rounded-full text-sm font-medium text-white bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">مسح الفلاتر</button>
                                </div>
                            ) : viewMode === "grid" ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {paginated.map((product) => <ProductCard key={product.id} product={product} />)}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {paginated.map((product) => (
                                        <div key={product.id} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                                            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                {product.brand && <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{product.brand}</p>}
                                                <p className="font-semibold text-sm leading-snug mb-1 line-clamp-2 text-black dark:text-white">{product.name}</p>
                                                {product.rating && <div className="flex items-center gap-1 mb-2"><StarRow count={product.rating} />{product.reviews && <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>}</div>}
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-bold text-[#E91E63] dark:text-[#C2185B]">{product.price.toFixed(2)} ر.س</span>
                                                    {product.originalPrice && <span className="text-xs text-gray-500 dark:text-gray-400 line-through">{product.originalPrice.toFixed(2)} ر.س</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-1 mt-10">
                                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg transition-colors disabled:opacity-30 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="السابق"><ChevronRight className="w-4 h-4" /></button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                                        .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                                            if (idx > 0 && (n as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                                            acc.push(n);
                                            return acc;
                                        }, [])
                                        .map((item, i) =>
                                            item === "…" ? (
                                                <span key={`e-${i}`} className="px-2 text-gray-500 dark:text-gray-400">…</span>
                                            ) : (
                                                <button key={item} onClick={() => setPage(item as number)} className="w-9 h-9 rounded-lg text-sm font-medium transition-colors bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" style={{ background: page === item ? "var(--color-primary)" : "", color: page === item ? "#fff" : "", borderColor: page === item ? "var(--color-primary)" : "" }}>
                                                    {item}
                                                </button>
                                            )
                                        )}
                                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg transition-colors disabled:opacity-30 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="التالي"><ChevronLeft className="w-4 h-4" /></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Drawer */}
            {sidebarOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)} />
                    <div className="fixed inset-y-0 right-0 z-50 w-72 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 shadow-xl" style={{ boxShadow: "-4px 0 24px rgba(0,0,0,0.12)" }}>
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-base font-bold flex items-center gap-2 text-black dark:text-white">
                                <SlidersHorizontal className="w-4 h-4 text-[#E91E63] dark:text-[#C2185B]" />
                                تصفية النتائج
                            </p>
                            <button onClick={() => setSidebarOpen(false)} className="p-1"><X className="w-5 h-5 text-gray-500 dark:text-gray-400" /></button>
                        </div>
                        <SidebarContent />
                        <button onClick={() => setSidebarOpen(false)} className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">
                            عرض النتائج ({filtered.length})
                        </button>
                    </div>
                </>
            )}
            {sortOpen && <div className="fixed inset-0 z-20" onClick={() => setSortOpen(false)} />}
        </PageLayout>
    );
};

export default ProductsPage;

import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Loader2, TrendingUp, Clock, Sparkles } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { searchProducts, categories, products } from "@/data/catalog";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

const SearchOverlay = () => {
    const { searchOpen, closeSearch } = useUI();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => document.getElementById("search-input")?.focus(), 100);
        } else {
            document.body.style.overflow = "";
            setQuery("");
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [searchOpen]);

    const results = useMemo(() => {
        if (!query.trim()) return [];
        return searchProducts(query).slice(0, 6);
    }, [query]);

    const matchedCategories = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return categories.filter((c) => c.name.includes(q) || c.description.includes(q)).slice(0, 4);
    }, [query]);

    const trendingProducts = useMemo(() => {
        return products.filter(p => p.tags?.includes('trending')).slice(0, 4);
    }, []);

    const recentSearches = useMemo(() => {
        const saved = localStorage.getItem('sahar-recent-searches');
        return saved ? JSON.parse(saved).slice(0, 5) : [];
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 150);
        return () => clearTimeout(t);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Save to recent searches
            const saved = localStorage.getItem('sahar-recent-searches');
            const recent = saved ? JSON.parse(saved) : [];
            const updated = [query, ...recent.filter(s => s !== query)].slice(0, 10);
            localStorage.setItem('saher-recent-searches', JSON.stringify(updated));
            
            navigate(`/search?q=${encodeURIComponent(query)}`);
            closeSearch();
        }
    };

    const handleRecentSearch = (searchTerm: string) => {
        setQuery(searchTerm);
    };

    const clearRecentSearches = () => {
        localStorage.removeItem('sahar-recent-searches');
    };

    if (!searchOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={closeSearch}
                aria-hidden="true"
            />
            <div
                className="fixed inset-x-0 top-0 z-[95] bg-white dark:bg-gray-800 shadow-2xl animate-in slide-in-from-top duration-300 max-h-[90vh] overflow-y-auto"
                role="dialog"
                aria-label="البحث"
            >
                <div className="container mx-auto px-4 py-4 md:py-6">
                    {/* Search Input */}
                    <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-4 md:mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                            <input
                                id="search-input"
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="ابحثي عن منتجاتك المفضلة..."
                                className="w-full rounded-full border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 py-3 md:py-4 pr-12 pl-4 text-base outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                autoComplete="off"
                            />
                            {loading && (
                                <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-pink-500" />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={closeSearch}
                            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="إغلاق البحث"
                        >
                            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    </form>

                    {query.trim() && (
                        <div className="pb-4 md:pb-6 animate-in slide-in-from-top-2 duration-200">
                            {/* Categories */}
                            {matchedCategories.length > 0 && (
                                <div className="mb-4 md:mb-6">
                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-pink-500" />
                                        الأقسام المطابقة
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {matchedCategories.map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                to={`/category/${cat.slug}`}
                                                onClick={closeSearch}
                                                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 text-sm hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:border-pink-300 transition-all"
                                            >
                                                <img
                                                    src={proxyImageUrl(cat.image)}
                                                    alt={cat.name}
                                                    className="h-5 w-5 md:h-6 md:w-6 rounded-full object-cover ring-2 ring-pink-100"
                                                    onError={handleImageError}
                                                />
                                                <span className="font-medium text-gray-700 dark:text-gray-200 text-xs md:text-sm">{cat.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Products */}
                            {results.length > 0 ? (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">المنتجات</h3>
                                    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {results.map((product) => (
                                            <li key={product.id}>
                                                <Link
                                                    to={product.href}
                                                    onClick={closeSearch}
                                                    className="flex items-center gap-3 md:gap-4 py-3 md:py-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2 transition-colors group"
                                                >
                                                    <div className="relative shrink-0">
                                                        <img
                                                            src={proxyImageUrl(product.image)}
                                                            alt={product.name}
                                                            className="h-14 w-14 md:h-16 md:w-16 rounded-lg object-cover ring-2 ring-gray-100 dark:ring-gray-600 group-hover:ring-pink-200 transition-all"
                                                            onError={handleImageError}
                                                        />
                                                        {product.badge && (
                                                            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                                {product.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-pink-600 transition-colors">{product.name}</p>
                                                        {product.brand && (
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{product.brand}</p>
                                                        )}
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <p className="text-sm font-bold text-pink-600">
                                                                {product.price.toFixed(2)} ر.س
                                                            </p>
                                                            {product.originalPrice && product.originalPrice > product.price && (
                                                                <p className="text-xs text-gray-400 dark:text-gray-500 line-through">
                                                                    {product.originalPrice.toFixed(2)} ر.س
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => {
                                            navigate(`/search?q=${encodeURIComponent(query)}`);
                                            closeSearch();
                                        }}
                                        className="w-full mt-4 py-3 text-sm font-semibold rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        عرض جميع النتائج
                                        <Search className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : !loading ? (
                                <div className="text-center py-8 md:py-12">
                                    <Search className="h-10 w-10 md:h-12 md:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">لا توجد نتائج لـ "{query}"</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">جربي كلمات مختلفة أو تصفحي الأقسام</p>
                                </div>
                            ) : null}
                        </div>
                    )}

                    {!query.trim() && (
                        <div className="space-y-4 md:space-y-6 animate-in slide-in-from-top-2 duration-200">
                            {/* Recent Searches */}
                            {recentSearches.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                            عمليات البحث الأخيرة
                                        </h3>
                                        <button
                                            onClick={clearRecentSearches}
                                            className="text-xs text-gray-400 dark:text-gray-500 hover:text-pink-600 transition-colors"
                                        >
                                            مسح الكل
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearches.map((searchTerm, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleRecentSearch(searchTerm)}
                                                className="px-3 py-2 md:px-4 md:py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 transition-colors"
                                            >
                                                {searchTerm}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Trending Products */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-pink-500" />
                                    المنتجات الرائجة
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                                    {trendingProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            to={product.href}
                                            onClick={closeSearch}
                                            className="group"
                                        >
                                            <div className="relative rounded-lg overflow-hidden ring-2 ring-gray-100 dark:ring-gray-600 group-hover:ring-pink-200 transition-all">
                                                <img
                                                    src={proxyImageUrl(product.image)}
                                                    alt={product.name}
                                                    className="h-20 w-full object-cover"
                                                    onError={handleImageError}
                                                />
                                                {product.badge && (
                                                    <span className="absolute top-2 right-2 bg-pink-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                        {product.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mt-2 truncate group-hover:text-pink-600 transition-colors">
                                                {product.name}
                                            </p>
                                            <p className="text-xs font-bold text-pink-600">
                                                {product.price.toFixed(2)} ر.س
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Browse Categories */}
                            <div className="hidden md:block">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-pink-500" />
                                    تصفحي الأقسام
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    {categories.slice(0, 12).map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            to={`/category/${cat.slug}`}
                                            onClick={closeSearch}
                                            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all group"
                                        >
                                            <img
                                                src={proxyImageUrl(cat.image)}
                                                alt={cat.name}
                                                className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-600 group-hover:ring-pink-200 transition-all"
                                                onError={handleImageError}
                                            />
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-200 text-center group-hover:text-pink-600 transition-colors">
                                                {cat.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchOverlay;

import { useSearchParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/data/catalog";
import { Search, ChevronLeft } from "lucide-react";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q") || "";
    const results = searchProducts(query);

    return (
        <PageLayout title={query ? `نتائج البحث: ${query}` : "البحث"}>
            <div className="px-4 py-6">
                <div className="mx-auto max-w-7xl">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] mb-4 transition-colors duration-300 ease">
                        <ChevronLeft className="h-4 w-4" />
                        رجوع
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                        <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <h1 className="text-xl font-bold text-black dark:text-white">
                            {query ? <>نتائج البحث عن: <span className="text-[#E91E63] dark:text-[#C2185B]">"{query}"</span></> : "البحث"}
                        </h1>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{results.length > 0 ? `${results.length} نتيجة` : "لا توجد نتائج"}</p>

                    {results.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {results.map((product) => <ProductCard key={product.id} product={product} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                            <Search className="h-12 w-12 text-gray-600 dark:text-gray-400" />
                            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">لم نجد ما تبحثين عنه</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">جربي كلمات بحث أخرى أو تصفحي الفئات</p>
                            <Link to="/products" className="text-[#E91E63] dark:text-[#C2185B] hover:underline text-sm">تصفح جميع المنتجات</Link>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default SearchPage;

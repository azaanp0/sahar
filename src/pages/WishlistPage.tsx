import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { Heart, ShoppingBag, ChevronLeft } from "lucide-react";

const WishlistPage = () => {
    const navigate = useNavigate();
    const { wishlistProducts } = useStore();

    return (
        <PageLayout title="المفضلة">
            <div className="px-4 py-4 md:py-6">
                <div className="mx-auto max-w-7xl">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#E91E63] dark:hover:text-[#C2185B] mb-4 transition-colors duration-300 ease">
                        <ChevronLeft className="h-4 w-4" />
                        رجوع
                    </button>
                    <div className="home-block-title">
                        <h2 className="flex items-center justify-center gap-2">
                            <Heart className="h-5 w-5 md:h-6 md:w-6 fill-current" style={{ color: 'var(--color-primary)' }} />
                            <span className="text-lg md:text-xl">قائمة المفضلة</span>
                        </h2>
                        <div className="home-block-line" />
                    </div>

                    {wishlistProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 md:py-20 gap-4 text-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary-light, #ecd0f6)' }}>
                                <Heart className="h-8 w-8 md:h-10 md:w-10" style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <h2 className="text-base md:text-lg font-semibold text-black dark:text-white">قائمة المفضلة فارغة</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">أضيفي المنتجات التي تعجبك لقائمة المفضلة</p>
                            <div className="flex gap-3 mt-2">
                                <Link to="/products" className="px-5 py-2.5 md:px-6 md:py-2.5 rounded-xl font-medium text-white transition-opacity hover:opacity-90 bg-[#E91E63] dark:bg-[#C2185B]">
                                    تسوقي الآن
                                </Link>
                                <Link to="/offers" className="px-5 py-2.5 md:px-6 md:py-2.5 rounded-xl font-medium border-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 border-[#E91E63] dark:border-[#C2185B] text-[#E91E63] dark:text-[#C2185B]">
                                    العروض
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold text-black dark:text-white">{wishlistProducts.length}</span> منتج في المفضلة
                                </span>
                                <Link to="/products" className="flex items-center gap-1.5 text-sm transition-colors hover:underline text-[#E91E63] dark:text-[#C2185B]">
                                    <ShoppingBag className="h-4 w-4" />
                                    متابعة التسوق
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                                {wishlistProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default WishlistPage;

import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, products as staticProducts } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";
import { useAppStore } from "@/store/appStore";
import {
    ShoppingCart,
    Heart,
    Star,
    Share2,
    ChevronRight,
    ChevronLeft,
    Truck,
    RotateCcw,
    Shield,
    CheckCircle2,
    Copy,
    MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

type TabKey = "description" | "info" | "reviews";

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [activeTab, setActiveTab] = useState<TabKey>("description");
    
    // Read products from central store for live sync
    const storeProducts = useAppStore(state => state.products);
    
    // Try to find product in store first, fallback to static catalog
    const product = useMemo(() => {
        // Convert store products to catalog format if needed
        const storeProduct = storeProducts.find(p => p.id === id || p.slug === id);
        if (storeProduct) {
            return {
                id: storeProduct.id,
                name: storeProduct.nameAr,
                slug: storeProduct.slug,
                price: storeProduct.price,
                originalPrice: storeProduct.salePrice,
                images: storeProduct.images.map(img => img.url),
                image: storeProduct.images[0]?.url || '',
                categorySlug: storeProduct.category.toLowerCase().replace(/\s+/g, '-'),
                description: storeProduct.description,
                rating: storeProduct.rating,
                reviewsCount: storeProduct.reviewsCount,
                stock: storeProduct.stock,
                brand: storeProduct.brand,
                inStock: storeProduct.stock > 0,
                features: [],
                reviews: [],
            };
        }
        // Fallback to static catalog
        return staticProducts.find(p => p.id === id);
    }, [id, storeProducts]);
    
    const wished = product ? isInWishlist(product.id) : false;

    if (!product) {
        return (
            <PageLayout title="منتج غير موجود">
                <div className="flex flex-col items-center justify-center py-20 gap-4 px-4">
                    <p className="text-lg font-medium text-muted-foreground">المنتج غير موجود</p>
                    <Link to="/products" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg">
                        تصفح المنتجات
                    </Link>
                </div>
            </PageLayout>
        );
    }

    const images = product.images ?? [product.image];
    const category = getCategoryBySlug(product.categorySlug || "");
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;
    
    // Use store products for related products if available
    const allProducts = storeProducts.length > 0 
        ? storeProducts.map(p => ({
            id: p.id,
            name: p.nameAr,
            slug: p.slug,
            price: p.price,
            originalPrice: p.salePrice,
            images: p.images.map(img => img.url),
            image: p.images[0]?.url || '',
            categorySlug: p.category.toLowerCase().replace(/\s+/g, '-'),
            rating: p.rating,
            reviewsCount: p.reviewsCount,
            inStock: p.stock > 0,
            features: [],
            reviews: [],
            href: `/product/${p.slug}`,
          }))
        : staticProducts;
    
    const related = allProducts
        .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product.id, quantity);
        toast.success("تمت الإضافة للسلة");
    };

    const handleShare = async (platform?: string) => {
        const url = window.location.href;
        const text = product.name;
        if (platform === "whatsapp") {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
        } else if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
        } else if (platform === "copy") {
            navigator.clipboard.writeText(url);
            toast.success("تم نسخ الرابط");
        } else {
            try {
                await navigator.share?.({ title: text, url });
            } catch {
                navigator.clipboard.writeText(url);
                toast.success("تم نسخ الرابط");
            }
        }
    };

    const tabs: { key: TabKey; label: string }[] = [
        { key: "description", label: "الوصف" },
        { key: "info", label: "المعلومات" },
        { key: "reviews", label: "التقييمات" },
    ];

    return (
        <PageLayout title={product.name}>
            <div className="px-4 py-6">
                <div className="mx-auto max-w-5xl">
                    <Breadcrumb
                        items={[
                            { label: "الرئيسية", href: "/" },
                            {
                                label: category?.name || "المنتجات",
                                href: category ? `/category/${category.slug}` : "/products",
                            },
                            { label: product.name },
                        ]}
                    />

                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                        <ChevronLeft className="h-4 w-4" />
                        رجوع
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                        {/* IMAGE GALLERY */}
                        <div>
                            <div
                                className="relative rounded-2xl overflow-hidden mb-3 cursor-zoom-in"
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                                style={{ border: "1.5px solid var(--product-border-color, #eee)", background: "#fafafa" }}
                            >
                                <img
                                    src={proxyImageUrl(images[activeImage])}
                                    alt={product.name}
                                    className="w-full h-80 object-contain p-4 transition-transform duration-500"
                                    style={{ transform: isZoomed ? "scale(1.18)" : "scale(1)" }}
                                    onError={handleImageError}
                                />
                                {discount > 0 && (
                                    <span className="absolute top-3 right-3 text-white text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#ef4444" }}>
                                        -{discount}%
                                    </span>
                                )}
                                {images.length > 1 && (
                                    <>
                                        <button onClick={() => setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-all" aria-label="السابق">
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-all" aria-label="التالي">
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                    {images.map((img, i) => (
                                        <button key={i} onClick={() => setActiveImage(i)} className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200" style={{ border: i === activeImage ? "2px solid var(--color-primary)" : "2px solid transparent", width: "4.5rem", height: "4.5rem", background: "#f3f4f6", opacity: i === activeImage ? 1 : 0.65 }}>
                                            <img src={proxyImageUrl(img)} alt={`${product.name} - صورة ${i + 1}`} className="w-full h-full object-contain p-1" onError={handleImageError} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-2 mt-4">
                                <span className="text-sm text-muted-foreground ml-1">مشاركة:</span>
                                <button onClick={() => handleShare("whatsapp")} className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 transition-colors" aria-label="واتساب">
                                    <MessageCircle className="h-4 w-4 text-green-600" />
                                </button>
                                <button onClick={() => handleShare("twitter")} className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors" aria-label="تويتر">
                                    <Share2 className="h-4 w-4 text-primary-600" />
                                </button>
                                <button onClick={() => handleShare("copy")} className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="نسخ الرابط">
                                    <Copy className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>{product.brand}</span>
                            <h1 className="text-xl font-bold leading-snug" style={{ color: "var(--store-text-primary)" }}>{product.name}</h1>

                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-4 w-4 ${star <= (product.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">({product.reviews ?? 0} تقييم)</span>
                            </div>

                            <div className="flex items-end gap-3 flex-wrap">
                                <span className="font-extrabold" style={{ fontSize: "1.75rem", color: "var(--store-text-primary)" }}>
                                    {product.price.toFixed(2)} ر.س
                                </span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-base text-muted-foreground line-through mb-0.5">{product.originalPrice.toFixed(2)} ر.س</span>
                                        <span className="text-white text-sm font-bold px-2.5 py-1 rounded-full mb-0.5" style={{ background: "#ef4444" }}>-{discount}% خصم</span>
                                    </>
                                )}
                            </div>

                            {product.inStock !== false ? (
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-semibold text-green-600">متوفر ✓</span>
                                </div>
                            ) : (
                                <span className="text-sm font-medium text-red-500">غير متوفر</span>
                            )}

                            {product.features && (
                                <div className="flex flex-wrap gap-1.5">
                                    {product.features.map((f) => (
                                        <span key={f} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--color-primary-light, #ecd0f6)", color: "var(--color-primary-reverse, #472b51)" }}>{f}</span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium" style={{ color: "var(--store-text-primary)" }}>الكمية:</span>
                                <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1.5px solid var(--color-primary)", background: "#fff" }}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex items-center justify-center w-10 h-10 text-lg font-bold transition-colors hover:bg-muted" style={{ color: "var(--color-primary)" }} aria-label="تقليل">−</button>
                                    <span className="w-10 text-center text-sm font-bold select-none" style={{ color: "var(--store-text-primary)" }}>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="flex items-center justify-center w-10 h-10 text-lg font-bold transition-colors hover:bg-muted" style={{ color: "var(--color-primary)" }} aria-label="زيادة">+</button>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={handleAddToCart} className="product-card-enhanced-btn flex-1 py-3 text-base font-semibold rounded-xl flex items-center justify-center gap-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    أضيفي للسلة
                                </button>
                                <button
                                    onClick={() => {
                                        const added = toggleWishlist(product.id);
                                        toast.success(added ? "تمت الإضافة للمفضلة" : "تمت الإزالة من المفضلة");
                                    }}
                                    className="flex items-center justify-center h-12 w-12 rounded-xl border-2 transition-colors"
                                    style={{ borderColor: wished ? "var(--color-primary)" : "#e5e7eb", background: wished ? "var(--color-primary-light, #ecd0f6)" : "#fff" }}
                                    aria-label="مفضلة"
                                >
                                    <Heart className="h-5 w-5" style={{ fill: wished ? "var(--color-primary)" : "none", color: wished ? "var(--color-primary)" : "#9ca3af" }} />
                                </button>
                            </div>

                            <button
                                onClick={() => { addToCart(product.id, quantity); navigate("/checkout"); }}
                                className="w-full py-3 rounded-xl font-semibold border-2 transition-colors hover:bg-muted/30"
                                style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)", background: "transparent" }}
                            >
                                اشتري الآن
                            </button>

                            <div className="rounded-2xl p-4 grid grid-cols-3 gap-2" style={{ border: "1.5px solid var(--product-border-color, #eee)", background: "#fafafa" }}>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <RotateCcw className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
                                    <span className="text-xs font-semibold" style={{ color: "var(--store-text-primary)" }}>إرجاع مجاني</span>
                                    <span className="text-xs text-muted-foreground">خلال 15 يوم</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <Truck className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
                                    <span className="text-xs font-semibold" style={{ color: "var(--store-text-primary)" }}>توصيل مجاني</span>
                                    <span className="text-xs text-muted-foreground">فوق 199 ر.س</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <Shield className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
                                    <span className="text-xs font-semibold" style={{ color: "var(--store-text-primary)" }}>منتج أصلي</span>
                                    <span className="text-xs text-muted-foreground">100% مضمون</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="mt-10">
                        <div className="btn-tabs-container justify-start gap-1 border-b border-border pb-0">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className="btn-tab-primary"
                                    style={activeTab === tab.key ? { background: "var(--color-primary)", color: "#fff", borderColor: "var(--color-primary)" } : {}}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="rounded-2xl p-4 mt-4" style={{ border: "1.5px solid var(--product-border-color, #eee)", minHeight: "8rem" }}>
                            {activeTab === "description" && (
                                <div>
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--store-text-secondary, #4b5563)" }}>
                                        {product.description || "لا يوجد وصف متاح لهذا المنتج."}
                                    </p>
                                    {product.features && product.features.length > 0 && (
                                        <ul className="mt-4 space-y-2">
                                            {product.features.map((f) => (
                                                <li key={f} className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                                                    <span style={{ color: "var(--store-text-primary)" }}>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                            {activeTab === "info" && (
                                <table className="w-full text-sm">
                                    <tbody>
                                        {[
                                            { label: "الماركة", value: product.brand },
                                            { label: "التصنيف", value: category?.name || product.categorySlug },
                                            { label: "التقييم", value: `${product.rating ?? "—"} / 5` },
                                            { label: "عدد المراجعات", value: `${product.reviews ?? 0} تقييم` },
                                            { label: "الحالة", value: product.inStock !== false ? "متوفر" : "غير متوفر" },
                                        ].map(({ label, value }) => (
                                            <tr key={label} className="border-b border-border last:border-0">
                                                <td className="py-2 pl-4 font-medium w-36" style={{ color: "var(--store-text-primary)" }}>{label}</td>
                                                <td className="py-2 text-muted-foreground">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {activeTab === "reviews" && (
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-center">
                                            <div className="text-4xl font-extrabold" style={{ color: "var(--color-primary)" }}>{product.rating?.toFixed(1) ?? "—"}</div>
                                            <div className="flex justify-center mt-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className={`h-4 w-4 ${star <= (product.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
                                                ))}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">{product.reviews ?? 0} تقييم</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">لا توجد تقييمات مكتوبة بعد.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RELATED PRODUCTS */}
                    {related.length > 0 && (
                        <div className="mt-12">
                            <div className="home-block-title">
                                <h2>منتجات مشابهة</h2>
                                <div className="home-block-line" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {related.map((p) => <ProductCard key={p.id} product={p} />)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default ProductDetailPage;

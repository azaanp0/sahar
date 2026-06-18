import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ShoppingCart, ChevronLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "sonner";

const ComparePage = () => {
    const navigate = useNavigate();
    const { addToCart } = useStore();
    const [compareProducts, setCompareProducts] = useState([
        {
            id: "p1",
            name: "غسول مرطب بالهيالورونيك",
            brand: "سحر",
            price: 89,
            originalPrice: 120,
            image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
            rating: 4.5,
            reviews: 128,
            description: "غسول لطيف ينظف البشرة بعمق مع الحفاظ على ترطيبها الطبيعي",
            ingredients: "حمض الهيالورونيك، الجلسرين، الصبار",
            size: "150 مل",
            skinType: "جميع أنواع البشرة",
            features: ["ترطيب عميق", "تنظيف لطيف", "مناسب للاستخدام اليومي"]
        },
        {
            id: "p2",
            name: "غسول بالشاي الأخضر",
            brand: "سحر",
            price: 95,
            originalPrice: 130,
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
            rating: 4.7,
            reviews: 95,
            description: "غسول مضاد للأكسدة يغذي البشرة ويحميها من التلف",
            ingredients: "مستخلص الشاي الأخضر، فيتامين E، زيت الجوجوبا",
            size: "150 مل",
            skinType: "البشرة الدهنية والمختلطة",
            features: ["مضاد للأكسدة", "تنقية البشرة", "توازن الزيوت"]
        },
        {
            id: "p3",
            name: "غسول بالألوفيرا",
            brand: "سحر",
            price: 79,
            originalPrice: 110,
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
            rating: 4.3,
            reviews: 76,
            description: "غسول مهدئ يرطب البشرة ويهدئ الاحمرار والتهيج",
            ingredients: "الألوفيرا، الكاموميل، البانثينول",
            size: "150 مل",
            skinType: "البشرة الحساسة",
            features: ["مهدئ", "مرطب", "للبشرة الحساسة"]
        }
    ]);

    const handleRemove = (id: string) => {
        setCompareProducts(prev => prev.filter(p => p.id !== id));
        toast.success("تمت إزالة المنتج من المقارنة");
    };

    const handleAddToCart = (productId: string) => {
        addToCart(productId);
        toast.success("تمت الإضافة للسلة");
    };

    if (compareProducts.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">لا توجد منتجات للمقارنة</h1>
                    <Link to="/products" className="text-[#E91E63]">تصفح المنتجات</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageMeta 
                title="مقارنة المنتجات | سحر"
                description="قارني بين المنتجات واختاري الأنسب لبشرتك"
            />
            
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-8">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                        <ChevronLeft className="h-4 w-4" />
                        رجوع
                    </button>
                    <Breadcrumb 
                        items={[
                            { label: "الرئيسية", href: "/" },
                            { label: "مقارنة المنتجات" }
                        ]}
                    />

                    <h1 className="text-3xl font-bold mb-8 text-center">مقارنة المنتجات</h1>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-right font-bold text-gray-900 border-b">الميزة</th>
                                    {compareProducts.map(product => (
                                        <th key={product.id} className="p-4 text-center border-b min-w-[250px]">
                                            <div className="relative">
                                                <button
                                                    onClick={() => handleRemove(product.id)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-32 h-32 object-cover mx-auto rounded-lg mb-2"
                                                />
                                                <Link 
                                                    to={`/product/${product.id}`}
                                                    className="font-bold text-gray-900 hover:text-[#E91E63] transition-colors"
                                                >
                                                    {product.name}
                                                </Link>
                                                <p className="text-sm text-gray-600">{product.brand}</p>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">السعر</td>
                                    {compareProducts.map(product => (
                                        <td key={product.id} className="p-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-2xl font-bold text-[#E91E63]">{product.price} ر.س</span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-gray-400 line-through">{product.originalPrice} ر.س</span>
                                                )}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">التقييم</td>
                                    {compareProducts.map(product => (
                                        <td key={product.id} className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="font-bold">{product.rating}</span>
                                                <span className="text-gray-500">({product.reviews})</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">الحجم</td>
                                    {compareProducts.map(product => (
                                        <td key={product.id} className="p-4 text-center">{product.size}</td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">نوع البشرة</td>
                                    {compareProducts.map(product => (
                                        <td key={product.id} className="p-4 text-center">{product.skinType}</td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">المكونات</td>
                                    {compareProducts.map(product => (
                                        <td key={product.id} className="p-4 text-center text-sm">{product.ingredients}</td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">المميزات</td>
                                    {compareProducts.map(product => (
                                        <td key={product.id} className="p-4 text-center">
                                            <ul className="space-y-2">
                                                {product.features.map((feature, idx) => (
                                                    <li key={idx} className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block">
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">الوصف</td>
                                    {compareProducts.map(product => (
                                        <td key={product.id} className="p-4 text-center text-sm">{product.description}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4"></td>
                                    {compareProducts.map(product => (
                                        <td key={product.id} className="p-4 text-center">
                                            <button
                                                onClick={() => handleAddToCart(product.id)}
                                                className="w-full bg-[#E91E63] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#B089C0] transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                أضيفي للسلة
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComparePage;

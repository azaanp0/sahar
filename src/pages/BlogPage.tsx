import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";

const blogPosts = [
    {
        id: "1",
        title: "روتين العناية بالبشرة للبشرة الجافة",
        slug: "skincare-routine-dry-skin",
        excerpt: "اكتشفي أفضل المنتجات والخطوات للعناية ببشرتك الجافة والحفاظ على ترطيبها طوال اليوم",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
        author: "د. سارة الأحمد",
        date: "2024-01-15",
        category: "العناية بالبشرة",
        readTime: "5 دقائق"
    },
    {
        id: "2",
        title: "أسرار الجمال الكوري الذي يغزو العالم",
        slug: "k-beauty-secrets",
        excerpt: "تعرفي على أسرار الجمال الكوري وكيفية تطبيق روتين K-Beauty للحصول على بشرة مشرقة",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
        author: "منى العلي",
        date: "2024-01-10",
        category: "الجمال الكوري",
        readTime: "7 دقائق"
    },
    {
        id: "3",
        title: "دليلك الشامل لاختيار واقي الشمس المثالي",
        slug: "sunscreen-guide",
        excerpt: "كيف تختارين واقي الشمس المناسب لنوع بشرتك؟ دليل شامل لكل أنواع البشرة",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
        author: "د. نورة السالم",
        date: "2024-01-05",
        category: "الحماية من الشمس",
        readTime: "6 دقائق"
    },
    {
        id: "4",
        title: "أفضل مكونات المكياج للبشرة الحساسة",
        slug: "makeup-sensitive-skin",
        excerpt: "اكتشفي المنتجات والمكونات الآمنة للبشرة الحساسة وكيفية تجنب الحساسية",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",
        author: "ريم الفهد",
        date: "2024-01-01",
        category: "المكياج",
        readTime: "4 دقائق"
    },
    {
        id: "5",
        title: "فوائد فيتامين سي للبشرة وكيفية استخدامه",
        slug: "vitamin-c-benefits",
        excerpt: "كل ما تحتاجين معرفته عن فيتامين سي وفوائده المذهلة للبشرة",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
        author: "د. سارة الأحمد",
        date: "2023-12-28",
        category: "العناية بالبشرة",
        readTime: "5 دقائق"
    },
    {
        id: "6",
        title: "روتين العناية الليلي لبشرة مثالية",
        slug: "nighttime-skincare",
        excerpt: "خطوات الروتين الليلي للعناية بالبشرة للحصول على نضارة وإشراقة صباحية",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
        author: "منى العلي",
        date: "2023-12-20",
        category: "العناية بالبشرة",
        readTime: "6 دقائق"
    }
];

const BlogPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("الكل");

    const categories = ["الكل", "العناية بالبشرة", "الجمال الكوري", "الحماية من الشمس", "المكياج"];

    const filteredPosts = selectedCategory === "الكل" 
        ? blogPosts 
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <>
            <PageMeta 
                title="المدونة | سحر"
                description="اكتشفي أحدث نصائح العناية بالبشرة والجمال في مدونة سحر"
            />
            
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">المدونة</h1>
                        <p className="text-lg text-gray-600">اكتشفي أحدث نصائح العناية بالبشرة والجمال</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <Breadcrumb 
                        items={[
                            { label: "الرئيسية", href: "/" },
                            { label: "المدونة" }
                        ]}
                    />

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${
                                    selectedCategory === category
                                        ? "bg-[#E91E63] text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 bg-[#E91E63] text-white px-3 py-1 rounded-full text-sm">
                                        {post.category}
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#E91E63] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 text-sm text-[#E91E63] font-medium">
                                        قراءة المقال ←
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;

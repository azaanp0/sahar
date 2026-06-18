import { useParams, Link } from "react-router-dom";
import { Calendar, User, Share2, Heart, ArrowLeft } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";

const blogPosts: Record<string, any> = {
    "skincare-routine-dry-skin": {
        id: "1",
        title: "روتين العناية بالبشرة للبشرة الجافة",
        slug: "skincare-routine-dry-skin",
        excerpt: "اكتشفي أفضل المنتجات والخطوات للعناية ببشرتك الجافة والحفاظ على ترطيبها طوال اليوم",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200",
        author: "د. سارة الأحمد",
        date: "2024-01-15",
        category: "العناية بالبشرة",
        readTime: "5 دقائق",
        content: `
            <p class="mb-4">البشرة الجافة تحتاج إلى عناية خاصة واهتمام مستمر للحفاظ على ترطيبها وصحتها. في هذا المقال، سنستعرض أفضل الروتين والمنتجات للعناية بالبشرة الجافة.</p>
            
            <h2 class="text-2xl font-bold mb-4 mt-8">1. التنظيف اللطيف</h2>
            <p class="mb-4">ابدئي روتينك الصباحي والمسائي بغسول لطيف لا يزيل الزيوت الطبيعية من بشرتك. اختاري غسول يحتوي على حمض الهيالورونيك والجلسرين.</p>
            
            <h2 class="text-2xl font-bold mb-4 mt-8">2. التونر المرطب</h2>
            <p class="mb-4">استخدمي تونر يحتوي على مكونات مرطبة مثل حمض الهيالورونيك أو الصبار. هذا يساعد على استعادة توازن البشرة وتحضيرها للمرطبات.</p>
            
            <h2 class="text-2xl font-bold mb-4 mt-8">3. السيروم المركّز</h2>
            <p class="mb-4">سيروم فيتامين سي أو حمض الهيالورونيك يعزز الترطيب ويحسن مرونة البشرة. ضعي بضع قطرات على بشرة نظيفة وربتها بلطف.</p>
            
            <h2 class="text-2xl font-bold mb-4 mt-8">4. المرطب الغني</h2>
            <p class="mb-4">اختاري مرطباً يحتوي على زيوت طبيعية مثل زيت الجوجوبا أو زيت اللوز الحلو. هذه الزيوت تحبس الرطوبة وتغذي البشرة بعمق.</p>
            
            <h2 class="text-2xl font-bold mb-4 mt-8">5. واقي الشمس</h2>
            <p class="mb-4">لا تنسي واقي الشمس حتى في الأيام الغائمة. اختاري واقي يحتوي على مرطبات للحماية والترطيب في آن واحد.</p>
            
            <h2 class="text-2xl font-bold mb-4 mt-8">نصائح إضافية</h2>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>اشربي الكثير من الماء للحفاظ على ترطيب جسمك وبشرتك</li>
                <li>استخدمي مرطباً قبل النوم لترطيب عميق طوال الليل</li>
                <li>تجنبي الماء الساخن جداً عند الاستحمام</li>
                <li>استخدمي قناع الوجه المرطب مرة أسبوعياً</li>
            </ul>
        `
    }
};

const relatedProducts = [
    {
        id: "p1",
        name: "غسول مرطب بالهيالورونيك",
        price: 89,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
        brand: "سحر",
        href: "/product/p1"
    },
    {
        id: "p2",
        name: "سيروم فيتامين سي",
        price: 149,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
        brand: "سحر",
        href: "/product/p2"
    },
    {
        id: "p3",
        name: "مرطب غني بالزيوت الطبيعية",
        price: 119,
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
        brand: "سحر",
        href: "/product/p3"
    },
    {
        id: "p4",
        name: "واقي شمس SPF 50",
        price: 99,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
        brand: "سحر",
        href: "/product/p4"
    }
];

const BlogDetailPage = () => {
    const { slug } = useParams();
    const post = blogPosts[slug || ""];

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
                    <Link to="/blog" className="text-[#E91E63]">العودة للمدونة</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageMeta 
                title={`${post.title} | سحر`}
                description={post.excerpt}
                image={post.image}
            />
            
            <div className="min-h-screen bg-white">
                {/* Header Image */}
                <div className="relative h-96 overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
                        <Link 
                            to="/blog"
                            className="inline-flex items-center gap-2 text-white mb-4 hover:text-[#E91E63] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            العودة للمدونة
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
                        <div className="flex items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
                            </div>
                            <span>{post.readTime} قراءة</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <Breadcrumb 
                        items={[
                            { label: "الرئيسية", href: "/" },
                            { label: "المدونة", href: "/blog" },
                            { label: post.title }
                        ]}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="prose prose-lg max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>

                            {/* Share & Like */}
                            <div className="flex items-center justify-between mt-12 pt-8 border-t">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                        مشاركة
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                        <Heart className="w-5 h-5" />
                                        إعجاب
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <h3 className="text-xl font-bold mb-6">منتجات مقترحة</h3>
                                <div className="space-y-4">
                                    {relatedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetailPage;

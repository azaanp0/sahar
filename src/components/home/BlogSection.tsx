import { Link } from "react-router-dom";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { proxyImageUrl } from "@/lib/imageProxy";
import { handleImageError } from "@/lib/imageHandler";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    slug: string;
}

interface BlogSectionProps {
    posts: BlogPost[];
}

const BlogSection = ({ posts }: BlogSectionProps) => {
    if (posts.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold">المدونة</h2>
                    <Link to="/blog">
                        <Button variant="ghost" className="gap-2">
                            عرض الكل
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.slice(0, 6).map((post) => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="group bg-card rounded-xl overflow-hidden border hover:border-primary/50 transition-all hover:shadow-lg"
                        >
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src={proxyImageUrl(post.image)}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={handleImageError}
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.date).toLocaleDateString("ar-SA")}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;

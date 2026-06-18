import { Instagram, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { proxyImageUrl } from "@/lib/imageProxy";
import { handleImageError } from "@/lib/imageHandler";

interface InstagramPost {
    id: string;
    image: string;
    url: string;
    likes?: number;
}

interface InstagramGalleryProps {
    posts: InstagramPost[];
}

const InstagramGallery = ({ posts }: InstagramGalleryProps) => {
    if (posts.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                            <Instagram className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-black dark:text-white">تابعينا على انستغرام</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">@sahar.sa</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="gap-2 text-black dark:text-white hover:text-[#E91E63] dark:hover:text-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease">
                        عرض الكل
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {posts.slice(0, 12).map((post) => (
                        <a
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="aspect-square overflow-hidden rounded-lg group relative"
                        >
                            <img
                                src={proxyImageUrl(post.image)}
                                alt="Instagram post"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={handleImageError}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Instagram className="h-8 w-8 text-white" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramGallery;

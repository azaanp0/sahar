import { Link } from "react-router-dom";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";

interface BannerItem {
    image: string;
    href: string;
    alt?: string;
}

interface BannerSectionProps {
    items?: BannerItem[];
    banners?: BannerItem[]; // alias for items
    cols?: 1 | 2 | 3;
    className?: string;
}

const BannerSection = ({ items, banners, cols = 1, className = "" }: BannerSectionProps) => {
    const data = items ?? banners ?? [];
    const gridClass =
        cols === 1 ? "grid-cols-1" :
            cols === 2 ? "grid-cols-1 md:grid-cols-2" :
                "grid-cols-1 md:grid-cols-3";

    return (
        <section className={`px-4 py-3 ${className}`}>
            <div className={`mx-auto max-w-screen-xl grid ${gridClass} gap-3`}>
                {data.map((item, i) => (
                    <Link key={i} to={item.href} className="block overflow-hidden rounded-lg hover:opacity-95 transition-opacity">
                        <img
                            src={proxyImageUrl(item.image)}
                            alt={item.alt || "سحر - بانر"}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                            onError={handleImageError}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default BannerSection;

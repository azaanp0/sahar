import { Link } from "react-router-dom";
import { Gift, Package, Percent, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { proxyImageUrl } from "@/lib/imageProxy";
import { handleImageError } from "@/lib/imageHandler";
import type { Product } from "@/types";

interface SpecialOffer {
    id: string;
    type: "discount" | "1plus1" | "gift" | "bundle";
    title: string;
    description: string;
    image: string;
    products: Product[];
    endDate?: Date;
}

interface SpecialOffersSectionProps {
    offers: SpecialOffer[];
}

const SpecialOffersSection = ({ offers }: SpecialOffersSectionProps) => {
    const offerIcons = {
        discount: <Percent className="h-5 w-5" />,
        "1plus1": <Package className="h-5 w-5" />,
        gift: <Gift className="h-5 w-5" />,
        bundle: <Package className="h-5 w-5" />,
    };

    const offerColors = {
        discount: "bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#E91E63] dark:text-[#C2185B]",
        "1plus1": "bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#E91E63] dark:text-[#C2185B]",
        gift: "bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#E91E63] dark:text-[#C2185B]",
        bundle: "bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#E91E63] dark:text-[#C2185B]",
    };

    const offerLabels = {
        discount: "خصم",
        "1plus1": "1+1 مجاني",
        gift: "هدية مجانية",
        bundle: "باقة",
    };

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">عروض خاصة</h2>
                    <Link to="/offers">
                        <Button variant="ghost" className="gap-2 text-black dark:text-white hover:text-[#E91E63] dark:hover:text-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease">
                            عرض الكل
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offers.map((offer) => (
                        <Link
                            key={offer.id}
                            to={`/offers/${offer.id}`}
                            className="group bg-white dark:bg-[#16213e] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 hover:border-[#E91E63]/50 dark:hover:border-[#C2185B]/50 transition-all hover:shadow-lg dark:hover:shadow-gray-900/20"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={proxyImageUrl(offer.image)}
                                    alt={offer.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={handleImageError}
                                />
                                <Badge className={`absolute top-3 right-3 ${offerColors[offer.type]}`}>
                                    <span className="flex items-center gap-1">
                                        {offerIcons[offer.type]}
                                        {offerLabels[offer.type]}
                                    </span>
                                </Badge>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold mb-2 text-black dark:text-white">{offer.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{offer.description}</p>
                                <div className="text-sm text-[#E91E63] dark:text-[#C2185B] font-medium">
                                    {offer.products.length} منتج
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecialOffersSection;

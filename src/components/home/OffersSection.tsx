import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowLeft, Sparkles, Gift, Tag, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { proxyImageUrl } from "@/lib/imageProxy";
import { handleImageError } from "@/lib/imageHandler";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface OffersSectionProps {
    products: Product[];
}

const OffersSection = ({ products }: OffersSectionProps) => {
    const [activeTab, setActiveTab] = useState("all");
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;
                
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Reset timer
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
                
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Filter products based on tab
    const getFilteredProducts = (tab: string) => {
        switch (tab) {
            case "online":
                return products.filter(p => p.tags?.includes("online-exclusive")).slice(0, 8);
            case "1plus1":
                return products.filter(p => p.tags?.includes("1plus1")).slice(0, 8);
            case "gift":
                return products.filter(p => p.tags?.includes("free-gift")).slice(0, 8);
            case "price":
                return products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 8);
            default:
                return products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 8);
        }
    };

    const filteredProducts = getFilteredProducts(activeTab);

    return (
        <section className="py-8 md:py-12 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">العروض الخاصة</h2>
                    </div>
                    
                    {/* Countdown Timer */}
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                        <div className="flex gap-2 text-sm font-medium">
                            <span className="bg-primary text-white px-2 py-1 rounded">
                                {String(timeLeft.hours).padStart(2, '0')}
                            </span>
                            <span>:</span>
                            <span className="bg-primary text-white px-2 py-1 rounded">
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </span>
                            <span>:</span>
                            <span className="bg-primary text-white px-2 py-1 rounded">
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    <Link to="/offers">
                        <Button variant="ghost" className="gap-2">
                            عرض كل العروض
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                    <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
                        <TabsTrigger value="all" className="gap-2">
                            <Tag className="h-4 w-4" />
                            جميع العروض
                        </TabsTrigger>
                        <TabsTrigger value="online" className="gap-2">
                            <Gift className="h-4 w-4" />
                            حصري الأونلاين
                        </TabsTrigger>
                        <TabsTrigger value="1plus1" className="gap-2">
                            <Percent className="h-4 w-4" />
                            1+1 مجاني
                        </TabsTrigger>
                        <TabsTrigger value="gift" className="gap-2">
                            <Gift className="h-4 w-4" />
                            هدايا مجانية
                        </TabsTrigger>
                        <TabsTrigger value="price" className="gap-2">
                            <Percent className="h-4 w-4" />
                            نص السعر
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-6">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>لا توجد منتجات في هذا القسم حالياً</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default OffersSection;

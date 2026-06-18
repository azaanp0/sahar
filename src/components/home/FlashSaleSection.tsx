import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface FlashSaleSectionProps {
    products: Product[];
    endTime: Date;
}

const FlashSaleSection = ({ products, endTime }: FlashSaleSectionProps) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = endTime.getTime() - new Date().getTime();
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    const flashSaleProducts = products.filter(p => p.badge === "sale" || (p.originalPrice && p.originalPrice > p.price)).slice(0, 8);

    if (flashSaleProducts.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#E91E63] dark:bg-[#C2185B] rounded-lg">
                            <Flame className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#E91E63] dark:text-[#C2185B]">عروض فلاش</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">عروض محدودة لفترة قصيرة</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            {[
                                { label: "أيام", value: timeLeft.days },
                                { label: "ساعات", value: timeLeft.hours },
                                { label: "دقائق", value: timeLeft.minutes },
                                { label: "ثواني", value: timeLeft.seconds },
                            ].map((item) => (
                                <div key={item.label} className="bg-[#E91E63] dark:bg-[#C2185B] text-white px-3 py-2 rounded-lg text-center min-w-[60px]">
                                    <div className="text-xl font-bold">{String(item.value).padStart(2, "0")}</div>
                                    <div className="text-xs">{item.label}</div>
                                </div>
                            ))}
                        </div>
                        <Link to="/offers">
                            <Button variant="outline" className="gap-2 border-[#E91E63] dark:border-[#C2185B] text-[#E91E63] dark:text-[#C2185B] hover:bg-[#E91E63]/10 dark:hover:bg-[#C2185B]/10">
                                عرض الكل
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {flashSaleProducts.map((product) => {
                        const discount = product.originalPrice 
                            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                            : 0;
                        return (
                            <div key={product.id} className="relative">
                                <div className="absolute top-2 right-2 z-10 bg-[#E91E63] dark:bg-[#C2185B] text-white px-2 py-1 rounded-full text-sm font-bold">
                                    -{discount}%
                                </div>
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FlashSaleSection;

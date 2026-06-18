import { Link } from "react-router-dom";
import { Gift, Crown, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LoyaltyProgramSection = () => {
    const benefits = [
        { icon: <Star className="h-5 w-5" />, title: "اكسب نقاط", description: "نقطة لكل ريال تصرفينه" },
        { icon: <Gift className="h-5 w-5" />, title: "مكافآت حصرية", description: "استبدلي نقاطك بهدايا" },
        { icon: <Crown className="h-5 w-5" />, title: "مستويات مميزة", description: "صعودي في مستويات العضوية" },
    ];

    return (
        <section className="py-8 md:py-12 bg-gray-100 dark:bg-[#1a1a2e]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Crown className="h-8 w-8 text-[#E91E63] dark:text-[#C2185B]" />
                        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">برنامج الولاء</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">انضمي لبرنامج الولاء واستمتعي بمزايا حصرية</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-gray-600 shadow-sm dark:shadow-gray-900/20">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-[#E91E63]/10 dark:bg-[#C2185B]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#E91E63] dark:text-[#C2185B]">
                                    {benefit.icon}
                                </div>
                                <h3 className="font-bold mb-2 text-black dark:text-white">{benefit.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/account/loyalty">
                        <Button variant="outline" size="lg" className="gap-2 border-gray-200 dark:border-gray-600 text-black dark:text-white hover:border-[#E91E63] dark:hover:border-[#C2185B] hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors duration-300 ease">
                            عرض نقاطي
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoyaltyProgramSection;

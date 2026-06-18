import { Smartphone, ArrowLeft, Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppDownloadBanner = () => {
    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-6 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-right">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                حملي تطبيق سحر الآن
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                استمتعي بتجربة تسوق أفضل مع تطبيق سحر للجوال
                                <br />
                                عروض حصرية، تتبع الطلبات، ودفع سهل
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                <Button variant="outline" size="lg" className="gap-2">
                                    <Apple className="h-5 w-5" />
                                    <div className="text-right">
                                        <div className="text-xs">حملي من</div>
                                        <div className="font-bold">App Store</div>
                                    </div>
                                </Button>
                                <Button variant="outline" size="lg" className="gap-2">
                                    <Play className="h-5 w-5" />
                                    <div className="text-right">
                                        <div className="text-xs">حملي من</div>
                                        <div className="font-bold">Google Play</div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <div className="w-48 h-96 bg-card rounded-3xl border-4 border-gray-800 shadow-2xl mx-auto flex items-center justify-center">
                                    <Smartphone className="h-24 w-24 text-primary/50" />
                                </div>
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">قريباً</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppDownloadBanner;

import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BeautyQuizBanner = () => {
    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-6 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-right">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                <div className="p-2 bg-primary rounded-lg">
                                    <Sparkles className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold">اكتشفي نوع بشرتك</h2>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                أجيبي على بعض الأسئلة البسيطة واكتشفي المنتجات المناسبة لبشرتك
                            </p>
                            <Link to="/skin-quiz">
                                <Button size="lg" className="gap-2">
                                    ابدئي الاختبار
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Sparkles className="h-24 w-24 text-primary/50" />
                                </div>
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">مجاني</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeautyQuizBanner;

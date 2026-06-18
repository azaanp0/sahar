import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Review {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    text: string;
    date: string;
}

interface CustomerReviewsSectionProps {
    reviews: Review[];
}

const CustomerReviewsSection = ({ reviews }: CustomerReviewsSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [reviews.length]);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    if (reviews.length === 0) return null;

    const currentReview = reviews[currentIndex];

    return (
        <section className="py-6 md:py-8 lg:py-12 bg-gray-100 dark:bg-[#1a1a2e]">
            <div className="container mx-auto px-4 max-w-screen-xl">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black dark:text-white">تقييمات عملائنا</h2>
                    <p className="text-gray-600 dark:text-gray-400">ماذا يقول عملاؤنا عنا</p>
                </div>

                <div className="max-w-full sm:max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-600 shadow-sm dark:shadow-gray-900/20">
                        <div className="flex items-start gap-4 mb-6">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-xl">
                                    {currentReview.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-black dark:text-white">{currentReview.name}</h3>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${
                                                    star <= currentReview.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "fill-gray-200 dark:fill-gray-600 text-gray-200 dark:text-gray-600"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(currentReview.date).toLocaleDateString("ar-SA")}
                                </p>
                            </div>
                        </div>

                        <div className="relative mb-6">
                            <Quote className="h-8 w-8 text-[#E91E63]/20 dark:text-[#C2185B]/20 absolute -top-2 -right-2" />
                            <p className="text-lg leading-relaxed text-black dark:text-white">{currentReview.text}</p>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevReview}
                                className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
                            >
                                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                            </Button>
                            <div className="flex gap-2">
                                {reviews.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            index === currentIndex ? "bg-[#E91E63] dark:bg-[#C2185B]" : "bg-gray-300 dark:bg-gray-600"
                                        }`}
                                    />
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextReview}
                                className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
                            >
                                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviewsSection;

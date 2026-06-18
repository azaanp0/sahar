import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Review {
    id: string;
    user: string;
    avatar?: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    helpful: number;
    verified: boolean;
    images?: string[];
}

interface ProductReviewsProps {
    productId: string;
    averageRating: number;
    totalReviews: number;
    reviews: Review[];
}

const ProductReviews = ({ productId, averageRating, totalReviews, reviews }: ProductReviewsProps) => {
    const [filter, setFilter] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, title: "", content: "" });

    const ratingDistribution = [
        { stars: 5, count: Math.round(totalReviews * 0.6) },
        { stars: 4, count: Math.round(totalReviews * 0.2) },
        { stars: 3, count: Math.round(totalReviews * 0.1) },
        { stars: 2, count: Math.round(totalReviews * 0.05) },
        { stars: 1, count: Math.round(totalReviews * 0.05) },
    ];

    const filteredReviews = filter === "all" 
        ? reviews 
        : reviews.filter(r => r.rating === parseInt(filter));

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        // سيتم إرسال المراجعة للـ API
        setShowWriteReview(false);
        setNewReview({ rating: 5, title: "", content: "" });
    };

    return (
        <div className="space-y-8">
            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
                        <div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-5 w-5 ${
                                            star <= Math.round(averageRating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-gray-200 text-gray-200"
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{totalReviews} تقييم</p>
                        </div>
                    </div>
                    <Button onClick={() => setShowWriteReview(true)} className="w-full md:w-auto">
                        اكتبي تقييمك
                    </Button>
                </div>

                <div className="space-y-2">
                    {ratingDistribution.map((item) => (
                        <div key={item.stars} className="flex items-center gap-3">
                            <span className="text-sm w-8">{item.stars} نجوم</span>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400"
                                    style={{ width: `${(item.count / totalReviews) * 100}%` }}
                                />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Write Review Form */}
            {showWriteReview && (
                <div className="bg-card border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold">اكتبي تقييمك</h3>
                        <Button variant="ghost" size="sm" onClick={() => setShowWriteReview(false)}>
                            إلغاء
                        </Button>
                    </div>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">التقييم</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="p-1 hover:scale-110 transition-transform"
                                    >
                                        <Star
                                            className={`h-6 w-6 ${
                                                star <= newReview.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-200 text-gray-200"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">عنوان التقييم</label>
                            <input
                                type="text"
                                value={newReview.title}
                                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="لخصي تجربتك في جملة قصيرة"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">تفاصيل التقييم</label>
                            <Textarea
                                value={newReview.content}
                                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                                placeholder="أخبرينا المزيد عن تجربتك مع المنتج"
                                rows={4}
                                required
                            />
                        </div>
                        <Button type="submit">نشر التقييم</Button>
                    </form>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold">التقييمات ({filteredReviews.length})</h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter className="h-4 w-4" />
                                تصفية
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setFilter("all")}>الكل</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("5")}>5 نجوم</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("4")}>4 نجوم</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("3")}>3 نجوم</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("2")}>نجمتان</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter("1")}>نجمة واحدة</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="space-y-6">
                    {filteredReviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium">{review.user}</span>
                                        {review.verified && (
                                            <Badge variant="secondary" className="text-xs">
                                                شراء موثق
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${
                                                    star <= review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "fill-gray-200 text-gray-200"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <h4 className="font-medium mb-1">{review.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-3">{review.content}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>{new Date(review.date).toLocaleDateString("ar-SA")}</span>
                                        <div className="flex items-center gap-1">
                                            <ThumbsUp className="h-4 w-4" />
                                            <span>مفيد ({review.helpful})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;

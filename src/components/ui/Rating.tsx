import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
    value: number;
    max?: number;
    readonly?: boolean;
    onChange?: (value: number) => void;
    size?: "sm" | "md" | "lg";
    showValue?: boolean;
    reviewCount?: number;
}

const Rating = ({
    value,
    max = 5,
    readonly = true,
    onChange,
    size = "md",
    showValue = false,
    reviewCount
}: RatingProps) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    };

    const handleClick = (rating: number) => {
        if (!readonly && onChange) {
            onChange(rating);
        }
    };

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(value);
        const hasHalfStar = value % 1 >= 0.5;

        for (let i = 0; i < max; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star
                        key={i}
                        className={cn(
                            sizeClasses[size],
                            "fill-yellow-400 text-yellow-400",
                            !readonly && "cursor-pointer hover:scale-110 transition-transform"
                        )}
                        onClick={() => handleClick(i + 1)}
                    />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <StarHalf
                        key={i}
                        className={cn(
                            sizeClasses[size],
                            "fill-yellow-400 text-yellow-400",
                            !readonly && "cursor-pointer hover:scale-110 transition-transform"
                        )}
                        onClick={() => handleClick(i + 1)}
                    />
                );
            } else {
                stars.push(
                    <Star
                        key={i}
                        className={cn(
                            sizeClasses[size],
                            "fill-gray-200 text-gray-300",
                            !readonly && "cursor-pointer hover:scale-110 transition-transform"
                        )}
                        onClick={() => handleClick(i + 1)}
                    />
                );
            }
        }
        return stars;
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">{renderStars()}</div>
            {showValue && (
                <span className="text-sm font-medium text-gray-700">{value.toFixed(1)}</span>
            )}
            {reviewCount !== undefined && (
                <span className="text-sm text-gray-500">({reviewCount})</span>
            )}
        </div>
    );
};

export default Rating;

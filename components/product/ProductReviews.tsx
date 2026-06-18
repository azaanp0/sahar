import React, { useState } from 'react';
import { Star, ThumbsUp, Filter } from 'lucide-react';
import { ProductReview } from '../../types/product';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  averageRating,
  totalReviews,
}) => {
  const [filter, setFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');

  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter((review) => review.rating === parseInt(filter));

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
  }));

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Average Rating */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div>
              <Rating value={averageRating} size="lg" />
              <p className="text-sm text-gray-500 mt-1">{totalReviews} تقييم</p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-3">{rating}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <div className="flex gap-2">
          {(['all', '5', '4', '3', '2', '1'] as const).map((rating) => (
            <button
              key={rating}
              onClick={() => setFilter(rating)}
              className={cn(
                'px-3 py-1 rounded-full text-sm transition-colors',
                filter === rating
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {rating === 'all' ? 'الكل' : `${rating} نجوم`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {review.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{review.userName}</p>
                    <div className="flex items-center gap-2">
                      <Rating value={review.rating} size="sm" />
                      {review.verified && (
                        <Badge variant="success" size="sm">
                          تم التحقق
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('ar-SA')}
              </span>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.content}</p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`صورة المراجعة ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>مفيد ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          كتابة تقييم
        </Button>
      </div>
    </div>
  );
};

import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  onChange?: (value: number) => void;
  showCount?: boolean;
  count?: number;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  readonly = true,
  onChange,
  showCount = false,
  count,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      if (i <= Math.floor(value)) {
        // Full star
        stars.push(
          <Star
            key={i}
            className={cn(
              sizes[size],
              'fill-yellow-400 text-yellow-400',
              !readonly && 'cursor-pointer hover:scale-110 transition-transform'
            )}
            onClick={() => handleClick(i)}
          />
        );
      } else if (i === Math.ceil(value) && !Number.isInteger(value)) {
        // Half star
        stars.push(
          <StarHalf
            key={i}
            className={cn(
              sizes[size],
              'fill-yellow-400 text-yellow-400',
              !readonly && 'cursor-pointer hover:scale-110 transition-transform'
            )}
            onClick={() => handleClick(i)}
          />
        );
      } else {
        // Empty star
        stars.push(
          <Star
            key={i}
            className={cn(
              sizes[size],
              'text-gray-300',
              !readonly && 'cursor-pointer hover:scale-110 transition-transform'
            )}
            onClick={() => handleClick(i)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">{renderStars()}</div>
      {showCount && count !== undefined && (
        <span className="text-sm text-gray-500">({count})</span>
      )}
    </div>
  );
};

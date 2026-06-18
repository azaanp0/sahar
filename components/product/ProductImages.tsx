import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProductImagesProps {
  images: string[];
  thumbnail: string;
  alt: string;
}

export const ProductImages: React.FC<ProductImagesProps> = ({
  images,
  thumbnail,
  alt,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const allImages = [thumbnail, ...images];

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={allImages[selectedImage]}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-transform duration-300',
            isZoomed && 'scale-150'
          )}
        />
        
        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full">
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </div>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0',
                selectedImage === index
                  ? 'border-primary'
                  : 'border-transparent hover:border-gray-300'
              )}
            >
              <img
                src={image}
                alt={`${alt} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

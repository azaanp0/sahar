import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface HeroSlide {
  id: string;
  title: string;
  titleAr: string;
  titleEn: string;
  description: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  ctaText: string;
  ctaTextAr: string;
  ctaTextEn: string;
  ctaLink: string;
  backgroundColor?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            )}
            style={{ backgroundColor: slide.backgroundColor || '#F8F8F8' }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {currentSlideData.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">
                {currentSlideData.description}
              </p>
              <Link to={currentSlideData.ctaLink}>
                <Button variant="primary" size="lg">
                  {currentSlideData.ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
        <button
          onClick={handlePrevious}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
          aria-label="السابق"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
          aria-label="التالي"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-colors',
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            )}
            aria-label={`الشريحة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

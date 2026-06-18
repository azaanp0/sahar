import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductImagesProps {
    images: string[];
    alt: string;
}

const ProductImages = ({ images, alt }: ProductImagesProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div
                className={`relative aspect-square bg-gray-100 dark:bg-[#16213e] rounded-2xl overflow-hidden cursor-zoom-in ${
                    isZoomed ? "cursor-zoom-out" : ""
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
            >
                <img
                    src={images[currentIndex]}
                    alt={`${alt} - صورة ${currentIndex + 1}`}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                        isZoomed ? "scale-150" : "scale-100"
                    }`}
                />
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-700/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-700/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-colors"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>
                    </>
                )}
                <button
                    onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-700/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-colors"
                >
                    <ZoomIn className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                index === currentIndex ? "border-[#E91E63] dark:border-[#C2185B]" : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${alt} - صورة مصغرة ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImages;

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    fallback?: string;
    className?: string;
    [key: string]: any;
}

const ImageWithFallback = ({
    src,
    alt,
    fallback = "/placeholder.png",
    className,
    ...props
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(fallback);
        }
    };

    if (hasError) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center bg-gray-100 rounded-lg",
                    className
                )}
                {...props}
            >
                <div className="text-center p-4">
                    <ImageOff className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">صورة غير متاحة</p>
                </div>
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            className={className}
            {...props}
        />
    );
};

export default ImageWithFallback;

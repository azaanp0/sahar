import { useEffect, useRef } from "react";

interface AutoAltTextProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackAlt?: string;
}

const AutoAltText = ({ src, alt, fallbackAlt, ...props }: AutoAltTextProps) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!alt && imgRef.current) {
            // Generate alt text from src if not provided
            const fileName = src?.split("/").pop()?.split(".")[0];
            const generatedAlt = fallbackAlt || fileName || "صورة";
            imgRef.current.alt = generatedAlt;
        }
    }, [alt, fallbackAlt, src]);

    return <img ref={imgRef} src={src} alt={alt || fallbackAlt} {...props} />;
};

export default AutoAltText;

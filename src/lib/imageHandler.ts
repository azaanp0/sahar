/**
 * Image loading utility with fallback handling
 * Handles CORS errors and serves placeholder images
 */

const PLACEHOLDER_DATA_URL = "/placeholder.svg";
const PLACEHOLDER_IMAGE = "/placeholder.svg";

/**
 * Handle image loading errors and provide fallback
 */
export const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
    const img = event.currentTarget;
    const original = img.dataset.originalSrc;

    if (original && img.src !== original && !img.dataset.retried) {
        img.dataset.retried = "1";
        img.src = original;
        return;
    }

    if (img.src !== PLACEHOLDER_IMAGE && img.src !== PLACEHOLDER_DATA_URL) {
        img.src = PLACEHOLDER_IMAGE;
        img.classList.add("opacity-60");
    }
};

/**
 * Get image URL with fallback
 */
export const getImageUrl = (url: string | undefined): string => {
    return url || PLACEHOLDER_DATA_URL;
};

/**
 * Preload image with fallback
 */
export const preloadImage = (src: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(PLACEHOLDER_DATA_URL);
        img.src = src;
    });
};

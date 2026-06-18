import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageFile {
    id: string;
    file: File;
    preview: string;
    alt: string;
    isPrimary: boolean;
}

interface ImageUploaderProps {
    onImagesChange?: (images: ImageFile[]) => void;
    maxImages?: number;
    accept?: string;
}

const ImageUploader = ({
    onImagesChange,
    maxImages = 10,
    accept = "image/*"
}: ImageUploaderProps) => {
    const [images, setImages] = useState<ImageFile[]>([]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        if (images.length + files.length > maxImages) {
            alert(`يمكنك رفع ${maxImages} صور كحد أقصى`);
            return;
        }

        const newImages: ImageFile[] = files.map((file) => ({
            id: `${Date.now()}-${Math.random()}`,
            file,
            preview: URL.createObjectURL(file),
            alt: "",
            isPrimary: images.length === 0 && newImages.length === 0
        }));

        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesChange?.(updatedImages);
    }, [images, maxImages, onImagesChange]);

    const handleRemove = (id: string) => {
        const updatedImages = images.filter((img) => img.id !== id);
        // If primary was removed, set first image as primary
        if (images.find((img) => img.id === id)?.isPrimary && updatedImages.length > 0) {
            updatedImages[0].isPrimary = true;
        }
        setImages(updatedImages);
        onImagesChange?.(updatedImages);
    };

    const handleSetPrimary = (id: string) => {
        const updatedImages = images.map((img) => ({
            ...img,
            isPrimary: img.id === id
        }));
        setImages(updatedImages);
        onImagesChange?.(updatedImages);
    };

    const handleAltChange = (id: string, alt: string) => {
        const updatedImages = images.map((img) =>
            img.id === id ? { ...img, alt } : img
        );
        setImages(updatedImages);
        onImagesChange?.(updatedImages);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter((file) => file.type.startsWith("image/"));
        
        if (validFiles.length > 0) {
            const event = {
                target: { files: validFiles }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleFileSelect(event);
        }
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-[#E91E63] dark:hover:border-[#C2185B] transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    multiple
                    accept={accept}
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        اسحبي الصور هنا أو{" "}
                        <span className="text-[#E91E63] dark:text-[#C2185B] font-medium">اضغطي للاختيار</span>
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        PNG, JPG, WEBP حتى 10MB (حد أقصى {maxImages} صور)
                    </p>
                </label>
            </div>

            {/* Images Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className={`relative group border-2 rounded-lg overflow-hidden ${
                                image.isPrimary ? "border-[#E91E63] dark:border-[#C2185B]" : "border-gray-200 dark:border-gray-600"
                            }`}
                        >
                            {/* Image */}
                            <div className="relative aspect-square">
                                <img
                                    src={image.preview}
                                    alt={image.alt || "Preview"}
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Primary Badge */}
                                {image.isPrimary && (
                                    <div className="absolute top-2 right-2 bg-[#E91E63] dark:bg-[#C2185B] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        <Check className="w-3 h-3" />
                                        رئيسية
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    {!image.isPrimary && (
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => handleSetPrimary(image.id)}
                                            className="text-xs"
                                        >
                                            تعيين رئيسية
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleRemove(image.id)}
                                        className="text-xs"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Alt Input */}
                            <div className="p-2">
                                <Label htmlFor={`alt-${image.id}`} className="text-xs text-black dark:text-white">
                                    نص بديل
                                </Label>
                                <Input
                                    id={`alt-${image.id}`}
                                    type="text"
                                    value={image.alt}
                                    onChange={(e) => handleAltChange(image.id, e.target.value)}
                                    placeholder="وصف الصورة..."
                                    className="text-xs mt-1"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Info */}
            {images.length > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {images.length} من {maxImages} صور
                </p>
            )}
        </div>
    );
};

export default ImageUploader;

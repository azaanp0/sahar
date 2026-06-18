import { useState } from "react";

interface VariantOption {
    id: string;
    name: string;
    value: string;
    available: boolean;
}

interface VariantGroup {
    id: string;
    name: string;
    options: VariantOption[];
}

interface ProductVariantsProps {
    variants: VariantGroup[];
    onVariantChange: (selectedVariants: Record<string, string>) => void;
}

const ProductVariants = ({ variants, onVariantChange }: ProductVariantsProps) => {
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

    const handleVariantSelect = (groupId: string, optionId: string) => {
        const newSelection = { ...selectedVariants, [groupId]: optionId };
        setSelectedVariants(newSelection);
        onVariantChange(newSelection);
    };

    return (
        <div className="space-y-4">
            {variants.map((variant) => (
                <div key={variant.id}>
                    <h3 className="font-medium mb-2 text-black dark:text-white">{variant.name}</h3>
                    <div className="flex flex-wrap gap-2">
                        {variant.options.map((option) => {
                            const isSelected = selectedVariants[variant.id] === option.id;
                            const isUnavailable = !option.available;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => !isUnavailable && handleVariantSelect(variant.id, option.id)}
                                    disabled={isUnavailable}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isSelected
                                            ? "bg-[#E91E63] text-white"
                                            : isUnavailable
                                                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                                                : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    {option.value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductVariants;

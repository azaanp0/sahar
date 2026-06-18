import React from 'react';
import { Check } from 'lucide-react';
import { ProductVariant, VariantValue } from '../../types/product';
import { cn } from '../../lib/utils';

interface ProductVariantsProps {
  variants: ProductVariant[];
  selectedVariants: Record<string, string>;
  onSelectVariant: (variantId: string, valueId: string) => void;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  selectedVariants,
  onSelectVariant,
}) => {
  return (
    <div className="space-y-6">
      {variants.map((variant) => (
        <div key={variant.id}>
          <h3 className="text-sm font-medium text-gray-900 mb-3">{variant.name}</h3>
          <div className="flex flex-wrap gap-2">
            {variant.values.map((value) => {
              const isSelected = selectedVariants[variant.id] === value.id;
              const isOutOfStock = value.stock === 0;

              return (
                <button
                  key={value.id}
                  onClick={() => !isOutOfStock && onSelectVariant(variant.id, value.id)}
                  disabled={isOutOfStock}
                  className={cn(
                    'relative px-4 py-2 rounded-lg border-2 transition-all',
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-gray-300',
                    isOutOfStock && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-label={value.value}
                >
                  {variant.type === 'color' && value.color ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2"
                        style={{ backgroundColor: value.color }}
                      />
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  ) : (
                    <span className="text-sm">{value.value}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

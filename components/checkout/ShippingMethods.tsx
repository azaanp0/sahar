import React from 'react';
import { ShippingMethod } from '../../types/order';
import { cn } from '../../lib/utils';

interface ShippingMethodsProps {
  methods: ShippingMethod[];
  selectedMethod?: string;
  onSelect: (methodId: string) => void;
}

export const ShippingMethods: React.FC<ShippingMethodsProps> = ({
  methods,
  selectedMethod,
  onSelect,
}) => {
  if (methods.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">طرق الشحن</h3>
      <div className="space-y-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={cn(
              'w-full p-4 rounded-lg border-2 text-right transition-colors',
              selectedMethod === method.id
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                      selectedMethod === method.id
                        ? 'border-primary bg-primary'
                        : 'border-gray-300 dark:border-gray-600'
                    )}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{method.name}</h4>
                    {method.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-primary">
                  {method.price === 0 ? 'مجاني' : `${method.price} ر.س`}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{method.estimatedDays}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

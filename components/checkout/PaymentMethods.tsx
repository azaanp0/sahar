import React from 'react';
import { PaymentMethod } from '../../types/order';
import { cn } from '../../lib/utils';

interface PaymentMethodsProps {
  methods: PaymentMethod[];
  selectedMethod?: string;
  onSelect: (methodId: string) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  methods,
  selectedMethod,
  onSelect,
}) => {
  if (methods.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">طرق الدفع</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={cn(
              'p-4 rounded-lg border-2 transition-colors flex flex-col items-center gap-3',
              selectedMethod === method.id
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            )}
          >
            {method.icon && (
              <img
                src={method.icon}
                alt={method.name}
                className="w-12 h-12 object-contain"
              />
            )}
            <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {method.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

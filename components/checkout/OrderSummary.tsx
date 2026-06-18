import React from 'react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/utils';

interface OrderSummaryProps {
  shippingCost?: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ shippingCost }) => {
  const { items, subtotal, discount, tax, total } = useCart();

  return (
    <div className="bg-gray-50 dark:bg-[#16213e] rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ملخص الطلب</h3>

      {/* Items */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                {item.productName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.quantity} × {formatPrice(item.salePrice || item.price)}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatPrice(item.total)}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t dark:border-gray-700 pt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">المجموع الفرعي</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">الخصم</span>
            <span className="font-medium text-green-600 dark:text-green-400">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">الضريبة (15%)</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(tax)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">الشحن</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {shippingCost === 0 ? 'مجاني' : formatPrice(shippingCost || 0)}
          </span>
        </div>
        <div className="border-t dark:border-gray-700 pt-2">
          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-gray-900 dark:text-white">الإجمالي</span>
            <span className="text-primary">{formatPrice(total + (shippingCost || 0))}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

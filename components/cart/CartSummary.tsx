import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/utils';

export const CartSummary: React.FC = () => {
  const { subtotal, discount, tax, shipping, total, couponCode, applyCouponCode, removeCouponCode } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      // Mock coupon application - in real app, this would call an API
      applyCouponCode(couponInput, 10);
      setCouponInput('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Coupon Code */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 dark:text-white">كود الخصم</label>
        <div className="flex gap-2">
          <Input
            placeholder="أدخل كود الخصم"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleApplyCoupon} variant="primary" size="md">
            تطبيق
          </Button>
        </div>
        {couponCode && (
          <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="text-sm text-green-700 dark:text-green-400">تم تطبيق الكود: {couponCode}</span>
            <button
              onClick={removeCouponCode}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700"
            >
              إزالة
            </button>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="border-t dark:border-gray-700 pt-4 space-y-3">
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
            {shipping === 0 ? 'مجاني' : formatPrice(shipping)}
          </span>
        </div>
        <div className="border-t dark:border-gray-700 pt-3">
          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-gray-900 dark:text-white">الإجمالي</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Link to="/checkout" className="block">
        <Button variant="primary" size="lg" fullWidth>
          إتمام الطلب
        </Button>
      </Link>

      {/* Continue Shopping */}
      <Link to="/products" className="block text-center">
        <Button variant="ghost" size="md" fullWidth>
          متابعة التسوق
        </Button>
      </Link>
    </div>
  );
};

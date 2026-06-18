import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/api';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateItemQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      updateItemQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b dark:border-gray-700">
      {/* Product Image */}
      <Link
        to={`/product/${item.productSlug}`}
        className="flex-shrink-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
      >
        <img
          src={item.productImage}
          alt={item.productName}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link
              to={`/product/${item.productSlug}`}
              className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2"
            >
              {item.productName}
            </Link>
            {item.variant && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.variant}</p>
            )}
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors"
            aria-label="إزالة من السلة"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">
              {formatPrice(item.salePrice || item.price)}
            </span>
            {item.salePrice && item.salePrice < item.price && (
              <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="تقليل الكمية"
            >
              <Minus className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
            <span className="w-8 text-center font-medium text-gray-900 dark:text-white">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="زيادة الكمية"
            >
              <Plus className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">المجموع:</span>
          <span className="font-bold text-gray-900 dark:text-white">{formatPrice(item.total)}</span>
        </div>

        {/* Stock Warning */}
        {item.stock <= 3 && item.stock > 0 && (
          <p className="text-sm text-orange-500 dark:text-orange-400 mt-2">
            متوفر فقط {item.stock} قطع
          </p>
        )}
        {item.stock === 0 && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-2">نفذت الكمية</p>
        )}
      </div>
    </div>
  );
};

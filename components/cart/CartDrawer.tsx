import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useUIStore } from '../../store/uiStore';
import { Drawer } from '../ui/Drawer';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { items, isEmpty } = useCart();
  const { isCartOpen, setCartOpen } = useUIStore();

  return (
    <Drawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} position="left">
      <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">سلة التسوق</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{items.length} منتج</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">السلة فارغة</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">أضيفي منتجاتك المفضلة للسلة</p>
            </div>
          ) : (
            <div className="divide-y dark:divide-gray-700">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t dark:border-gray-700 p-4">
            <CartSummary />
          </div>
        )}
      </div>
    </Drawer>
  );
};

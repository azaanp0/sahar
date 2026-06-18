import { useCartStore } from '../store/cartStore';
import { CartItem } from '../types/api';

export function useCart() {
  const {
    items,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    currency,
    couponCode,
    couponDiscount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: Omit<CartItem, 'id' | 'total'>) => {
    addItem(item);
  };

  const removeFromCart = (id: string) => {
    removeItem(id);
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const clearCartItems = () => {
    clearCart();
  };

  const applyCouponCode = (code: string, discount: number) => {
    applyCoupon(code, discount);
  };

  const removeCouponCode = () => {
    removeCoupon();
  };

  return {
    items,
    itemCount,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    currency,
    couponCode,
    couponDiscount,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCartItems,
    applyCouponCode,
    removeCouponCode,
    isEmpty: items.length === 0,
  };
}

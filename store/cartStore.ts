import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '../types/api';

interface CartState extends Cart {
  addItem: (item: Omit<CartItem, 'id' | 'total'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discount: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'SAR',

      addItem: (item) => {
        const state = get();
        const existingItem = state.items.find(
          (i) =>
            i.productId === item.productId &&
            i.variant === item.variant
        );

        let newItems: CartItem[];

        if (existingItem) {
          newItems = state.items.map((i) =>
            i.id === existingItem.id
              ? { ...i, quantity: i.quantity + item.quantity, total: (i.price * (i.quantity + item.quantity)) }
              : i
          );
        } else {
          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${item.variant || 'default'}-${Date.now()}`,
            total: item.price * item.quantity,
          };
          newItems = [...state.items, newItem];
        }

        const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
        const discount = state.couponDiscount || 0;
        const tax = (subtotal - discount) * 0.15;
        const total = subtotal - discount + tax + state.shipping;

        set({
          items: newItems,
          subtotal,
          tax,
          total,
        });
      },

      removeItem: (id) => {
        const state = get();
        const newItems = state.items.filter((item) => item.id !== id);
        const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
        const discount = state.couponDiscount || 0;
        const tax = (subtotal - discount) * 0.15;
        const total = subtotal - discount + tax + state.shipping;

        set({
          items: newItems,
          subtotal,
          tax,
          total,
        });
      },

      updateQuantity: (id, quantity) => {
        const state = get();
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const newItems = state.items.map((item) =>
          item.id === id
            ? { ...item, quantity, total: item.price * quantity }
            : item
        );

        const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
        const discount = state.couponDiscount || 0;
        const tax = (subtotal - discount) * 0.15;
        const total = subtotal - discount + tax + state.shipping;

        set({
          items: newItems,
          subtotal,
          tax,
          total,
        });
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          discount: 0,
          tax: 0,
          shipping: 0,
          total: 0,
          couponCode: undefined,
          couponDiscount: undefined,
        });
      },

      applyCoupon: (code, discount) => {
        const state = get();
        const newDiscount = state.subtotal * (discount / 100);
        const tax = (state.subtotal - newDiscount) * 0.15;
        const total = state.subtotal - newDiscount + tax + state.shipping;

        set({
          couponCode: code,
          couponDiscount: newDiscount,
          discount: newDiscount,
          tax,
          total,
        });
      },

      removeCoupon: () => {
        const state = get();
        const tax = state.subtotal * 0.15;
        const total = state.subtotal + tax + state.shipping;

        set({
          couponCode: undefined,
          couponDiscount: undefined,
          discount: 0,
          tax,
          total,
        });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

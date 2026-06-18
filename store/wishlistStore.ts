import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem } from '../types/api';

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const state = get();
        const existingItem = state.items.find((i) => i.productId === item.productId);

        if (!existingItem) {
          const newItem: WishlistItem = {
            ...item,
            id: `${item.productId}-${Date.now()}`,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...state.items, newItem] });
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

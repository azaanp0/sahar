import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
    items: string[];
    addItem: (productId: string) => void;
    removeItem: (productId: string) => void;
    toggleItem: (productId: string) => void;
    hasItem: (productId: string) => boolean;
    clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            
            addItem: (productId) => {
                set((state) => {
                    if (state.items.includes(productId)) return state;
                    return { items: [...state.items, productId] };
                });
            },
            
            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter(id => id !== productId)
                }));
            },
            
            toggleItem: (productId) => {
                set((state) => {
                    if (state.items.includes(productId)) {
                        return { items: state.items.filter(id => id !== productId) };
                    }
                    return { items: [...state.items, productId] };
                });
            },
            
            hasItem: (productId) => {
                return get().items.includes(productId);
            },
            
            clear: () => {
                set({ items: [] });
            }
        }),
        {
            name: 'sahar-wishlist-storage'
        }
    )
);

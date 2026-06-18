import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    productId: string;
    quantity: number;
    variant?: {
        color?: string;
        size?: string;
    };
}

interface CartStore {
    items: CartItem[];
    addItem: (productId: string, quantity?: number, variant?: CartItem['variant']) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: (products: Record<string, { price: number }>) => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            
            addItem: (productId, quantity = 1, variant) => {
                set((state) => {
                    const existing = state.items.find(item => item.productId === productId);
                    if (existing) {
                        return {
                            items: state.items.map(item =>
                                item.productId === productId
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            )
                        };
                    }
                    return {
                        items: [...state.items, { productId, quantity, variant }]
                    };
                });
            },
            
            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.productId !== productId)
                }));
            },
            
            updateQuantity: (productId, quantity) => {
                if (quantity < 1) {
                    get().removeItem(productId);
                    return;
                }
                set((state) => ({
                    items: state.items.map(item =>
                        item.productId === productId ? { ...item, quantity } : item
                    )
                }));
            },
            
            clearCart: () => {
                set({ items: [] });
            },
            
            getTotalItems: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },
            
            getTotalPrice: (products) => {
                return get().items.reduce((sum, item) => {
                    const product = products[item.productId];
                    return sum + (product?.price || 0) * item.quantity;
                }, 0);
            }
        }),
        {
            name: 'sahar-cart-storage'
        }
    )
);

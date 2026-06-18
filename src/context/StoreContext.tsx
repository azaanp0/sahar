import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { getProductById } from "@/data/catalog";
import type { CartItem, User, Address, Order, Product, Notification, OrderItem } from "@/types";

interface StoreState {
    cart: CartItem[];
    wishlist: string[];
    user: User | null;
    addresses: Address[];
    orders: Order[];
    notifications: Notification[];
}

interface StoreContextValue extends StoreState {
    cartCount: number;
    wishlistCount: number;
    unreadNotificationsCount: number;
    cartProducts: (Product & { quantity: number })[];
    cartSubtotal: number;
    addToCart: (productId: string, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleWishlist: (productId: string) => boolean;
    isInWishlist: (productId: string) => boolean;
    wishlistProducts: Product[];
    markNotificationRead: (id: string) => void;
    markAllNotificationsRead: () => void;
    login: (phone: string, password: string) => Promise<boolean>;
    register: (data: User & { password: string }) => Promise<boolean>;
    logout: () => Promise<void>;
    addAddress: (address: Omit<Address, "id">) => void;
    updateAddress: (id: string, data: Partial<Address>) => void;
    deleteAddress: (id: string) => void;
    updateProfile: (data: Partial<User>) => void;
    placeOrder: (total: number) => string;
    trackOrder: (orderId: string) => Order | undefined;
}

const STORAGE_KEY = "saher-store";

const defaultNotifications: Notification[] = [
    {
        id: "n1",
        title: "عرض الصيف",
        message: "خصومات تصل إلى 50% على منتجات مختارة",
        read: false,
        date: new Date().toISOString(),
        href: "/offers",
    },
    {
        id: "n2",
        title: "شحن مجاني",
        message: "توصيل مجاني للطلبات فوق 199 ريال",
        read: false,
        date: new Date(Date.now() - 86400000).toISOString(),
        href: "/shipping",
    },
    {
        id: "n3",
        title: "وصل حديثاً",
        message: "منتجات جديدة من الجمال الكوري",
        read: true,
        date: new Date(Date.now() - 172800000).toISOString(),
        href: "/category/korean",
    },
];

const defaultState: StoreState = {
    cart: [],
    wishlist: [],
    user: null,
    addresses: [],
    orders: [],
    notifications: defaultNotifications,
};

const StoreContext = createContext<StoreContextValue | null>(null);

function loadState(): StoreState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return { ...defaultState, ...JSON.parse(raw) };
    } catch {
        /* ignore */
    }
    return defaultState;
}

export function StoreProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<StoreState>(loadState);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const cartProducts = state.cart
        .map((item) => {
            const product = getProductById(item.productId);
            return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean) as (Product & { quantity: number })[];

    const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
    const wishlistCount = state.wishlist.length;
    const unreadNotificationsCount = state.notifications.filter((n) => !n.read).length;
    const cartSubtotal = cartProducts.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const wishlistProducts = state.wishlist
        .map((id) => getProductById(id))
        .filter(Boolean) as Product[];

    const addToCart = useCallback((productId: string, quantity = 1) => {
        setState((prev) => {
            const existing = prev.cart.find((i) => i.productId === productId);
            if (existing) {
                return {
                    ...prev,
                    cart: prev.cart.map((i) =>
                        i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
                    ),
                };
            }
            return { ...prev, cart: [...prev.cart, { productId, quantity }] };
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setState((prev) => ({ ...prev, cart: prev.cart.filter((i) => i.productId !== productId) }));
    }, []);

    const updateCartQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setState((prev) => ({
            ...prev,
            cart: prev.cart.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        }));
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setState((prev) => ({ ...prev, cart: [] }));
    }, []);

    const toggleWishlist = useCallback((productId: string) => {
        let added = false;
        setState((prev) => {
            const exists = prev.wishlist.includes(productId);
            added = !exists;
            return {
                ...prev,
                wishlist: exists
                    ? prev.wishlist.filter((id) => id !== productId)
                    : [...prev.wishlist, productId],
            };
        });
        return added;
    }, []);

    const isInWishlist = useCallback((productId: string) => state.wishlist.includes(productId), [state.wishlist]);

    const markNotificationRead = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }));
    }, []);

    const markAllNotificationsRead = useCallback(() => {
        setState((prev) => ({
            ...prev,
            notifications: prev.notifications.map((n) => ({ ...n, read: true })),
        }));
    }, []);

    const login = useCallback(async (phone: string, password: string) => {
        try {
            // In production, use authService.login
            // const result = await authService.login({ phone, password });
            // localStorage.setItem("sahar_access_token", result.access_token);
            // localStorage.setItem("sahar_refresh_token", result.refresh_token);
            // localStorage.setItem("sahar_user", JSON.stringify(result.user));
            
            // Mock implementation for now
            const user: User = { name: "عميلة سحر", phone, email: `${phone}@saher.com.sa` };
            setState((prev) => ({ ...prev, user }));
            return true;
        } catch (error) {
            return false;
        }
    }, []);

    const register = useCallback(async (data: User & { password: string }) => {
        try {
            // In production, use authService.register
            // const result = await authService.register(data);
            // localStorage.setItem("sahar_access_token", result.access_token);
            // localStorage.setItem("sahar_refresh_token", result.refresh_token);
            // localStorage.setItem("sahar_user", JSON.stringify(result.user));
            
            // Mock implementation for now
            setState((prev) => ({ ...prev, user: { name: data.name, phone: data.phone, email: data.email } }));
            return true;
        } catch (error) {
            return false;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            // In production, use authService.logout
            // await authService.logout();
            
            setState((prev) => ({ ...prev, user: null }));
        } catch (error) {
            // Handle error silently
        }
    }, []);

    const addAddress = useCallback((address: Omit<Address, "id">) => {
        const id = `addr-${Date.now()}`;
        setState((prev) => ({ ...prev, addresses: [...prev.addresses, { ...address, id }] }));
    }, []);

    const updateAddress = useCallback((id: string, data: Partial<Address>) => {
        setState((prev) => ({
            ...prev,
            addresses: prev.addresses.map((addr) =>
                addr.id === id ? { ...addr, ...data } : addr
            ),
        }));
    }, []);

    const deleteAddress = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            addresses: prev.addresses.filter((addr) => addr.id !== id),
        }));
    }, []);

    const updateProfile = useCallback((data: Partial<User>) => {
        setState((prev) => ({
            ...prev,
            user: prev.user ? { ...prev.user, ...data } : null,
        }));
    }, []);

    const placeOrder = useCallback((total: number) => {
        const id = `SAH-${Date.now().toString().slice(-8)}`;
        const orderItems: OrderItem[] = state.cart.map((item) => {
            const product = getProductById(item.productId);
            return {
                id: item.productId,
                name: product?.name || "منتج",
                image: product?.image || "",
                price: product?.price || 0,
                quantity: item.quantity,
            };
        });
        const order: Order = {
            id,
            date: new Date().toISOString(),
            status: "processing",
            items: orderItems,
            total,
            subtotal: cartSubtotal,
            shipping: 0,
            tax: cartSubtotal * 0.15,
            paymentMethod: "الدفع عند الاستلام",
        };
        setState((prev) => ({ ...prev, orders: [order, ...prev.orders], cart: [] }));
        return id;
    }, [state.cart, cartSubtotal]);

    const trackOrder = useCallback((orderId: string) => state.orders.find((o) => o.id === orderId), [state.orders]);

    return (
        <StoreContext.Provider
            value={{
                ...state,
                cartCount,
                wishlistCount,
                unreadNotificationsCount,
                cartProducts,
                cartSubtotal,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                clearCart,
                toggleWishlist,
                isInWishlist,
                wishlistProducts,
                markNotificationRead,
                markAllNotificationsRead,
                login,
                register,
                logout,
                addAddress,
                updateAddress,
                deleteAddress,
                updateProfile,
                placeOrder,
                trackOrder,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error("useStore must be used within StoreProvider");
    return ctx;
}

import { useStore } from "@/context/StoreContext";

export const useCart = () => {
    const {
        cart,
        cartCount,
        cartProducts,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart
    } = useStore();

    return {
        items: cart,
        count: cartCount,
        products: cartProducts,
        subtotal: cartSubtotal,
        addItem: addToCart,
        removeItem: removeFromCart,
        updateQuantity: updateCartQuantity,
        clear: clearCart
    };
};

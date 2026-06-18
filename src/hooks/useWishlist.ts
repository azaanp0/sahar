import { useStore } from "@/context/StoreContext";

export const useWishlist = () => {
    const {
        wishlist,
        wishlistCount,
        wishlistProducts,
        toggleWishlist,
        isInWishlist
    } = useStore();

    return {
        items: wishlist,
        count: wishlistCount,
        products: wishlistProducts,
        toggle: toggleWishlist,
        hasItem: isInWishlist
    };
};

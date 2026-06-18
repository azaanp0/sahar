import { useWishlistStore } from '../store/wishlistStore';
import { WishlistItem } from '../types/api';

export function useWishlist() {
  const {
    items,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
  } = useWishlistStore();

  const addToWishlist = (item: Omit<WishlistItem, 'id' | 'addedAt'>) => {
    addItem(item);
  };

  const removeFromWishlist = (productId: string) => {
    removeItem(productId);
  };

  const clearWishlistItems = () => {
    clearWishlist();
  };

  const toggleWishlist = (item: Omit<WishlistItem, 'id' | 'addedAt'>) => {
    if (isInWishlist(item.productId)) {
      removeFromWishlist(item.productId);
    } else {
      addToWishlist(item);
    }
  };

  return {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlistItems,
    toggleWishlist,
    isInWishlist,
    itemCount: items.length,
    isEmpty: items.length === 0,
  };
}

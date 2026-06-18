import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { SITE } from "@/data/catalog";
import { handleImageError } from "@/lib/imageHandler";
import { memo } from "react";

const MobileHeader = memo(() => {
    const { cartCount, wishlistCount } = useStore();
    const { openMenu, openSearch } = useUI();

    return (
        <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/80">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left - Menu */}
                    <button
                        onClick={openMenu}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                        aria-label="Open menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Center - Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            className="h-11 w-auto"
                            src="/saher-logo.png"
                            alt={SITE.name}
                            onError={handleImageError}
                        />
                        <h1 className="sr-only">{SITE.name}</h1>
                    </Link>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={openSearch}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        <Link
                            to="/wishlist"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative active:scale-95"
                            aria-label="Wishlist"
                        >
                            <Heart className="h-5 w-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white text-[10px] font-bold">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/cart"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative active:scale-95"
                            aria-label="Cart"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white text-[10px] font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/account"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                            aria-label="Account"
                        >
                            <User className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
});

MobileHeader.displayName = "MobileHeader";

export default MobileHeader;

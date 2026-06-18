import { Link } from "react-router-dom";
import { Home, ShoppingCart, Heart, User, Search } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";

const MobileNavBar = () => {
    const { cartCount, wishlistCount } = useStore();
    const { openSearch } = useUI();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
            <div className="flex items-center justify-around py-2">
                <Link
                    to="/"
                    className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    <Home className="h-5 w-5" />
                    <span className="text-[10px]">الرئيسية</span>
                </Link>

                <button
                    onClick={openSearch}
                    className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    <Search className="h-5 w-5" />
                    <span className="text-[10px]">بحث</span>
                </button>

                <Link
                    to="/cart"
                    className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors relative"
                >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="text-[10px]">السلة</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[9px] font-bold">
                            {cartCount}
                        </span>
                    )}
                </Link>

                <Link
                    to="/wishlist"
                    className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors relative"
                >
                    <Heart className="h-5 w-5" />
                    <span className="text-[10px]">المفضلة</span>
                    {wishlistCount > 0 && (
                        <span className="absolute -top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[9px] font-bold">
                            {wishlistCount}
                        </span>
                    )}
                </Link>

                <Link
                    to="/account"
                    className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    <User className="h-5 w-5" />
                    <span className="text-[10px]">حسابي</span>
                </Link>
            </div>
        </nav>
    );
};

export default MobileNavBar;

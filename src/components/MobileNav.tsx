import { Link, useLocation } from "react-router-dom";
import { Home, LayoutGrid, ShoppingCart, Heart, User, Search, Bell } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { memo } from "react";

const MobileNav = memo(() => {
    const location = useLocation();
    const { cartCount, wishlistCount, user, unreadNotificationsCount } = useStore();
    const { openMenu, openSearch } = useUI();

    const isActive = (path: string) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    const navItems = [
        { icon: Home, label: "الرئيسية", path: "/", action: null },
        { icon: LayoutGrid, label: "الأقسام", path: null, action: openMenu },
        { icon: Heart, label: "المفضلة", path: "/wishlist", action: null },
        { icon: ShoppingCart, label: "السلة", path: "/cart", action: null },
        { icon: User, label: "حسابي", path: "/account", action: null },
    ];

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
            aria-label="التنقل السفلي"
        >
            <div className="flex items-center justify-around py-1 px-1 pb-safe">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isItemActive = item.path ? isActive(item.path) : false;
                    const isCart = item.path === "/cart";
                    const isWishlist = item.path === "/wishlist";
                    const isAccount = item.path === "/account";
                    
                    const badgeCount = isCart ? cartCount : isWishlist ? wishlistCount : 0;
                    
                    return (
                        <div key={index} className="flex flex-col items-center flex-1">
                            {item.action ? (
                                <button
                                    onClick={item.action}
                                    className="flex flex-col items-center gap-0.5 p-1.5 w-full rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95"
                                >
                                    <div className="relative">
                                        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <span className="text-[9px] text-gray-600 dark:text-gray-300 font-medium">{item.label}</span>
                                </button>
                            ) : (
                                <Link
                                    to={item.path || "#"}
                                    className={`flex flex-col items-center gap-0.5 p-1.5 w-full rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 relative ${
                                        isItemActive ? "bg-pink-50 dark:bg-pink-900/20" : ""
                                    }`}
                                >
                                    <div className="relative">
                                        <Icon className={`h-5 w-5 ${isItemActive ? "text-pink-600" : "text-gray-600 dark:text-gray-300"} transition-colors`} />
                                        {badgeCount > 0 && (
                                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-white text-[9px] font-bold shadow-sm">
                                                {badgeCount > 99 ? '99+' : badgeCount}
                                            </span>
                                        )}
                                        {isAccount && unreadNotificationsCount > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-white text-[8px] font-bold">
                                                {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                                            </span>
                                        )}
                                        {isAccount && user && (
                                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-[#1a1a2e]" />
                                        )}
                                    </div>
                                    <span className={`text-[9px] font-medium transition-colors ${isItemActive ? "text-pink-600" : "text-gray-600 dark:text-gray-300"}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
});

MobileNav.displayName = "MobileNav";

export default MobileNav;

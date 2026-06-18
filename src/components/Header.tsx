import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Menu, X, Bell } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useUI } from "@/context/UIContext";
import { useTranslation } from "react-i18next";
import { SITE } from "@/data/catalog";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
import NotificationsDropdown from "./NotificationsDropdown";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { useState } from "react";
import { useAppStore } from "@/store/appStore";

const Header = () => {
    const { cartCount, wishlistCount, user, unreadNotificationsCount } = useStore();
    const { openMenu, openSearch } = useUI();
    const { i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    
    // Read theme settings from central store for live sync
    const theme = useAppStore(state => state.theme);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header 
            className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease"
            style={{ 
                borderColor: theme.accentColor || '#E91E63',
                fontFamily: theme.fontFamily || 'Cairo'
            }}
        >
            {/* Main Header - Optimized for Mobile */}
            <div className="bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-14 md:h-16 gap-2 md:gap-4">
                        {/* Left - Menu Button (Mobile Only) */}
                        <button
                            onClick={openMenu}
                            className="md:hidden p-2 rounded-[14px] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors group"
                            aria-label="القائمة"
                        >
                            <Menu className="w-5 h-5 text-black dark:text-white group-hover:text-[#E91E63] transition-colors" />
                        </button>

                        {/* Mobile Search Bar - Prominent */}
                        <div className="flex-1 md:hidden">
                            <button
                                onClick={openSearch}
                                className="w-full flex items-center gap-2 px-4 py-2.5 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(233,30,99,0.15)] rounded-full text-black dark:text-white text-sm transition-all duration-300 ease"
                            >
                                <Search className="w-4 h-4" />
                                <span className="dark:text-gray-200">ابحثي عن منتجاتك...</span>
                            </button>
                        </div>

                        {/* Desktop Left - Menu & Search */}
                        <div className="hidden md:flex items-center gap-4 flex-1">
                            <button
                                onClick={openMenu}
                                className="p-2 rounded-[14px] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(233,30,99,0.15)] transition-colors group"
                                aria-label="القائمة"
                            >
                                <Menu className="w-6 h-6 text-black dark:text-white group-hover:text-[#E91E63] transition-colors" />
                            </button>
                            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
                                <div className="relative w-full">
                                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black dark:text-white" />
                                    <input
                                        type="search"
                                        placeholder="ابحثي عن منتجاتك المفضلة..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-4 pr-10 py-2.5 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(233,30,99,0.15)] border border-[#E91E63] rounded-full text-sm text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63] transition-all duration-300 ease"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Center - Logo */}
                        <Link to="/" className="flex-shrink-0 hidden md:block">
                            <img
                                className="h-12 w-auto"
                                src={theme.logoUrl || '/saher-logo.png'}
                                alt={theme.storeName || SITE.name}
                                onError={handleImageError}
                            />
                        </Link>

                        {/* Mobile Logo - Smaller */}
                        <Link to="/" className="flex-shrink-0 md:hidden">
                            <img
                                className="h-8 w-auto"
                                src={theme.logoUrl || '/saher-logo.png'}
                                alt={theme.storeName || SITE.name}
                                onError={handleImageError}
                            />
                        </Link>

                        {/* Right - Actions */}
                        <div className="flex items-center gap-1 md:gap-2">
                            {/* Notifications - Mobile Only */}
                            <div className="md:hidden">
                                <NotificationsDropdown />
                            </div>

                            {/* Notifications - Desktop Only */}
                            <div className="hidden md:block">
                                <NotificationsDropdown />
                            </div>

                            {/* Language Switcher */}
                            <LanguageSwitcher />

                            {/* Theme Switcher */}
                            <ThemeSwitcher />

                            {/* Cart - Desktop Only */}
                            <Link
                                to="/cart"
                                className="hidden md:block relative p-2 rounded-[14px] bg-[#E91E63] hover:bg-[#C2185B] transition-colors group transition-all duration-300 ease"
                                aria-label="السلة"
                            >
                                <ShoppingCart className="w-5 h-5 text-white" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#E91E63] text-[10px] font-bold transition-all duration-300 ease">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

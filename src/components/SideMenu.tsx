import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, Heart, User, Package, Home, Tag, Phone, Mail, MapPin, Star } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useStore } from "@/context/StoreContext";
import { mainNavItems } from "@/data/navigation";
import { SITE } from "@/data/catalog";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
import type { NavItem } from "@/data/navigation";

const SideMenu = () => {
    const { menuOpen, closeMenu } = useUI();
    const { wishlistCount, user } = useStore();
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setExpanded(null);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    if (!menuOpen) return null;

    const toggleExpand = (label: string) => {
        setExpanded((prev) => (prev === label ? null : label));
    };

    const renderItem = (item: NavItem, depth = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expanded === item.label;

        if (hasChildren) {
            return (
                <li key={item.label} className="border-b border-gray-100 dark:border-gray-700">
                    <button
                        onClick={() => toggleExpand(item.label)}
                        className="flex w-full items-center justify-between py-3 px-4 text-sm font-medium hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors group"
                        style={{ paddingRight: `${depth * 12 + 16}px` }}
                    >
                        <span className="flex items-center gap-3">
                            {item.image && depth === 0 && (
                                <img
                                    src={proxyImageUrl(item.image)}
                                    alt={item.label}
                                    className="h-8 w-8 rounded-full object-cover ring-2 ring-pink-100 dark:ring-pink-900"
                                    onError={handleImageError}
                                />
                            )}
                            <span className="text-gray-700 dark:text-gray-200 group-hover:text-pink-600 transition-colors">{item.label}</span>
                        </span>
                        <ChevronLeft
                            className={`h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isExpanded ? "-rotate-90" : ""}`}
                        />
                    </button>
                    {isExpanded && (
                        <ul className="bg-pink-50/30 dark:bg-gray-800/50 animate-in slide-in-from-top-1 duration-200">
                            {item.href && (
                                <li>
                                    <Link
                                        to={item.href}
                                        onClick={closeMenu}
                                        className="block py-2.5 px-6 text-sm text-pink-600 font-medium hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        عرض الكل
                                    </Link>
                                </li>
                            )}
                            {item.children!.map((child) => renderItem(child, depth + 1))}
                        </ul>
                    )}
                </li>
            );
        }

        return (
            <li key={`${item.label}-${item.href}`} className={depth === 0 ? "border-b border-gray-100 dark:border-gray-700" : ""}>
                <Link
                    to={item.href || "#"}
                    onClick={closeMenu}
                    className="flex items-center gap-3 py-3 px-4 text-sm hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors group"
                    style={{ paddingRight: `${depth * 12 + 16}px` }}
                >
                    {item.image && depth === 0 && (
                        <img
                            src={proxyImageUrl(item.image)}
                            alt={item.label}
                            className="h-8 w-8 rounded-full object-cover ring-2 ring-pink-100 dark:ring-pink-900"
                            onError={handleImageError}
                        />
                    )}
                    <span className="text-gray-700 dark:text-gray-200 group-hover:text-pink-600 transition-colors">{item.label}</span>
                </Link>
            </li>
        );
    };

    return (
        <>
            <div
                className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={closeMenu}
                aria-hidden="true"
            />
            <aside
                id="mobile-menu"
                className="fixed top-0 right-0 z-[80] h-full w-[min(100%,380px)] bg-white dark:bg-gray-800 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col"
                role="dialog"
                aria-label="القائمة الرئيسية"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                    <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
                        <img
                            src={proxyImageUrl(SITE.logo)}
                            alt={SITE.name}
                            className="h-8 w-auto object-contain"
                            onError={handleImageError}
                        />
                    </Link>
                    <button
                        onClick={closeMenu}
                        className="p-2 hover:bg-white/50 dark:hover:bg-gray-700 rounded-full transition-colors"
                        aria-label="إغلاق القائمة"
                    >
                        <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto">
                    <ul className="py-2">
                        {/* Quick Links */}
                        <li className="border-b border-gray-100 dark:border-gray-700">
                            <Link
                                to="/"
                                onClick={closeMenu}
                                className="flex items-center gap-3 py-3 px-4 text-sm font-medium hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors group"
                            >
                                <Home className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-pink-600 transition-colors" />
                                <span className="text-gray-700 dark:text-gray-200 group-hover:text-pink-600 transition-colors">الرئيسية</span>
                            </Link>
                        </li>
                        <li className="border-b border-gray-100 dark:border-gray-700">
                            <Link
                                to="/offers"
                                onClick={closeMenu}
                                className="flex items-center gap-3 py-3 px-4 text-sm font-medium hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors group"
                            >
                                <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-pink-600 transition-colors" />
                                <span className="text-gray-700 dark:text-gray-200 group-hover:text-pink-600 transition-colors">العروض الخاصة</span>
                            </Link>
                        </li>

                        {/* Categories */}
                        {mainNavItems.map((item) => renderItem(item))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 space-y-3">
                    <Link
                        to="/about"
                        onClick={closeMenu}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-pink-600 transition-colors"
                    >
                        <Star className="h-4 w-4" />
                        عن المتجر
                    </Link>
                    <Link
                        to="/contact"
                        onClick={closeMenu}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-pink-600 transition-colors"
                    >
                        <Phone className="h-4 w-4" />
                        تواصل معنا
                    </Link>
                    <Link
                        to="/branches"
                        onClick={closeMenu}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-pink-600 transition-colors"
                    >
                        <MapPin className="h-4 w-4" />
                        فروعنا
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default SideMenu;

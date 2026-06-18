import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { useUIStore } from '../../store/uiStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import AnnouncementBar from '../../src/components/AnnouncementBar';

export const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const { setCartOpen, setAuthModalOpen } = useUIStore();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1a1a2e] shadow-sm dark:shadow-gray-900/20">
      <AnnouncementBar />
      
      {/* Top Bar */}
      <div className="border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo-saher.svg"
                alt="سحر | SAHAR"
                className="h-10 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Input
                  placeholder="ابحثي عن منتجاتك المفضلة..."
                  leftIcon={<Search className="w-5 h-5 text-gray-400" />}
                  className="w-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search Toggle - Mobile */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Heart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account */}
              {isAuthenticated ? (
                <Link to="/account" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </Link>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="hidden md:block"
                >
                  <Button variant="primary" size="sm">
                    تسجيل الدخول
                  </Button>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block border-b dark:border-gray-700">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 py-3">
            <li>
              <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium">
                المنتجات
              </Link>
            </li>
            <li>
              <Link to="/brands" className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium">
                الماركات
              </Link>
            </li>
            <li>
              <Link to="/offers" className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium">
                العروض
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium">
                المدونة
              </Link>
            </li>
            <li>
              <Link to="/skin-quiz" className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium">
                اختبار البشرة
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-700 bg-white dark:bg-[#1a1a2e]">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium"
                >
                  المنتجات
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium"
                >
                  الماركات
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium"
                >
                  العروض
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium"
                >
                  المدونة
                </Link>
              </li>
              <li>
                <Link
                  to="/skin-quiz"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium"
                >
                  اختبار البشرة
                </Link>
              </li>
              {!isAuthenticated && (
                <li className="pt-4 border-t dark:border-gray-700">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => {
                      setAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    تسجيل الدخول
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}

      {/* Search Modal - Mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-[#1a1a2e] md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>
              <Input
                placeholder="ابحثي عن منتجاتك المفضلة..."
                leftIcon={<Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
                className="flex-1"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { cn } from '../../lib/utils';

export const MobileNavBar: React.FC = () => {
  const location = useLocation();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const navItems = [
    { icon: Home, label: 'الرئيسية', path: '/' },
    { icon: ShoppingBag, label: 'المنتجات', path: '/products' },
    { icon: Heart, label: 'المفضلة', path: '/wishlist' },
    { icon: User, label: 'حسابي', path: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const showBadge = item.path === '/wishlist' && wishlistCount > 0;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors relative',
                isActive ? 'text-primary' : 'text-gray-500'
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
              {showBadge && (
                <span className="absolute -top-1 right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

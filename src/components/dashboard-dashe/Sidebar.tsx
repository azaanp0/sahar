import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/dashboard-dashe/db';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Database,
  Image, Palette, Link2, BookOpen, Settings, LogOut,
  ChevronLeft, ChevronRight, Menu, X, Sparkles, Bell, Search,
  TrendingUp, Shield
} from 'lucide-react';

export type Page =
  | 'dashboard' | 'products' | 'orders' | 'customers' | 'analytics'
  | 'onyx-sync' | 'media' | 'theme' | 'seo' | 'tutorial' | 'settings';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
}

const navItems: { id: Page; label: string; icon: React.ElementType; badge?: number | string }[] = [
  { id: 'dashboard',  label: 'الرئيسية',       icon: LayoutDashboard },
  { id: 'products',   label: 'المنتجات',        icon: Package },
  { id: 'orders',     label: 'الطلبات',         icon: ShoppingBag, badge: 4 },
  { id: 'customers',  label: 'العملاء',         icon: Users },
  { id: 'analytics',  label: 'التحليلات',       icon: TrendingUp },
  { id: 'onyx-sync',  label: 'Onyx ERP',        icon: Database },
  { id: 'media',      label: 'مكتبة الصور',    icon: Image },
  { id: 'theme',      label: 'تخصيص الواجهة',  icon: Palette },
  { id: 'seo',        label: 'SEO & روابط',    icon: Link2 },
  { id: 'tutorial',   label: 'مركز التعلم',    icon: BookOpen, badge: 'جديد' },
  { id: 'settings',   label: 'الإعدادات',      icon: Settings },
];

const SidebarContent = memo(({ currentPage, onNavigate, onLogout, collapsed, admin, theme }: SidebarProps & { collapsed: boolean; admin: any; theme: 'light' | 'dark' }) => {
  const handleNavigate = useCallback((page: Page) => {
    onNavigate(page);
  }, [onNavigate]);

  return (

    <div className={`flex flex-col h-full bg-white dark:bg-gray-800 text-black dark:text-white`}>
      {/* Logo */}
      <div className={`flex items-center gap-2 p-4 sm:p-5 border-b border-[#E91E63] dark:border-[#C2185B] ${collapsed ? 'justify-center' : ''}`}>
        <img src="/images/dashboard-logo.png" alt="عطور و تجميل" className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        {!collapsed && (
          <div className="flex-1">
            <h1 className={`font-black text-sm sm:text-lg leading-tight text-black dark:text-white`}>منصة سحر Care & Beauty</h1>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 sm:p-3 space-y-1 sm:space-y-2 overflow-y-auto overflow-x-hidden sidebar-scroll scroll-smooth">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <React.Fragment key={item.id}>
              {index > 0 && (
                <div className="border-t border-[#E91E63] dark:border-[#C2185B]" />
              )}
              <button
                onClick={() => handleNavigate(item.id)}
                title={collapsed ? item.label : undefined}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-2.5 rounded-xl transition-all duration-200 group relative min-h-[44px]
                  ${active
                    ? 'bg-[#E91E63] dark:bg-[#C2185B] text-white'
                    : 'text-black dark:text-gray-300 hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] hover:text-[#E91E63] dark:hover:text-[#C2185B]'
                  } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-black dark:text-gray-300 group-hover:text-[#E91E63] dark:group-hover:text-[#C2185B]'}`} />
                {!collapsed && (
                  <>
                    <span className={`flex-1 text-right text-xs sm:text-sm font-medium text-black dark:text-gray-300`}>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${typeof item.badge === 'number' ? 'bg-[#E91E63] text-white' : 'bg-[#E91E63] text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#E91E63] dark:bg-[#C2185B] rounded-full" />
                )}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* User section */}
      <div className={`p-2 sm:p-3 border-t border-[#E91E63] dark:border-[#C2185B] space-y-1 sm:space-y-2`}>
        {!collapsed && admin && (
          <div className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-xl border border-[#E91E63] dark:border-[#C2185B] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]`}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E91E63] flex items-center justify-center text-sm sm:text-lg flex-shrink-0 text-white">
              {admin.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs sm:text-sm font-semibold truncate text-black dark:text-white`}>{admin.name}</p>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#E91E63]" />
                <p className={`text-[10px] sm:text-xs text-black dark:text-gray-300`}>{admin.role === 'superadmin' ? 'مدير عام' : admin.role === 'admin' ? 'مدير' : 'مشرف'}</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          aria-label="تسجيل الخروج"
          className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-2.5 rounded-xl transition-all min-h-[44px] ${collapsed ? 'justify-center' : ''} ${theme === 'dark' ? 'text-gray-300 hover:bg-[rgba(233,30,99,0.15)] hover:text-[#E91E63]' : 'text-black hover:bg-[rgba(233,30,99,0.08)] hover:text-[#E91E63]'}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className={`text-xs sm:text-sm font-medium text-black dark:text-gray-300`}>تسجيل الخروج</span>}
        </button>
      </div>
    </div>
  );
});

SidebarContent.displayName = 'SidebarContent';

export default function Sidebar({ currentPage, onNavigate, onLogout, theme }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const admin = db.getAdmin();

  const handleNavigate = useCallback((page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  }, [onNavigate]);

  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col border border-[#E91E63] dark:border-[#C2185B] transition-all duration-300 ease-in-out relative shadow-sidebar h-screen ${collapsed ? 'w-[68px]' : 'w-[260px]'} bg-white dark:bg-gray-800 text-black dark:text-white`}>
        <SidebarContent
          currentPage={currentPage}
          onNavigate={onNavigate}
          onLogout={onLogout}
          collapsed={collapsed}
          admin={admin}
        />
        {/* Collapse toggle */}
        <motion.button
          onClick={toggleCollapse}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -left-3 top-20 w-6 h-6 border border-[#E91E63] dark:border-[#C2185B] rounded-full flex items-center justify-center shadow-card hover:shadow-glow transition-all z-10 bg-white dark:bg-gray-800 text-black dark:text-white"
          aria-label={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {collapsed ? <ChevronLeft className="w-3 h-3 text-black dark:text-white" /> : <ChevronRight className="w-3 h-3 text-black dark:text-white" />}
          </motion.div>
        </motion.button>
      </aside>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={toggleMobile}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed top-4 right-4 z-50 w-11 h-11 border border-[#E91E63] dark:border-[#C2185B] rounded-xl flex items-center justify-center shadow-card min-h-[44px] min-w-[44px] bg-white dark:bg-gray-800 text-black dark:text-white"
        aria-label="فتح القائمة"
      >
        <Menu className="w-5 h-5 text-black dark:text-white" />
      </motion.button>

      {/* Mobile Overlay with Framer Motion */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={toggleMobile}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-72 sm:w-80 border border-[#E91E63] dark:border-[#C2185B] h-full shadow-sidebar overflow-y-auto bg-white dark:bg-gray-800 text-black dark:text-white"
              role="dialog"
              aria-modal="true"
              aria-label="قائمة التنقل"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#E91E63] dark:border-[#C2185B]">
                <span className="font-bold text-sm sm:text-base text-black dark:text-white">
                  متجر سحر | لوحة التحكم
                </span>
                <motion.button
                  onClick={toggleMobile}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)]"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5 text-black dark:text-white" />
                </motion.button>
              </div>
              <div className="p-2 sm:p-3">
                <SidebarContent
                  currentPage={currentPage}
                  onNavigate={handleNavigate}
                  onLogout={onLogout}
                  collapsed={false}
                  admin={admin}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Top Header Bar ───────────────────────────────────────
export function TopBar({ currentPage, theme }: { currentPage: Page; theme: 'light' | 'dark' }) {
  const pageLabels: Record<Page, string> = {
    dashboard: 'لوحة التحكم الرئيسية',
    products: 'إدارة المنتجات',
    orders: 'إدارة الطلبات',
    customers: 'إدارة العملاء',
    'onyx-sync': 'ربط قاعدة بيانات Onyx ERP',
    media: 'مكتبة الصور والوسائط',
    theme: 'تخصيص واجهة المتجر',
    seo: 'إدارة SEO والروابط',
    tutorial: 'مركز التعلم التفاعلي',
    settings: 'الإعدادات العامة',
  };

  const stats = db.getStats();

  return (
    <header className="border-b border-[#E91E63] dark:border-[#C2185B] px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="flex items-center gap-3 lg:gap-0">
        <div className="hidden lg:block">
          <h2 className="text-xl font-bold text-black dark:text-white">{pageLabels[currentPage]}</h2>
          <p className="text-xs mt-0.5 text-black/60 dark:text-gray-400">{new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] px-3 py-2 transition-all duration-300 ease bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]">
          <Search className="w-4 h-4 text-black dark:text-gray-300" />
          <input placeholder="بحث سريع..." className="bg-transparent text-sm outline-none w-40 placeholder:text-black/60 dark:placeholder:text-gray-500 text-black dark:text-white" />
        </div>

        {/* Stats pill */}
        <div className="hidden sm:flex items-center gap-2 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] px-3 py-1.5 transition-all duration-300 ease bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]">
          <TrendingUp className="w-4 h-4 text-[#E91E63] dark:text-[#C2185B]" />
          <span className="text-xs font-bold text-black dark:text-white">{stats.salesToday.toLocaleString('ar-SA')} ر.س اليوم</span>
        </div>

        {/* Notifications */}
        <button onClick={() => alert('الإشعارات: لديك 3 إشعارات جديدة')} className="relative w-10 h-10 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] flex items-center justify-center bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] transition-colors duration-300 ease">
          <Bell className="w-5 h-5 text-black dark:text-white" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E91E63] rounded-full border-2 border-white" />
        </button>
      </div>
    </header>
  );
}

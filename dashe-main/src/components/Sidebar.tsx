import React, { useState } from 'react';
import { db } from '../lib/db';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Database,
  Image, Palette, Link2, BookOpen, Settings, LogOut,
  ChevronLeft, ChevronRight, Menu, X, Sparkles, Bell, Search,
  TrendingUp, Shield
} from 'lucide-react';

export type Page =
  | 'dashboard' | 'products' | 'orders' | 'customers'
  | 'onyx-sync' | 'media' | 'theme' | 'seo' | 'tutorial' | 'settings';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType; badge?: number | string }[] = [
  { id: 'dashboard',  label: 'الرئيسية',       icon: LayoutDashboard },
  { id: 'products',   label: 'المنتجات',        icon: Package },
  { id: 'orders',     label: 'الطلبات',         icon: ShoppingBag, badge: 4 },
  { id: 'customers',  label: 'العملاء',         icon: Users },
  { id: 'onyx-sync',  label: 'Onyx ERP',        icon: Database },
  { id: 'media',      label: 'مكتبة الصور',    icon: Image },
  { id: 'theme',      label: 'تخصيص الواجهة',  icon: Palette },
  { id: 'seo',        label: 'SEO & روابط',    icon: Link2 },
  { id: 'tutorial',   label: 'مركز التعلم',    icon: BookOpen, badge: 'جديد' },
  { id: 'settings',   label: 'الإعدادات',      icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const admin = db.getAdmin();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 p-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-black text-xl leading-none">سحر</h1>
            <p className="text-primary-300 text-xs mt-0.5">SAHAR Dashboard</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto sidebar-scroll mt-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                ${active
                  ? 'bg-white/15 text-white sidebar-item-active'
                  : 'text-primary-200 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary-300' : 'text-primary-400 group-hover:text-primary-300'}`} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-right text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${typeof item.badge === 'number' ? 'bg-accent text-white' : 'bg-primary-500 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User section */}
      <div className={`p-3 border-t border-white/10 space-y-2`}>
        {!collapsed && admin && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-lg flex-shrink-0">
              {admin.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{admin.name}</p>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-primary-400" />
                <p className="text-primary-300 text-xs">{admin.role === 'superadmin' ? 'مدير عام' : admin.role === 'admin' ? 'مدير' : 'مشرف'}</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-primary-300 hover:bg-red-500/20 hover:text-red-300 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">تسجيل الخروج</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-sidebar transition-all duration-300 ease-in-out relative shadow-sidebar ${collapsed ? 'w-[68px]' : 'w-[260px]'}`}>
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -left-3 top-20 w-6 h-6 bg-white border border-primary-200 rounded-full flex items-center justify-center shadow-card hover:shadow-glow transition-all z-10"
        >
          {collapsed ? <ChevronLeft className="w-3 h-3 text-primary-700" /> : <ChevronRight className="w-3 h-3 text-primary-700" />}
        </button>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 bg-sidebar rounded-xl flex items-center justify-center shadow-card"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-sidebar h-full shadow-sidebar animate-slideIn">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 left-4 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}

// ─── Top Header Bar ───────────────────────────────────────
export function TopBar({ currentPage }: { currentPage: Page }) {
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
    <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-3 lg:gap-0">
        <div className="hidden lg:block">
          <h2 className="text-xl font-bold text-gray-900">{pageLabels[currentPage]}</h2>
          <p className="text-xs text-gray-400 mt-0.5">لوحة تحكم متجر سحر · {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-surface border border-border rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input placeholder="بحث سريع..." className="bg-transparent text-sm outline-none w-40 text-gray-600 placeholder:text-gray-400" />
        </div>

        {/* Stats pill */}
        <div className="hidden sm:flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-xl px-3 py-1.5">
          <TrendingUp className="w-4 h-4 text-primary-600" />
          <span className="text-xs font-bold text-primary-700">{stats.salesToday.toLocaleString('ar-SA')} ر.س اليوم</span>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 bg-surface border border-border rounded-xl flex items-center justify-center hover:bg-primary-50 transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white" />
        </button>
      </div>
    </header>
  );
}

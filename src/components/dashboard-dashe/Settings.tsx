import React, { useState } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import type { AdminUser } from '@/lib/dashboard-dashe/db';
import { useTheme } from 'next-themes';
import {
  User, Bell, Shield, Globe, Palette,
  Save, LogOut, Check
} from 'lucide-react';
import { ResponsiveCard } from './ResponsiveCard';

export default function SettingsPage() {
  const { theme } = useTheme();
  const [admin] = useState<AdminUser>(db.getAdmin());
  const [notification, setNotification] = useState('');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderAlerts: true,
    lowStockAlerts: true,
    weeklyReports: false,
    language: 'ar',
    timezone: 'Asia/Riyadh',
    currency: 'SAR',
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSave = () => {
    showNotification('تم حفظ الإعدادات بنجاح! ✓');
  };

  const handleLogout = () => {
    if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
      db.logout();
      window.location.reload();
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-6 animate-fadeIn overflow-x-hidden text-black dark:text-white">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black flex items-center gap-2 text-black dark:text-white">
          <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-[#E91E63] dark:text-[#C2185B]" />
          الإعدادات العامة
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-black/60 dark:text-gray-400">
          تخصيص إعدادات لوحة التحكم والإشعارات
        </p>
      </div>

      {notification && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 bg-[#22C55E] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounceIn text-xs sm:text-sm">
          <Check className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* Profile Section */}
      <ResponsiveCard className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-[#E91E63]" />
          <h2 className="text-base sm:text-lg font-bold text-black dark:text-white">معلومات الحساب</h2>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#E91E63] dark:border-[#C2185B] flex items-center justify-center text-2xl sm:text-3xl font-bold text-[#E91E63] dark:text-[#C2185B] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]">
            {admin.avatar || admin.name.charAt(0)}
          </div>
          <div>
            <p className="text-base sm:text-lg font-bold text-black dark:text-white">{admin.name}</p>
            <p className="text-xs sm:text-sm text-black/60 dark:text-gray-400">{admin.phone}</p>
            <p className="text-[10px] sm:text-xs text-[#E91E63] font-semibold mt-1">
              {admin.role === 'superadmin' ? 'مدير عام' : admin.role === 'admin' ? 'مدير' : 'مشرف'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-black dark:text-gray-300">الاسم الكامل</label>
            <input
              type="text"
              defaultValue={admin.name}
              className="w-full px-4 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-black dark:text-gray-300">رقم الهاتف</label>
            <input
              type="tel"
              defaultValue={admin.phone}
              className="w-full px-4 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 min-h-[44px]"
            />
          </div>
        </div>
      </ResponsiveCard>

      {/* Notifications Section */}
      <ResponsiveCard className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-[#E91E63] dark:text-[#C2185B]" />
          <h2 className="text-base sm:text-lg font-bold text-black dark:text-white">الإشعارات</h2>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'emailNotifications' as const, label: 'إشعارات البريد الإلكتروني', desc: 'تلقي إشعارات عبر البريد الإلكتروني' },
            { key: 'pushNotifications' as const, label: 'إشعارات المتصفح', desc: 'تلقي إشعارات فورية في المتصفح' },
            { key: 'orderAlerts' as const, label: 'تنبيهات الطلبات', desc: 'إشعار عند وصول طلب جديد' },
            { key: 'lowStockAlerts' as const, label: 'تنبيهات المخزون', desc: 'إشعار عند انخفاض المخزون' },
            { key: 'weeklyReports' as const, label: 'التقارير الأسبوعية', desc: 'تلقي ملخص أداء أسبوعي' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#E91E63] dark:border-[#C2185B] last:border-0">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-black dark:text-white">{item.label}</p>
                <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">{item.desc}</p>
              </div>
              <button
                onClick={() => toggleSetting(item.key)}
                className={`w-14 h-8 rounded-full transition-colors duration-300 relative flex items-center ${settings[item.key] ? 'bg-[#E91E63] dark:bg-[#C2185B] justify-end' : 'bg-black/20 dark:bg-gray-700 justify-start'}`}
                aria-label={settings[item.key] ? 'إيقاف' : 'تفعيل'}
              >
                <span className="w-6 h-6 rounded-full bg-white shadow mx-1" />
              </button>
            </div>
          ))}
        </div>
      </ResponsiveCard>

      {/* Preferences Section */}
      <ResponsiveCard className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-[#E91E63] dark:text-[#C2185B]" />
          <h2 className="text-base sm:text-lg font-bold text-black dark:text-white">تفضيلات العرض</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-black dark:text-gray-300">اللغة</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-4 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 min-h-[44px]"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-black dark:text-gray-300">المنطقة الزمنية</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-4 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 min-h-[44px]"
            >
              <option value="Asia/Riyadh">الرياض (GMT+3)</option>
              <option value="Asia/Dubai">دبي (GMT+4)</option>
              <option value="Asia/Kuwait">الكويت (GMT+3)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-black dark:text-gray-300">العملة</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full px-4 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 min-h-[44px]"
            >
              <option value="SAR">ريال سعودي (SAR)</option>
              <option value="AED">درهم إماراتي (AED)</option>
              <option value="KWD">دينار كويتي (KWD)</option>
            </select>
          </div>
        </div>
      </ResponsiveCard>

      {/* Security Section */}
      <ResponsiveCard className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#E91E63] dark:text-[#C2185B]" />
          <h2 className="text-base sm:text-lg font-bold text-black dark:text-white">الأمان</h2>
        </div>
        <div className="space-y-3">
          <button className="w-full text-right px-4 py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 min-h-[44px] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] text-black dark:text-white">
            تغيير كلمة المرور
          </button>
          <button className="w-full text-right px-4 py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 min-h-[44px] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] text-black dark:text-white">
            تفعيل المصادقة الثنائية (2FA)
          </button>
        </div>
      </ResponsiveCard>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-all duration-300 min-h-[44px] shadow-sm"
        >
          <Save className="w-4 h-4" />
          حفظ التغييرات
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-[#F44336] dark:bg-[#D32F2F] text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-[#D32F2F] dark:hover:bg-[#C62828] transition-all duration-300 min-h-[44px] shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}

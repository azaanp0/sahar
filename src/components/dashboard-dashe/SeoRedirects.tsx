import React, { useState, useCallback } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import type { SeoRedirect } from '@/lib/dashboard-dashe/db';
import {
  Link2, Settings, Plus, Trash2, HelpCircle,
  BarChart, Save, Globe, Check
} from 'lucide-react';
import { ResponsiveCard } from './ResponsiveCard';
import { TableWrapper } from './TableWrapper';

export default function SeoRedirects() {
  const [redirects, setRedirects] = useState<SeoRedirect[]>(db.getRedirects());
  const [newFromUrl, setNewFromUrl] = useState('');
  const [newToUrl, setNewToUrl] = useState('');
  const [newType, setNewType] = useState<SeoRedirect['type']>('301');
  
  // Theme settings store the robots.txt and Pixel IDs
  const [theme, setTheme] = useState(db.getTheme());
  const [robotsTxt, setRobotsTxt] = useState(theme.robotsTxt);
  const [ga4Id, setGa4Id] = useState(theme.ga4Id);
  const [metaPixelId, setMetaPixelId] = useState(theme.metaPixelId);
  const [snapPixelId, setSnapPixelId] = useState(theme.snapPixelId);

  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'redirects' | 'robots' | 'pixels'>('redirects');

  const showNotification = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  }, []);

  const handleAddRedirect = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newFromUrl.startsWith('/')) {
      alert('يجب أن يبدأ الرابط القديم بشرطة مائلة مثل: /old-page');
      return;
    }
    if (newType !== '410' && !newToUrl) {
      alert('الرجاء إدخال الرابط الجديد للمستهدف');
      return;
    }
    if (newToUrl && !newToUrl.startsWith('/') && !newToUrl.startsWith('http')) {
      alert('يجب أن يبدأ الرابط الجديد بشرطة مائلة / أو رابط ويب كامل http');
      return;
    }

    const newRedirect: SeoRedirect = {
      id: `RED_${Date.now()}`,
      fromUrl: newFromUrl,
      toUrl: newType === '410' ? '' : newToUrl,
      type: newType,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newRedirect, ...redirects];
    setRedirects(updated);
    db.saveRedirects(updated);
    
    // Clear form
    setNewFromUrl('');
    setNewToUrl('');
    setNewType('301');
    showNotification('تم إضافة تحويل SEO جديد بنجاح!');
  }, [newFromUrl, newToUrl, newType, redirects, showNotification]);

  const handleDeleteRedirect = useCallback((id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا التحويل؟')) {
      const updated = redirects.filter(r => r.id !== id);
      setRedirects(updated);
      db.saveRedirects(updated);
      showNotification('تم حذف التحويل بنجاح.');
    }
  }, [redirects, showNotification]);

  const toggleRedirectStatus = useCallback((id: string) => {
    const updated = redirects.map(r => {
      if (r.id === id) return { ...r, isActive: !r.isActive };
      return r;
    });
    setRedirects(updated);
    db.saveRedirects(updated);
    showNotification('تم تحديث حالة التحويل.');
  }, [redirects, showNotification]);

  const handleSaveRobots = useCallback(() => {
    const updatedTheme = { ...theme, robotsTxt };
    setTheme(updatedTheme);
    db.saveTheme(updatedTheme);
    showNotification('تم حفظ ملف robots.txt بنجاح!');
  }, [theme, robotsTxt, showNotification]);

  const handleSavePixels = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const updatedTheme = { ...theme, ga4Id, metaPixelId, snapPixelId };
    setTheme(updatedTheme);
    db.saveTheme(updatedTheme);
    showNotification('تم تحديث أكواد التحليلات والبيكسل بنجاح!');
  }, [theme, ga4Id, metaPixelId, snapPixelId, showNotification]);

  return (
    <div className="space-y-3 sm:space-y-6 overflow-hidden">
      {/* Page Header */}
      <ResponsiveCard className="p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-base sm:text-2xl font-bold text-black dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 sm:w-7 sm:h-7 text-[#E91E63] dark:text-[#C2185B]" />
            إدارة تهيئة محركات البحث (SEO) والتحويلات
          </h1>
          <p className="text-black dark:text-gray-300 text-[10px] sm:text-sm mt-0.5 sm:mt-1">
            إدارة تحويلات الروابط المكسورة، وتعديل ملف الفهرسة robots.txt، وتكامل بيكسل وسائل التواصل
          </p>
        </div>
      </ResponsiveCard>

      {message && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 sm:px-4 py-2 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 animate-fade-in text-xs sm:text-sm">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="font-semibold">{message}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6">

        {/* Left Side: Navigation Links & Forms (3 Columns) */}
        <div className="lg:col-span-3 space-y-2">
          <ResponsiveCard className="p-2 sm:p-3 space-y-1">
            <button
              onClick={() => setActiveTab('redirects')}
              data-tour="seo-tab-redirects"
              aria-label="روابط التحويل"
              className={`w-full text-right px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-2 sm:gap-2.5 transition-all duration-300 ease min-h-[44px] ${
                activeTab === 'redirects'
                  ? 'bg-[#E91E63] dark:bg-[#C2185B] text-white shadow-sm'
                  : 'text-black dark:text-gray-300 hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)]'
              }`}
            >
              <Link2 className="w-4 h-4 sm:w-4 sm:h-4" />
              روابط التحويل (301 / 302)
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              aria-label="ملف الفهرسة"
              className={`w-full text-right px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-2 sm:gap-2.5 transition-all duration-300 ease min-h-[44px] ${
                activeTab === 'robots'
                  ? 'bg-[#E91E63] dark:bg-[#C2185B] text-white shadow-sm'
                  : 'text-black dark:text-gray-300 hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)]'
              }`}
            >
              <Settings className="w-4 h-4 sm:w-4 sm:h-4" />
              ملف الفهرسة (robots.txt)
            </button>
            <button
              onClick={() => setActiveTab('pixels')}
              aria-label="أكواد التتبع والبيكسل"
              className={`w-full text-right px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-2 sm:gap-2.5 transition-all duration-300 ease min-h-[44px] ${
                activeTab === 'pixels'
                  ? 'bg-[#E91E63] dark:bg-[#C2185B] text-white shadow-sm'
                  : 'text-black dark:text-gray-300 hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)]'
              }`}
            >
              <BarChart className="w-4 h-4 sm:w-4 sm:h-4" />
              أكواد التتبع والبيكسل
            </button>
          </ResponsiveCard>

          <ResponsiveCard className="bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] p-2 sm:p-4 text-[10px] sm:text-[11px] text-black dark:text-gray-300 leading-relaxed space-y-1.5 sm:space-y-2">
            <h4 className="font-bold flex items-center gap-1 sm:gap-1.5 text-black dark:text-white">
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              نصائح محركات البحث:
            </h4>
            <p className="text-[9px] sm:text-[11px]">
              • استخدم <b>301 Permanent</b> لتغيير رابط منتج قديم نهائياً دون فقدان الأرشفة.
            </p>
            <p className="text-[9px] sm:text-[11px]">
              • استخدم <b>410 Gone</b> لتخبير جوجل أن المنتج تم حذفه تماماً ولن يعود مجدداً.
            </p>
            <p className="text-[9px] sm:text-[11px]">
              • تأكد من ربط بيكسل سناب شات وفيس بوك لتتبع عمليات الشراء وقياس أداء إعلانات متجر سحر.
            </p>
          </ResponsiveCard>
        </div>

        {/* Right Side: Tab Contents (9 Columns) */}
        <div className="lg:col-span-9 space-y-3 sm:space-y-6">

          {/* Tab 1: URL Redirects Manager */}
          {activeTab === 'redirects' && (
            <div className="space-y-3 sm:space-y-6">
              {/* Form to Add New Redirect */}
              <ResponsiveCard className="p-4 sm:p-6">
                <h3 className="text-xs sm:text-sm font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-1 sm:gap-1.5">
                  <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#E91E63] dark:text-[#C2185B]" />
                  إضافة توجيه رابط جديد
                </h3>

                <form onSubmit={handleAddRedirect} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-end">
                  <div className="sm:col-span-1.5">
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-900 dark:text-gray-300 mb-1 sm:mb-1.5">الرابط القديم (مثال: /old-shampoo)</label>
                    <input
                      type="text"
                      required
                      placeholder="/old-path"
                      value={newFromUrl}
                      onChange={(e) => setNewFromUrl(e.target.value)}
                      data-tour="seo-from-input"
                      className="w-full px-2 sm:px-3 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-[10px] sm:text-xs bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] text-left transition-all duration-300 ease min-h-[44px]"
                    />
                  </div>

                  <div className="sm:col-span-1.5">
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-900 dark:text-gray-300 mb-1 sm:mb-1.5">الرابط الجديد / المستهدف</label>
                    <input
                      type="text"
                      required={newType !== '410'}
                      disabled={newType === '410'}
                      placeholder={newType === '410' ? 'محذوف نهائياً (410)' : '/new-path-or-url'}
                      value={newToUrl}
                      onChange={(e) => setNewToUrl(e.target.value)}
                      data-tour="seo-to-input"
                      className="w-full px-2 sm:px-3 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-[10px] sm:text-xs bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] text-left disabled:bg-[rgba(233,30,99,0.08)] dark:disabled:bg-[rgba(194,24,91,0.15)] disabled:text-black dark:disabled:text-gray-400 transition-all duration-300 ease min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-900 dark:text-gray-300 mb-1 sm:mb-1.5">نوع التوجيه</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as SeoRedirect['type'])}
                      aria-label="نوع التوجيه"
                      className="w-full px-2 sm:px-3 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-[10px] sm:text-xs bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] min-h-[44px]"
                    >
                      <option value="301">301 (دائم)</option>
                      <option value="302">302 (مؤقت)</option>
                      <option value="410">410 (محذوف نهائياً)</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      data-tour="seo-add-button"
                      aria-label="إضافة الرابط"
                      className="w-full bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] text-white font-bold py-2.5 sm:py-2 px-3 sm:px-4 rounded-xl text-[10px] sm:text-xs transition-all shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 duration-300 ease min-h-[44px]"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      إضافة الرابط
                    </button>
                  </div>
                </form>
              </ResponsiveCard>

              {/* Redirects List Table */}
              <ResponsiveCard className="overflow-hidden p-0">
                <div className="p-3 sm:p-5 border-b border-[#E91E63] flex justify-between items-center bg-[rgba(233,30,99,0.08)]">
                  <span className="text-[10px] sm:text-xs font-bold text-black">قائمة روابط التحويل النشطة ({redirects.length})</span>
                  <span className="text-[9px] sm:text-[10px] text-black">تم التحديث التلقائي لمحرك البحث</span>
                </div>

                <TableWrapper>
                  <table className="w-full text-right text-[10px] sm:text-xs min-w-[600px] sm:min-w-[700px]">
                    <thead>
                      <tr className="bg-[rgba(233,30,99,0.08)] text-black border-b border-[#E91E63]">
                        <th className="p-2 sm:p-4 font-bold whitespace-nowrap">الرابط المكسور (من)</th>
                        <th className="p-2 sm:p-4 font-bold whitespace-nowrap">الرابط الموجه إليه (إلى)</th>
                        <th className="p-2 sm:p-4 font-bold text-center whitespace-nowrap">نوع التحويل</th>
                        <th className="p-2 sm:p-4 font-bold text-center whitespace-nowrap">تاريخ الإنشاء</th>
                        <th className="p-2 sm:p-4 font-bold text-center whitespace-nowrap">الحالة</th>
                        <th className="p-2 sm:p-4 font-bold text-center whitespace-nowrap">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E91E63]">
                      {redirects.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center p-6 sm:p-8 text-black font-semibold text-[10px] sm:text-xs">
                            لا توجد أي تحويلات روابط مكسورة حالياً
                          </td>
                        </tr>
                      ) : (
                        redirects.map((r) => (
                          <tr key={r.id} className="hover:bg-[rgba(233,30,99,0.08)] transition-all duration-300 ease">
                            <td className="p-2 sm:p-4 font-semibold text-black font-mono text-left" dir="ltr">{r.fromUrl}</td>
                            <td className="p-2 sm:p-4 text-black font-mono text-left" dir="ltr">
                              {r.type === '410' ? (
                                <span className="text-red-500 font-sans text-[9px] sm:text-xs">❌ محذوف نهائياً (Gone)</span>
                              ) : (
                                r.toUrl
                              )}
                            </td>
                            <td className="p-2 sm:p-4 text-center">
                              <span className={`px-1.5 sm:px-2 py-0.5 rounded-full font-bold text-[9px] sm:text-[9px] ${
                                r.type === '301' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                r.type === '302' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                'bg-red-50 text-red-700 border border-red-200'
                              }`}>
                                {r.type === '301' ? '301 دائم' : r.type === '302' ? '302 مؤقت' : '410 محذوف'}
                              </span>
                            </td>
                            <td className="p-2 sm:p-4 text-center text-black font-mono text-[9px] sm:text-xs">{r.createdAt}</td>
                            <td className="p-2 sm:p-4 text-center">
                              <button
                                onClick={() => toggleRedirectStatus(r.id)}
                                className={`px-1.5 sm:px-2.5 py-0.5 rounded-full font-bold text-[9px] sm:text-[9px] transition-all ${
                                  r.isActive
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-[rgba(233,30,99,0.08)] text-black hover:bg-[rgba(233,30,99,0.15)]'
                                }`}
                              >
                                {r.isActive ? 'نشط' : 'معطل'}
                              </button>
                            </td>
                            <td className="p-2 sm:p-4 text-center">
                              <button
                                onClick={() => handleDeleteRedirect(r.id)}
                                className="p-1 sm:p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                title="حذف التحويل"
                              >
                                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </TableWrapper>
              </ResponsiveCard>
            </div>
          )}

          {/* Tab 2: Robots.txt Editor */}
          {activeTab === 'robots' && (
            <ResponsiveCard className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-black">تعديل ملف التحكم بالفهرسة (robots.txt)</h3>
                  <p className="text-[10px] sm:text-[11px] text-black mt-0.5 sm:mt-1">يتحكم هذا الملف في الصفحات التي يسمح لبرامج جوجل الزحف إليها وفهرستها</p>
                </div>
                <button
                  onClick={handleSaveRobots}
                  aria-label="حفظ الملف"
                  className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2.5 bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold rounded-xl text-[10px] sm:text-xs transition-all shadow-sm duration-300 ease min-h-[44px]"
                >
                  <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  حفظ الملف
                </button>
              </div>

              <div className="border border-[#E91E63] rounded-xl overflow-hidden shadow-sm">
                <textarea
                  value={robotsTxt}
                  onChange={(e) => setRobotsTxt(e.target.value)}
                  rows={8}
                  aria-label="محتوى ملف robots.txt"
                  className="w-full p-3 sm:p-4 font-mono text-[10px] sm:text-xs bg-[rgba(233,30,99,0.08)] text-black focus:outline-none text-left transition-all duration-300 ease"
                  dir="ltr"
                  placeholder="User-agent: *..."
                />
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-black bg-[rgba(233,30,99,0.08)] p-2 sm:p-3 rounded-xl border border-[#E91E63] transition-all duration-300 ease">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" />
                <span>سيتم تحديث الملف تلقائياً في المسار الرئيسي للمتجر: <code>https://sahar.sa/robots.txt</code></span>
              </div>
            </ResponsiveCard>
          )}

          {/* Tab 3: Social Analytics Pixel IDs */}
          {activeTab === 'pixels' && (
            <ResponsiveCard className="p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-bold text-black mb-1.5 sm:mb-2">أكواد تتبع الإعلانات والتحليلات</h3>
              <p className="text-[10px] sm:text-[11px] text-black mb-4 sm:mb-6">قم بربط متجرك مع أدوات قياس الإعلانات بشكل مباشر دون تدخل برمجي</p>

              <form onSubmit={handleSavePixels} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">

                  {/* Google Analytics 4 */}
                  <div className="bg-[rgba(233,30,99,0.08)] p-3 sm:p-4 rounded-xl border border-[#E91E63] space-y-1.5 sm:space-y-2 transition-all duration-300 ease">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs font-bold text-black">إحصائيات جوجل (GA4)</span>
                      <span className="text-[9px] sm:text-[9px] text-orange-600 font-bold bg-orange-50 px-1.5 sm:px-2 py-0.5 rounded border border-orange-200">Google</span>
                    </div>
                    <label className="block text-[9px] sm:text-[10px] text-black">رقم قياس الموقع (Measurement ID)</label>
                    <input
                      type="text"
                      placeholder="G-XXXXXXXXXX"
                      value={ga4Id}
                      onChange={(e) => setGa4Id(e.target.value)}
                      className="w-full px-2 sm:px-3 py-2.5 border border-[#E91E63] rounded-[14px] text-[10px] sm:text-xs text-left placeholder:text-black font-mono transition-all duration-300 ease min-h-[44px]"
                      dir="ltr"
                    />
                  </div>

                  {/* Meta Pixel */}
                  <div className="bg-[rgba(233,30,99,0.08)] p-3 sm:p-4 rounded-xl border border-[#E91E63] space-y-1.5 sm:space-y-2 transition-all duration-300 ease">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs font-bold text-black">بيكسل فيسبوك (Meta)</span>
                      <span className="text-[9px] sm:text-[9px] text-blue-600 font-bold bg-blue-50 px-1.5 sm:px-2 py-0.5 rounded border border-blue-200">Meta</span>
                    </div>
                    <label className="block text-[9px] sm:text-[10px] text-black">معرف البيكسل (Pixel ID)</label>
                    <input
                      type="text"
                      placeholder="123456789012345"
                      value={metaPixelId}
                      onChange={(e) => setMetaPixelId(e.target.value)}
                      className="w-full px-2 sm:px-3 py-2.5 border border-[#E91E63] rounded-[14px] text-[10px] sm:text-xs text-left placeholder:text-black font-mono transition-all duration-300 ease min-h-[44px]"
                      dir="ltr"
                    />
                  </div>

                  {/* Snapchat Pixel */}
                  <div className="bg-[rgba(233,30,99,0.08)] p-3 sm:p-4 rounded-xl border border-[#E91E63] space-y-1.5 sm:space-y-2 transition-all duration-300 ease">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs font-bold text-black">بيكسل سناب شات</span>
                      <span className="text-[9px] sm:text-[9px] text-yellow-600 font-bold bg-yellow-50 px-1.5 sm:px-2 py-0.5 rounded border border-yellow-200">Snapchat</span>
                    </div>
                    <label className="block text-[9px] sm:text-[10px] text-black">معرف البيكسل (Pixel ID)</label>
                    <input
                      type="text"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx..."
                      value={snapPixelId}
                      onChange={(e) => setSnapPixelId(e.target.value)}
                      className="w-full px-2 sm:px-3 py-2.5 border border-[#E91E63] rounded-[14px] text-[10px] sm:text-xs text-left placeholder:text-black font-mono transition-all duration-300 ease min-h-[44px]"
                      dir="ltr"
                    />
                  </div>

                </div>

                <div className="flex justify-end pt-3 sm:pt-4 border-t border-[#E91E63]">
                  <button
                    type="submit"
                    aria-label="حفظ إعدادات الأكواد"
                    className="flex items-center gap-1 sm:gap-1.5 px-4 sm:px-6 py-2.5 bg-[#E91E63] hover:bg-[#C2185B] text-white font-bold rounded-xl text-[10px] sm:text-xs transition-all shadow-sm duration-300 ease min-h-[44px]"
                  >
                    <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    حفظ إعدادات الأكواد
                  </button>
                </div>
              </form>
            </ResponsiveCard>
          )}

        </div>
      </div>
    </div>
  );
}

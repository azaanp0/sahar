import { useState } from 'react';
import { db } from '../lib/db';
import type { SeoRedirect } from '../lib/db';
import {
  Link2, Settings, Plus, Trash2, HelpCircle,
  BarChart, Save, Globe, Check
} from 'lucide-react';

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

  const showNotification = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddRedirect = (e: React.FormEvent) => {
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
  };

  const handleDeleteRedirect = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا التحويل؟')) {
      const updated = redirects.filter(r => r.id !== id);
      setRedirects(updated);
      db.saveRedirects(updated);
      showNotification('تم حذف التحويل بنجاح.');
    }
  };

  const toggleRedirectStatus = (id: string) => {
    const updated = redirects.map(r => {
      if (r.id === id) return { ...r, isActive: !r.isActive };
      return r;
    });
    setRedirects(updated);
    db.saveRedirects(updated);
    showNotification('تم تحديث حالة التحويل.');
  };

  const handleSaveRobots = () => {
    const updatedTheme = { ...theme, robotsTxt };
    setTheme(updatedTheme);
    db.saveTheme(updatedTheme);
    showNotification('تم حفظ ملف robots.txt بنجاح!');
  };

  const handleSavePixels = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTheme = { ...theme, ga4Id, metaPixelId, snapPixelId };
    setTheme(updatedTheme);
    db.saveTheme(updatedTheme);
    showNotification('تم تحديث أكواد التحليلات والبيكسل بنجاح!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-purple-950 flex items-center gap-2">
            <Globe className="w-7 h-7 text-pink-500" />
            إدارة تهيئة محركات البحث (SEO) والتحويلات
          </h1>
          <p className="text-purple-600 text-sm mt-1">
            إدارة تحويلات الروابط المكسورة، وتعديل ملف الفهرسة robots.txt، وتكامل بيكسل وسائل التواصل
          </p>
        </div>
      </div>

      {message && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="font-semibold text-xs">{message}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Navigation Links & Forms (3 Columns) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white p-3 rounded-2xl border border-purple-100 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('redirects')}
              data-tour="seo-tab-redirects"
              className={`w-full text-right px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                activeTab === 'redirects'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Link2 className="w-4 h-4" />
              روابط التحويل (301 / 302)
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`w-full text-right px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                activeTab === 'robots'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              ملف الفهرسة (robots.txt)
            </button>
            <button
              onClick={() => setActiveTab('pixels')}
              className={`w-full text-right px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                activeTab === 'pixels'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
            >
              <BarChart className="w-4 h-4" />
              أكواد التتبع والبيكسل
            </button>
          </div>

          <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl text-[11px] text-purple-700 leading-relaxed space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-purple-900">
              <HelpCircle className="w-4 h-4" />
              نصائح محركات البحث:
            </h4>
            <p>
              • استخدم <b>301 Permanent</b> لتغيير رابط منتج قديم نهائياً دون فقدان الأرشفة.
            </p>
            <p>
              • استخدم <b>410 Gone</b> لتخبير جوجل أن المنتج تم حذفه تماماً ولن يعود مجدداً.
            </p>
            <p>
              • تأكد من ربط بيكسل سناب شات وفيس بوك لتتبع عمليات الشراء وقياس أداء إعلانات متجر سحر.
            </p>
          </div>
        </div>

        {/* Right Side: Tab Contents (9 Columns) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Tab 1: URL Redirects Manager */}
          {activeTab === 'redirects' && (
            <div className="space-y-6">
              {/* Form to Add New Redirect */}
              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
                <h3 className="text-sm font-bold text-purple-950 mb-4 flex items-center gap-1.5">
                  <Plus className="w-4.5 h-4.5 text-pink-500" />
                  إضافة توجيه رابط جديد
                </h3>
                
                <form onSubmit={handleAddRedirect} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-1.5">
                    <label className="block text-xs font-bold text-purple-900 mb-1.5">الرابط القديم (مثال: /old-shampoo)</label>
                    <input
                      type="text"
                      required
                      placeholder="/old-path"
                      value={newFromUrl}
                      onChange={(e) => setNewFromUrl(e.target.value)}
                      data-tour="seo-from-input"
                      className="w-full px-3 py-2 border border-purple-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-200 text-left"
                    />
                  </div>

                  <div className="md:col-span-1.5">
                    <label className="block text-xs font-bold text-purple-900 mb-1.5">الرابط الجديد / المستهدف</label>
                    <input
                      type="text"
                      required={newType !== '410'}
                      disabled={newType === '410'}
                      placeholder={newType === '410' ? 'محذوف نهائياً (410)' : '/new-path-or-url'}
                      value={newToUrl}
                      onChange={(e) => setNewToUrl(e.target.value)}
                      data-tour="seo-to-input"
                      className="w-full px-3 py-2 border border-purple-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-200 text-left disabled:bg-purple-50/50 disabled:text-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-900 mb-1.5">نوع التوجيه</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as SeoRedirect['type'])}
                      className="w-full px-3 py-2 border border-purple-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-200"
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
                      className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة الرابط
                    </button>
                  </div>
                </form>
              </div>

              {/* Redirects List Table */}
              <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-purple-50 flex justify-between items-center bg-purple-50/20">
                  <span className="text-xs font-bold text-purple-950">قائمة روابط التحويل النشطة ({redirects.length})</span>
                  <span className="text-[10px] text-purple-500">تم التحديث التلقائي لمحرك البحث</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-purple-50/40 text-purple-700 border-b border-purple-100">
                        <th className="p-4 font-bold">الرابط المكسور (من)</th>
                        <th className="p-4 font-bold">الرابط الموجه إليه (إلى)</th>
                        <th className="p-4 font-bold text-center">نوع التحويل</th>
                        <th className="p-4 font-bold text-center">تاريخ الإنشاء</th>
                        <th className="p-4 font-bold text-center">الحالة</th>
                        <th className="p-4 font-bold text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50">
                      {redirects.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center p-8 text-purple-400 font-semibold">
                            لا توجد أي تحويلات روابط مكسورة حالياً
                          </td>
                        </tr>
                      ) : (
                        redirects.map((r) => (
                          <tr key={r.id} className="hover:bg-purple-50/20 transition-all">
                            <td className="p-4 font-semibold text-purple-950 font-mono text-left" dir="ltr">{r.fromUrl}</td>
                            <td className="p-4 text-purple-600 font-mono text-left" dir="ltr">
                              {r.type === '410' ? (
                                <span className="text-red-500 font-sans text-xs">❌ محذوف نهائياً (Gone)</span>
                              ) : (
                                r.toUrl
                              )}
                            </td>
                            <td className="p-4 text-center">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                                r.type === '301' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                r.type === '302' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                'bg-red-50 text-red-700 border border-red-200'
                              }`}>
                                {r.type === '301' ? '301 دائم' : r.type === '302' ? '302 مؤقت' : '410 محذوف'}
                              </span>
                            </td>
                            <td className="p-4 text-center text-purple-500 font-mono">{r.createdAt}</td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => toggleRedirectStatus(r.id)}
                                className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] transition-all ${
                                  r.isActive 
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                }`}
                              >
                                {r.isActive ? 'نشط' : 'معطل'}
                              </button>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteRedirect(r.id)}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                title="حذف التحويل"
                              >
                                <Trash2 className="w-4 h-4 mx-auto" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Robots.txt Editor */}
          {activeTab === 'robots' && (
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-purple-950">تعديل ملف التحكم بالفهرسة (robots.txt)</h3>
                  <p className="text-[11px] text-purple-500 mt-1">يتحكم هذا الملف في الصفحات التي يسمح لبرامج جوجل الزحف إليها وفهرستها</p>
                </div>
                <button
                  onClick={handleSaveRobots}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs transition-all shadow-md"
                >
                  <Save className="w-4 h-4" />
                  حفظ الملف
                </button>
              </div>

              <div className="border border-purple-100 rounded-2xl overflow-hidden shadow-inner">
                <textarea
                  value={robotsTxt}
                  onChange={(e) => setRobotsTxt(e.target.value)}
                  rows={10}
                  className="w-full p-4 font-mono text-xs bg-purple-50/30 text-purple-950 focus:outline-none text-left"
                  dir="ltr"
                  placeholder="User-agent: *..."
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-purple-600 bg-purple-50/50 p-3 rounded-xl border border-purple-100/50">
                <Check className="w-3.5 h-3.5 text-purple-700" />
                <span>سيتم تحديث الملف تلقائياً في المسار الرئيسي للمتجر: <code>https://sahar.sa/robots.txt</code></span>
              </div>
            </div>
          )}

          {/* Tab 3: Social Analytics Pixel IDs */}
          {activeTab === 'pixels' && (
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <h3 className="text-sm font-bold text-purple-950 mb-2">أكواد تتبع الإعلانات والتحليلات</h3>
              <p className="text-[11px] text-purple-500 mb-6">قم بربط متجرك مع أدوات قياس الإعلانات بشكل مباشر دون تدخل برمجي</p>

              <form onSubmit={handleSavePixels} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Google Analytics 4 */}
                  <div className="bg-purple-50/40 p-4 rounded-2xl border border-purple-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-purple-950">إحصائيات جوجل (GA4)</span>
                      <span className="text-[9px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">Google</span>
                    </div>
                    <label className="block text-[10px] text-purple-600">رقم قياس الموقع (Measurement ID)</label>
                    <input
                      type="text"
                      placeholder="G-XXXXXXXXXX"
                      value={ga4Id}
                      onChange={(e) => setGa4Id(e.target.value)}
                      className="w-full px-3 py-1.5 border border-purple-200 rounded-lg text-xs text-left placeholder:text-purple-300 font-mono"
                      dir="ltr"
                    />
                  </div>

                  {/* Meta Pixel */}
                  <div className="bg-purple-50/40 p-4 rounded-2xl border border-purple-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-purple-950">بيكسل فيسبوك (Meta)</span>
                      <span className="text-[9px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Meta</span>
                    </div>
                    <label className="block text-[10px] text-purple-600">معرف البيكسل (Pixel ID)</label>
                    <input
                      type="text"
                      placeholder="123456789012345"
                      value={metaPixelId}
                      onChange={(e) => setMetaPixelId(e.target.value)}
                      className="w-full px-3 py-1.5 border border-purple-200 rounded-lg text-xs text-left placeholder:text-purple-300 font-mono"
                      dir="ltr"
                    />
                  </div>

                  {/* Snapchat Pixel */}
                  <div className="bg-purple-50/40 p-4 rounded-2xl border border-purple-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-purple-950">بيكسل سناب شات</span>
                      <span className="text-[9px] text-yellow-600 font-bold bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">Snapchat</span>
                    </div>
                    <label className="block text-[10px] text-purple-600">معرف البيكسل (Pixel ID)</label>
                    <input
                      type="text"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx..."
                      value={snapPixelId}
                      onChange={(e) => setSnapPixelId(e.target.value)}
                      className="w-full px-3 py-1.5 border border-purple-200 rounded-lg text-xs text-left placeholder:text-purple-300 font-mono"
                      dir="ltr"
                    />
                  </div>

                </div>

                <div className="flex justify-end pt-4 border-t border-purple-50">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-l from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-bold rounded-xl text-xs transition-all shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    حفظ إعدادات الأكواد
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

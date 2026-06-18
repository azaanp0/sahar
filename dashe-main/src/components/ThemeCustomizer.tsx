import { useState, useEffect } from 'react';
import { db } from '../lib/db';
import type { ThemeSettings, Banner } from '../lib/db';
import {
  Palette, Image as ImageIcon, Layout, Store, Save, RefreshCw,
  Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Eye, Laptop, Smartphone
} from 'lucide-react';

export default function ThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeSettings>(db.getTheme());
  const [activeTab, setActiveTab] = useState<'general' | 'banners' | 'sections'>('general');
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [message, setMessage] = useState('');

  // Preset Colors
  const presetPrimaryColors = [
    { name: 'لافندر ساحر', value: '#C6AAD0' },
    { name: 'وردي أنثوي', value: '#E91E8C' },
    { name: 'أرجواني غامق', value: '#4A2560' },
    { name: 'نيود طبيعي', value: '#E6C5B3' },
    { name: 'مرجاني مشرق', value: '#FF6F61' },
    { name: 'أخضر نعناعي', value: '#A8DADC' },
  ];

  const presetAccentColors = [
    { name: 'وردي فوشيا', value: '#E91E8C' },
    { name: 'ذهبي برّاق', value: '#D4AF37' },
    { name: 'أرجواني ملكي', value: '#6C5CE7' },
    { name: 'برتقالي ناعم', value: '#FAB1A0' },
    { name: 'تيل بحري', value: '#00CEC9' },
  ];

  const fonts = [
    { name: 'Cairo (عربي)', value: 'Cairo' },
    { name: 'Inter (English)', value: 'Inter' },
  ];

  useEffect(() => {
    // If selected banner doesn't exist, select the first one
    if (theme.banners.length > 0 && !selectedBannerId) {
      setSelectedBannerId(theme.banners[0].id);
    }
  }, [theme.banners]);

  const handleSave = () => {
    db.saveTheme(theme);
    setMessage('تم حفظ إعدادات المظهر بنجاح!');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين المظهر للمظهر الافتراضي؟')) {
      localStorage.removeItem('sahar_theme');
      const defaultTheme = db.getTheme();
      setTheme(defaultTheme);
      setSelectedBannerId(defaultTheme.banners[0]?.id || null);
    }
  };

  const updateBanner = (id: string, updates: Partial<Banner>) => {
    const updatedBanners = theme.banners.map(b => {
      if (b.id === id) {
        return { ...b, ...updates };
      }
      return b;
    });
    setTheme({ ...theme, banners: updatedBanners });
  };

  const deleteBanner = (id: string) => {
    if (theme.banners.length <= 1) {
      alert('يجب أن تحتوي المنصة على بانر إعلاني واحد على الأقل.');
      return;
    }
    const updatedBanners = theme.banners.filter(b => b.id !== id);
    setTheme({ ...theme, banners: updatedBanners });
    setSelectedBannerId(updatedBanners[0].id);
  };

  const addBanner = () => {
    const newBanner: Banner = {
      id: `BAN_${Date.now()}`,
      imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80',
      titleAr: 'عنوان البانر الجديد',
      subtitleAr: 'اضغط هنا لكتابة النص الفرعي',
      ctaText: 'تسوقي الآن',
      ctaLink: '/products',
      color: theme.primaryColor
    };
    setTheme({ ...theme, banners: [...theme.banners, newBanner] });
    setSelectedBannerId(newBanner.id);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...theme.sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    // Swap
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setTheme({ ...theme, sectionOrder: newOrder });
  };

  const sectionLabels: Record<string, string> = {
    hero: 'البانر الإعلاني الرئيسي (Hero Carousel)',
    categories: 'أقسام التسوق الدائرية (Categories)',
    offers: 'شبكة العروض الحصرية (Offers Grid)',
    brands: 'شركاء النجاح / الماركات العالمية (Brands)',
    featured: 'المنتجات الأكثر مبيعاً (Best Sellers)',
    skintype: 'التسوق حسب نوع البشرة (Skin Type Selector)',
    korean: 'العناية الكورية الفاخرة (K-Beauty Zone)',
    makeup: 'مستحضرات التجميل والمكياج (Makeup Hotlist)',
    perfume: 'العطور الراقية والمميزة (Perfume Collection)',
  };

  const activeBanner = theme.banners.find(b => b.id === selectedBannerId);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-purple-950 flex items-center gap-2">
            <Palette className="w-7 h-7 text-pink-500" />
            تخصيص هوية المتجر والمظهر
          </h1>
          <p className="text-purple-600 text-sm mt-1">
            قم بتغيير الألوان والشعارات والبنرات وإعادة ترتيب الصفحة الرئيسية بشكل مرئي فوري
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            إعادة تعيين
          </button>
          <button
            onClick={handleSave}
            data-tour="theme-save"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-l from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-medium rounded-xl shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            حفظ التغييرات
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="font-medium">{message}</span>
        </div>
      )}

      {/* Main Grid Layout: Editor on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Editor Controls (7 Columns) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
            
            {/* Control Tabs */}
            <div className="flex border-b border-purple-50 bg-purple-50/50">
              <button
                onClick={() => setActiveTab('general')}
                data-tour="theme-tab-general"
                className={`flex-1 py-4 text-center font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'general'
                    ? 'bg-white border-t-2 border-purple-700 text-purple-950 shadow-sm'
                    : 'text-purple-500 hover:text-purple-700'
                }`}
              >
                <Store className="w-4 h-4" />
                هوية وألوان المتجر
              </button>
              <button
                onClick={() => setActiveTab('banners')}
                className={`flex-1 py-4 text-center font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'banners'
                    ? 'bg-white border-t-2 border-purple-700 text-purple-950 shadow-sm'
                    : 'text-purple-500 hover:text-purple-700'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                البنرات الإعلانية ({theme.banners.length})
              </button>
              <button
                onClick={() => setActiveTab('sections')}
                className={`flex-1 py-4 text-center font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'sections'
                    ? 'bg-white border-t-2 border-purple-700 text-purple-950 shadow-sm'
                    : 'text-purple-500 hover:text-purple-700'
                }`}
              >
                <Layout className="w-4 h-4" />
                ترتيب أقسام الواجهة
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6">
              
              {/* Tab 1: General Identity */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">اسم المتجر (بالعربية)</label>
                    <input
                      type="text"
                      value={theme.storeName}
                      onChange={(e) => setTheme({ ...theme, storeName: e.target.value })}
                      className="w-full px-4 py-2 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">رابط شعار المتجر (Logo URL)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={theme.logoUrl}
                        placeholder="اتركه فارغاً لعرض اسم المتجر كنص افتراضي"
                        onChange={(e) => setTheme({ ...theme, logoUrl: e.target.value })}
                        className="flex-grow px-4 py-2 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 text-left"
                      />
                      {theme.logoUrl && (
                        <div className="w-10 h-10 border border-purple-100 rounded-xl overflow-hidden bg-purple-50 flex items-center justify-center">
                          <img src={theme.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div data-tour="theme-presets">
                    <label className="block text-sm font-semibold text-purple-900 mb-3">اللون الأساسي للمتجر</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {presetPrimaryColors.map(c => (
                        <button
                          key={c.value}
                          onClick={() => setTheme({ ...theme, primaryColor: c.value })}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            theme.primaryColor === c.value
                              ? 'border-purple-800 bg-purple-50 text-purple-900'
                              : 'border-purple-100 bg-white hover:bg-purple-50/50'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.value }}></span>
                          {c.name}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                        className="w-10 h-10 border-0 rounded-lg cursor-pointer p-0"
                      />
                      <input
                        type="text"
                        value={theme.primaryColor}
                        onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                        className="w-32 px-3 py-1.5 border border-purple-100 rounded-xl text-center text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-3">لون أزرار التفاعل والإشعارات (Accent)</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {presetAccentColors.map(c => (
                        <button
                          key={c.value}
                          onClick={() => setTheme({ ...theme, accentColor: c.value })}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            theme.accentColor === c.value
                              ? 'border-purple-800 bg-purple-50 text-purple-900'
                              : 'border-purple-100 bg-white hover:bg-purple-50/50'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.value }}></span>
                          {c.name}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme.accentColor}
                        onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                        className="w-10 h-10 border-0 rounded-lg cursor-pointer p-0"
                      />
                      <input
                        type="text"
                        value={theme.accentColor}
                        onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                        className="w-32 px-3 py-1.5 border border-purple-100 rounded-xl text-center text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">نوع خط الكتابة الأساسي</label>
                    <select
                      value={theme.fontFamily}
                      onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
                      className="w-full px-4 py-2 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      {fonts.map(f => (
                        <option key={f.value} value={f.value}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Tab 2: Banners Carousel */}
              {activeTab === 'banners' && (
                <div className="space-y-6">
                  {/* Banner List Selector */}
                  <div className="flex items-center justify-between border-b border-purple-50 pb-4">
                    <span className="text-sm font-semibold text-purple-900">قائمة البنرات النشطة</span>
                    <button
                      onClick={addBanner}
                      className="flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      إضافة بنر إعلاني
                    </button>
                  </div>

                  <div className="flex gap-2 overflow-x-auto py-1">
                    {theme.banners.map((b, idx) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBannerId(b.id)}
                        className={`flex-shrink-0 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                          selectedBannerId === b.id
                            ? 'border-purple-600 bg-purple-700 text-white'
                            : 'border-purple-100 bg-purple-50 text-purple-800 hover:bg-purple-100/70'
                        }`}
                      >
                        شرائح البانر {idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Banner Form Detail */}
                  {activeBanner && (
                    <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-purple-700">تعديل شريحة الإعلان</span>
                        <button
                          onClick={() => deleteBanner(activeBanner.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          حذف البانر
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-purple-900 mb-1">العنوان الرئيسي (بالعربية)</label>
                        <input
                          type="text"
                          value={activeBanner.titleAr}
                          onChange={(e) => updateBanner(activeBanner.id, { titleAr: e.target.value })}
                          className="w-full px-3 py-1.5 border border-purple-100 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-purple-900 mb-1">النص الفرعي</label>
                        <input
                          type="text"
                          value={activeBanner.subtitleAr}
                          onChange={(e) => updateBanner(activeBanner.id, { subtitleAr: e.target.value })}
                          className="w-full px-3 py-1.5 border border-purple-100 rounded-lg text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-purple-900 mb-1">نص زر التفاعل (CTA)</label>
                          <input
                            type="text"
                            value={activeBanner.ctaText}
                            onChange={(e) => updateBanner(activeBanner.id, { ctaText: e.target.value })}
                            className="w-full px-3 py-1.5 border border-purple-100 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-purple-900 mb-1">رابط زر التفاعل (Link)</label>
                          <input
                            type="text"
                            value={activeBanner.ctaLink}
                            onChange={(e) => updateBanner(activeBanner.id, { ctaLink: e.target.value })}
                            className="w-full px-3 py-1.5 border border-purple-100 rounded-lg text-xs text-left"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-purple-900 mb-1">رابط صورة الخلفية للبانر</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={activeBanner.imageUrl}
                            onChange={(e) => updateBanner(activeBanner.id, { imageUrl: e.target.value })}
                            className="flex-grow px-3 py-1.5 border border-purple-100 rounded-lg text-xs text-left"
                          />
                          <div className="w-8 h-8 rounded-lg overflow-hidden bg-purple-100 border border-purple-200 flex-shrink-0 flex items-center justify-center">
                            <img src={activeBanner.imageUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-purple-900 mb-1">اللون السائد للبانر</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={activeBanner.color}
                            onChange={(e) => updateBanner(activeBanner.id, { color: e.target.value })}
                            className="w-8 h-8 rounded border-0 cursor-pointer p-0"
                          />
                          <input
                            type="text"
                            value={activeBanner.color}
                            onChange={(e) => updateBanner(activeBanner.id, { color: e.target.value })}
                            className="w-24 px-2 py-1 border border-purple-100 rounded text-center text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Frontpage Section Ordering */}
              {activeTab === 'sections' && (
                <div className="space-y-4">
                  <div className="bg-amber-50 text-amber-900 border border-amber-200 p-3 rounded-xl text-xs flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>
                      اسحب أو رتب الأقسام التالية لتعديل شكل الصفحة الرئيسية في المتجر بشكل فوري للمستخدمين.
                    </span>
                  </div>

                  <div className="space-y-2">
                    {theme.sectionOrder.map((sectionName, idx) => (
                      <div
                        key={sectionName}
                        className="flex items-center justify-between p-3.5 bg-white border border-purple-100 rounded-xl hover:border-purple-200 transition-all shadow-sm hover:shadow"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-purple-950">
                            {sectionLabels[sectionName] || sectionName}
                          </span>
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            disabled={idx === 0}
                            onClick={() => moveSection(idx, 'up')}
                            className="p-1.5 rounded-lg border border-purple-50 text-purple-600 hover:bg-purple-50 hover:text-purple-800 disabled:opacity-30 disabled:hover:bg-transparent"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={idx === theme.sectionOrder.length - 1}
                            onClick={() => moveSection(idx, 'down')}
                            className="p-1.5 rounded-lg border border-purple-50 text-purple-600 hover:bg-purple-50 hover:text-purple-800 disabled:opacity-30 disabled:hover:bg-transparent"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Live Preview Viewport (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center px-2">
            <span className="text-sm font-semibold text-purple-900 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-purple-700" />
              المعاينة الحية للمتجر (مباشر)
            </span>
            <div className="flex bg-white rounded-lg border border-purple-100 p-0.5">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-md transition-all ${
                  previewMode === 'desktop' ? 'bg-purple-100 text-purple-950' : 'text-purple-400 hover:text-purple-600'
                }`}
                title="شاشة كمبيوتر"
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-md transition-all ${
                  previewMode === 'mobile' ? 'bg-purple-100 text-purple-950' : 'text-purple-400 hover:text-purple-600'
                }`}
                title="شاشة هاتف محمول"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Device Mock Container */}
          <div className="flex justify-center items-center w-full" data-tour="theme-preview">
            <div
              className={`w-full bg-white transition-all-300 ${
                previewMode === 'mobile' 
                  ? 'max-w-[340px] border-8 border-purple-950 rounded-[32px] h-[580px] shadow-2xl relative' 
                  : 'max-w-full border-2 border-purple-200 rounded-xl h-[580px] shadow-md relative'
              } overflow-hidden flex flex-col`}
              style={{ fontFamily: theme.fontFamily === 'Cairo' ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}
            >
              
              {/* Mobile Status Bar or Browser Top Bar */}
              {previewMode === 'mobile' ? (
                <div className="bg-purple-950 text-white h-6 px-4 flex justify-between items-center text-[10px] select-none">
                  <span>12:00</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40"></span>
                    <span className="w-3 h-2 bg-white rounded-sm"></span>
                  </div>
                </div>
              ) : (
                <div className="bg-purple-50 border-b border-purple-100 h-9 px-4 flex items-center gap-2 select-none text-xs">
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  </div>
                  <div className="bg-white px-3 py-1 rounded border border-purple-100 text-center w-64 text-[10px] mx-auto text-purple-600 truncate flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    https://sahar.sa/store
                  </div>
                </div>
              )}

              {/* Simulated Storefront Header */}
              <div 
                className="shadow-sm border-b border-black/5 flex items-center justify-between px-4 py-3 text-white transition-colors duration-300"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <div className="flex items-center gap-2">
                  {theme.logoUrl ? (
                    <img src={theme.logoUrl} alt="Store Logo" className="h-6 object-contain" />
                  ) : (
                    <span className="font-extrabold text-sm tracking-wide">{theme.storeName}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span>الرئيسية</span>
                  <span>المنتجات</span>
                  <div className="relative">
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white absolute -top-1.5 -right-1.5"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      ٢
                    </div>
                    <span>سلة</span>
                  </div>
                </div>
              </div>

              {/* Simulated Content Area (Scrollable) */}
              <div className="flex-1 overflow-y-auto bg-[#FBF9FD] space-y-4 pb-8 text-xs select-none">
                
                {theme.sectionOrder.map((sectionKey) => {
                  if (sectionKey === 'hero') {
                    return (
                      <div key="preview-hero" className="relative h-32 overflow-hidden bg-purple-900 text-white flex items-center">
                        <img 
                          src={theme.banners[0]?.imageUrl || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80'} 
                          alt="Hero banner" 
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="relative z-10 p-4 space-y-1 max-w-[80%]">
                          <span 
                            className="inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: theme.accentColor }}
                          >
                            جديدنا
                          </span>
                          <h3 className="font-extrabold text-sm leading-tight text-white">
                            {theme.banners[0]?.titleAr || 'عنوان البانر الرئيسي'}
                          </h3>
                          <p className="text-[9px] text-white/80 line-clamp-1">
                            {theme.banners[0]?.subtitleAr || 'النص المساعد هنا'}
                          </p>
                          <button 
                            className="px-2.5 py-1 text-[8px] font-bold rounded-md shadow-sm transition-all"
                            style={{ backgroundColor: theme.accentColor, color: '#FFFFFF' }}
                          >
                            {theme.banners[0]?.ctaText || 'تسوقي الآن'}
                          </button>
                        </div>
                      </div>
                    );
                  }

                  if (sectionKey === 'categories') {
                    return (
                      <div key="preview-categories" className="px-4 py-2 space-y-2">
                        <h4 className="font-bold text-purple-950 text-xs">أقسام التسوق</h4>
                        <div className="flex gap-3 overflow-x-auto pb-1">
                          {['العناية بالبشرة', 'المكياج', 'العطور', 'العناية بالشعر'].map((cat, i) => (
                            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1.5">
                              <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center overflow-hidden">
                                <span className="text-[14px]">🌸</span>
                              </div>
                              <span className="text-[9px] font-semibold text-purple-800">{cat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (sectionKey === 'offers') {
                    return (
                      <div key="preview-offers" className="px-4 py-1">
                        <div 
                          className="p-3 rounded-xl flex items-center justify-between text-white"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          <div>
                            <h4 className="font-bold text-xs">خصومات حصرية تصل إلى ٣٠٪</h4>
                            <p className="text-[9px] opacity-90 mt-0.5">استخدمي كود: SAHAR30</p>
                          </div>
                          <span className="text-xl">🎁</span>
                        </div>
                      </div>
                    );
                  }

                  if (sectionKey === 'featured') {
                    return (
                      <div key="preview-featured" className="px-4 py-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-purple-950 text-xs">الأكثر مبيعاً لدينا</h4>
                          <span className="text-[10px] font-bold text-pink-600">عرض الكل</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: 'مرطب الشفاه الفاخر', price: '45 ر.س', oldPrice: '60 ر.س', img: 'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=200&q=80' },
                            { name: 'كريم مرطب الورد', price: '89 ر.س', oldPrice: null, img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&q=80' }
                          ].map((item, i) => (
                            <div key={i} className="bg-white border border-purple-50 rounded-xl p-2 shadow-sm space-y-1.5 relative">
                              {item.oldPrice && (
                                <span 
                                  className="absolute top-2 left-2 text-[8px] text-white px-1.5 py-0.5 rounded font-bold"
                                  style={{ backgroundColor: theme.accentColor }}
                                >
                                  خصم
                                </span>
                              )}
                              <img src={item.img} alt={item.name} className="w-full h-16 object-cover rounded-lg" />
                              <div className="space-y-0.5">
                                <h5 className="font-bold text-purple-950 text-[10px] truncate">{item.name}</h5>
                                <div className="flex gap-1 items-center">
                                  <span className="font-bold text-purple-800 text-[9px]">{item.price}</span>
                                  {item.oldPrice && (
                                    <span className="text-gray-400 line-through text-[8px]">{item.oldPrice}</span>
                                  )}
                                </div>
                              </div>
                              <button 
                                className="w-full py-1 text-[9px] font-bold rounded-lg text-white transition-all text-center mt-1"
                                style={{ backgroundColor: theme.primaryColor }}
                              >
                                أضيفي للسلة
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (sectionKey === 'brands') {
                    return (
                      <div key="preview-brands" className="px-4 py-2 space-y-1">
                        <h4 className="font-bold text-purple-950 text-xs">أشهر الماركات العالمية</h4>
                        <div className="flex gap-2 justify-between py-1 bg-purple-50/50 p-2 rounded-lg border border-purple-100/50">
                          {['CHANEL', 'MAC', 'Dior', 'Lancôme'].map((brand, i) => (
                            <span key={i} className="font-mono text-[9px] font-bold text-purple-400">{brand}</span>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Default fallback for skins/korean/makeup/perfume
                  return (
                    <div key={`preview-${sectionKey}`} className="px-4 py-2 space-y-2">
                      <div className="flex justify-between items-center border-b border-purple-50 pb-1">
                        <h4 className="font-bold text-purple-950 text-[11px]">
                          {sectionLabels[sectionKey]?.replace(' (Live Preview)', '') || sectionKey}
                        </h4>
                        <span className="text-[9px] text-purple-400">تصفح</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-purple-50/80 text-[10px] text-purple-500 text-center shadow-sm">
                        مجموعة مميزة منتقاة بعناية فائقة
                      </div>
                    </div>
                  );
                })}

              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

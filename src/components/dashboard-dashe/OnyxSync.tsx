import React, { useState, useCallback, useMemo } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import type { OnyxItem, Product } from '@/lib/dashboard-dashe/db';
import { useAppStore } from '@/store/appStore';
import {
  Database, Wifi, WifiOff, RefreshCw, CheckCircle,
  Upload, Search, Settings2
} from 'lucide-react';
import { ResponsiveCard } from './ResponsiveCard';
import { Filters } from './Filters';

interface OnyxConfig { serverUrl: string; apiToken: string; branchCode: string; isConnected: boolean; }

const SYNC_LOGS = [
  '🔌 جاري الاتصال بخادم Onyx ERP...',
  '✅ تم الاتصال بنجاح',
  '📋 جاري قراءة جدول Item Card...',
  '🖼️  جاري جلب صور المنتجات...',
  '📦 جاري مزامنة مستويات المخزون...',
  '💰 جاري تحديث قوائم الأسعار...',
  '🏷️  جاري ربط الفئات والعلامات التجارية...',
  '🔄 جاري تحديث السجلات المحلية...',
  '✅ اكتملت المزامنة بنجاح!',
];

export default function OnyxSync() {
  const [config, setConfig] = useState<OnyxConfig>(db.getOnyxConfig() as OnyxConfig);
  const [items, setItems] = useState<OnyxItem[]>(db.getOnyxItems());
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [syncDone, setSyncDone] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('الكل');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pushing, setPushing] = useState(false);
  const [pushDone, setPushDone] = useState(false);
  const [tab, setTab] = useState<'config' | 'items' | 'log'>('config');
  
  // Central store hooks
  const addProductStore = useAppStore(state => state.addProduct);
  const setProductsStore = useAppStore(state => state.setProducts);

  const categories = useMemo(() => ['الكل', ...Array.from(new Set(items.map(i => i.category)))], [items]);

  const filtered = useMemo(() => items.filter(i => {
    const matchSearch = i.nameAr.includes(search) || i.nameEn.toLowerCase().includes(search.toLowerCase()) || i.sku.includes(search);
    const matchCat = filterCat === 'الكل' || i.category === filterCat;
    return matchSearch && matchCat;
  }), [items, search, filterCat]);

  const saveConfig = useCallback(() => {
    db.saveOnyxConfig({ ...config, isConnected: false });
    setConfig(prev => ({ ...prev, isConnected: false }));
  }, [config]);

  const testConnection = useCallback(async () => {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 2000));
    const connected = config.serverUrl.length > 0;
    const updated = { ...config, isConnected: connected };
    setConfig(updated);
    db.saveOnyxConfig(updated);
    setSyncing(false);
  }, [config]);

  const startSync = async () => {
    setSyncing(true);
    setSyncProgress(0);
    setSyncLogs([]);
    setSyncDone(false);
    setTab('log');

    for (let i = 0; i < SYNC_LOGS.length; i++) {
      await new Promise(r => setTimeout(r, 700 + Math.random() * 400));
      setSyncLogs(prev => [...prev, SYNC_LOGS[i]]);
      setSyncProgress(Math.round(((i + 1) / SYNC_LOGS.length) * 100));
    }

    const synced = items.map(it => ({ ...it, synced: true, lastSync: new Date().toLocaleString('ar-SA') }));
    setItems(synced);
    db.saveOnyxItems(synced);
    setSyncing(false);
    setSyncDone(true);
    setTab('items');
  };

  const toggleSelect = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(i => i.id)));
  }, [selected.size, filtered]);

  const pushToStore = async () => {
    setPushing(true);
    await new Promise(r => setTimeout(r, 1500));
    const products = db.getProducts();
    const selectedItems = items.filter(i => selected.has(i.id));
    const newProducts: Product[] = [];
    
    selectedItems.forEach(item => {
      const exists = products.find(p => p.onyxId === item.id);
      if (!exists) {
        const newProduct: Product = {
          id: `PRD${Date.now()}-${item.id}`,
          sku: item.sku,
          nameAr: item.nameAr,
          nameEn: item.nameEn,
          slug: item.nameEn.toLowerCase().replace(/\s+/g, '-'),
          category: item.category,
          brand: item.brand,
          price: item.retailPrice,
          stock: item.stock,
          status: 'active',
          images: [{ id: `IMG${Date.now()}`, url: item.imageUrl, alt: `${item.nameAr} - ${item.brand}`, isPrimary: true }],
          description: `${item.nameAr} من ${item.brand} — SKU: ${item.sku}`,
          metaTitle: `${item.nameAr} | سحر`,
          rating: 0,
          reviewsCount: 0,
          isNew: true,
          isFeatured: false,
          createdAt: new Date().toISOString().split('T')[0],
          onyxId: item.id,
        };
        db.addProduct(newProduct);
        newProducts.push(newProduct);
      }
    });
    
    // Update central store for live sync
    if (newProducts.length > 0) {
      const currentProducts = db.getProducts();
      setProductsStore(currentProducts);
    }
    
    setPushing(false);
    setPushDone(true);
    setSelected(new Set());
    setTimeout(() => setPushDone(false), 3000);
  };

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-6 animate-fadeIn overflow-hidden">
      {/* Header */}
      <ResponsiveCard className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] rounded-xl flex items-center justify-center border border-[#E91E63] dark:border-[#C2185B] flex-shrink-0">
            <Database className="w-5 h-5 sm:w-8 sm:h-8 text-[#E91E63] dark:text-[#C2185B]" />
          </div>
          <div className="flex-1">
            <h2 className="text-base sm:text-2xl font-black text-black dark:text-white">Onyx ERP Integration</h2>
            <p className="text-black/60 dark:text-gray-400 text-xs sm:text-sm mt-1">استيراد الأصناف والمخزون مباشرة من قاعدة بيانات Onyx</p>
          </div>
          <div className="flex items-center gap-2 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-[#E91E63] dark:border-[#C2185B] transition-all duration-300 ease">
            {config.isConnected ? <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-[#E91E63] dark:text-[#C2185B]" /> : <WifiOff className="w-4 h-4 sm:w-5 sm:h-5 text-[#E91E63] dark:text-[#C2185B]" />}
            <span className="font-semibold text-xs sm:text-sm text-black dark:text-white">{config.isConnected ? 'متصل' : 'غير متصل'}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-5">
          {[
            { label: 'إجمالي الأصناف', value: items.length },
            { label: 'تم المزامنة', value: items.filter(i => i.synced).length },
            { label: 'في المتجر', value: db.getProducts().filter(p => p.onyxId).length },
          ].map(s => (
            <div key={s.label} className="bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] border border-[#E91E63] dark:border-[#C2185B] rounded-xl p-2 sm:p-3 text-center transition-all duration-300 ease">
              <p className="text-lg sm:text-2xl font-black text-black dark:text-white">{s.value}</p>
              <p className="text-black/60 dark:text-gray-400 text-[10px] sm:text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </ResponsiveCard>

      {/* Tabs */}
      <div className="flex gap-1.5 sm:gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 sm:p-1.5 shadow-sm hover:shadow-xl transition-all duration-300 ease">
        {[
          ['config', '⚙️ الإعدادات'],
          ['items', '📦 الأصناف'],
          ['log', '📋 سجل المزامنة']
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as 'config' | 'items' | 'log')}
            aria-label={label.replace(/[⚙️📦📋]\s/, '')}
            className={`flex-1 py-2 sm:py-2.5 text-[11px] sm:text-sm font-semibold rounded-xl transition-all duration-300 ease min-h-[44px] ${
              tab === key ? 'bg-[#E91E63] dark:bg-[#C2185B] text-white shadow-sm' : 'text-black dark:text-gray-300 hover:text-[#E91E63] dark:hover:text-[#C2185B]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Config Tab */}
      {tab === 'config' && (
        <ResponsiveCard className="p-4 sm:p-6 space-y-4 sm:space-y-5" data-tour="sync-settings">
          <h3 className="font-bold text-black dark:text-white text-sm sm:text-lg flex items-center gap-2">
            <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E91E63] dark:text-[#C2185B]" /> إعدادات الاتصال بـ Onyx ERP
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-black dark:text-white mb-1 sm:mb-1.5">رابط الخادم / Server URL</label>
              <input
                type="url"
                placeholder="http://onyx-server:8080/api"
                dir="ltr"
                value={config.serverUrl}
                onChange={e => setConfig(p => ({ ...p, serverUrl: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] focus:border-transparent transition-all duration-300 ease min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-1.5">رمز الفرع / Branch Code</label>
              <input
                type="text"
                placeholder="MAIN-01"
                dir="ltr"
                value={config.branchCode}
                onChange={e => setConfig(p => ({ ...p, branchCode: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] focus:border-transparent transition-all duration-300 ease min-h-[44px]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-1.5">مفتاح API / API Token</label>
              <input
                type="password"
                placeholder="eyJhbGci..."
                dir="ltr"
                value={config.apiToken}
                onChange={e => setConfig(p => ({ ...p, apiToken: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] focus:border-transparent transition-all duration-300 ease min-h-[44px]"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] p-3 sm:p-4 text-[11px] sm:text-sm text-black dark:text-gray-300 transition-all duration-300 ease">
            💡 <strong>بيئة تجريبية:</strong> اترك الحقول فارغة أو اكتب أي قيمة واضغط "اختبار الاتصال" لتجربة المزامنة التجريبية مع 20 صنف مدمج.
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={testConnection}
              disabled={syncing}
              aria-label="اختبار الاتصال"
              className="flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 bg-[#E91E63] text-white rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#C2185B] transition-all duration-300 ease shadow-sm disabled:opacity-60 min-h-[44px]"
            >
              {syncing ? <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin2" /> : <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              اختبار الاتصال
            </button>
            <button
              onClick={saveConfig}
              aria-label="حفظ الإعدادات"
              className="flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 bg-black text-white rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#333] transition-all duration-300 ease shadow-sm min-h-[44px]"
            >
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> حفظ الإعدادات
            </button>
            <button
              onClick={startSync}
              disabled={syncing}
              data-tour="sync-button"
              aria-label="بدء المزامنة"
              className="flex-1 sm:flex-none flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 bg-[#E91E63] text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-[#C2185B] transition-all duration-300 ease shadow-sm disabled:opacity-60 min-h-[44px]"
            >
              {syncing ? <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin2" /> : <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              بدء المزامنة الآن
            </button>
          </div>
        </ResponsiveCard>
      )}

      {/* Items Tab */}
      {tab === 'items' && (
        <div className="space-y-3 sm:space-y-4">
          {/* Controls */}
          <Filters
            searchPlaceholder="بحث في الأصناف..."
            searchValue={search}
            onSearchChange={setSearch}
            filterOptions={categories.map(c => ({ label: c, value: c }))}
            filterValue={filterCat}
            onFilterChange={setFilterCat}
          >
            <button
              onClick={selectAll}
              aria-label={selected.size === filtered.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
              className="px-3 sm:px-4 py-2 sm:py-2 bg-white border border-[#E91E63] rounded-xl text-xs sm:text-sm font-medium text-black hover:bg-[rgba(233,30,99,0.08)] transition-colors duration-300 ease min-h-[44px]"
            >
              {selected.size === filtered.length ? 'إلغاء الكل' : 'تحديد الكل'}
            </button>
            {selected.size > 0 && (
              <button
                onClick={pushToStore}
                disabled={pushing}
                aria-label={`إضافة ${selected.size} صنف للمتجر`}
                className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2 bg-[#E91E63] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#C2185B] transition-all duration-300 ease shadow-sm min-h-[44px]"
              >
                {pushing ? <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin2" /> : <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                إضافة {selected.size} صنف للمتجر
              </button>
            )}
          </Filters>

          {pushDone && (
            <div className="flex items-center gap-2 sm:gap-3 bg-[rgba(76,175,80,0.1)] border border-[#4CAF50] rounded-xl p-3 sm:p-4 animate-bounceIn transition-all duration-300 ease">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#4CAF50]" />
              <p className="font-semibold text-xs sm:text-sm text-black">تم إضافة الأصناف المحددة إلى متجر سحر بنجاح! ✨</p>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4" data-tour="sync-items-table">
            {filtered.map(item => {
              const isSelected = selected.has(item.id);
              const inStore = db.getProducts().some(p => p.onyxId === item.id);
              return (
                <ResponsiveCard
                  key={item.id}
                  onClick={() => !inStore && toggleSelect(item.id)}
                  className={`overflow-hidden cursor-pointer ${
                    isSelected ? 'ring-2 ring-[#E91E63]' : ''
                  } ${inStore ? 'opacity-60 cursor-default' : 'hover-lift'}`}
                >
                  <div className="relative">
                    <img src={item.imageUrl} alt={item.nameAr} className="w-full h-32 sm:h-40 object-cover" />
                    <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex flex-col gap-1">
                      {item.synced && <span className="badge-synced text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">✓ مزامن</span>}
                      {inStore && <span className="badge-shipped text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">في المتجر</span>}
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-[rgba(233,30,99,0.2)] flex items-center justify-center transition-all duration-300 ease">
                        <CheckCircle className="w-7 h-7 sm:w-10 sm:h-10 text-[#E91E63]" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <p className="font-bold text-black text-xs sm:text-sm">{item.nameAr}</p>
                    <p className="text-[10px] sm:text-xs text-black/60 mt-0.5">{item.nameEn}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] sm:text-xs bg-[rgba(233,30,99,0.08)] text-black px-1.5 sm:px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="text-[10px] sm:text-xs text-black font-mono">{item.sku}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#E91E63]">
                      <div>
                        <p className="text-[10px] sm:text-xs text-black/60">سعر البيع</p>
                        <p className="font-black text-black text-xs sm:text-sm">{item.retailPrice} ر.س</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] sm:text-xs text-black/60">المخزون</p>
                        <p className={`font-bold text-xs sm:text-sm ${item.stock < 50 ? 'text-[#FF9800]' : 'text-[#4CAF50]'}`}>{item.stock} وحدة</p>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Log Tab */}
      {tab === 'log' && (
        <ResponsiveCard className="p-4 sm:p-6" data-tour="sync-progress">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="font-bold text-black text-sm sm:text-base">سجل المزامنة</h3>
            {syncDone && <span className="bg-[#4CAF50] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold">اكتملت المزامنة ✅</span>}
          </div>

          {syncing && (
            <div className="mb-3 sm:mb-5">
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <span className="text-xs sm:text-sm font-semibold text-black">جاري المزامنة...</span>
                <span className="text-xs sm:text-sm font-black text-[#E91E63]">{syncProgress}%</span>
              </div>
              <div className="w-full bg-[rgba(233,30,99,0.08)] rounded-full h-2 sm:h-3 overflow-hidden">
                <div className="h-full bg-[#E91E63] rounded-full transition-all duration-500" style={{ width: `${syncProgress}%` }} />
              </div>
            </div>
          )}

          <div className="bg-black rounded-[14px] p-3 sm:p-4 font-mono text-[10px] sm:text-sm space-y-1 sm:space-y-1.5 min-h-[150px] sm:min-h-[200px] transition-all duration-300 ease">
            {syncLogs.length === 0 && !syncing && (
              <p className="text-black/60 italic">ابدأ المزامنة لعرض السجل...</p>
            )}
            {syncLogs.map((log, i) => (
              <p key={i} className="text-[#4CAF50] animate-fadeIn">{`> ${log}`}</p>
            ))}
            {syncing && <p className="text-[#FF9800] animate-pulse2">{'> '}...</p>}
          </div>

          {!syncing && syncLogs.length === 0 && (
            <button
              onClick={startSync}
              aria-label="بدء المزامنة"
              className="mt-3 sm:mt-4 flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 bg-[#E91E63] text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-[#C2185B] transition-all duration-300 ease shadow-sm min-h-[44px]"
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> بدء المزامنة
            </button>
          )}
        </ResponsiveCard>
      )}
    </div>
  );
}
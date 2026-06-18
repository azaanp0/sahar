import { useState } from 'react';
import { db } from '../lib/db';
import type { OnyxItem, Product } from '../lib/db';
import {
  Database, Wifi, WifiOff, RefreshCw, CheckCircle,
  Upload, Search, Settings2
} from 'lucide-react';

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

  const categories = ['الكل', ...Array.from(new Set(items.map(i => i.category)))];

  const filtered = items.filter(i => {
    const matchSearch = i.nameAr.includes(search) || i.nameEn.toLowerCase().includes(search.toLowerCase()) || i.sku.includes(search);
    const matchCat = filterCat === 'الكل' || i.category === filterCat;
    return matchSearch && matchCat;
  });

  const saveConfig = () => {
    db.saveOnyxConfig({ ...config, isConnected: false });
    setConfig(prev => ({ ...prev, isConnected: false }));
  };

  const testConnection = async () => {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 2000));
    const connected = config.serverUrl.length > 0;
    const updated = { ...config, isConnected: connected };
    setConfig(updated);
    db.saveOnyxConfig(updated);
    setSyncing(false);
  };

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

    // Mark all items as synced
    const synced = items.map(it => ({ ...it, synced: true, lastSync: new Date().toLocaleString('ar-SA') }));
    setItems(synced);
    db.saveOnyxItems(synced);
    setSyncing(false);
    setSyncDone(true);
    setTab('items');
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(i => i.id)));
  };

  const pushToStore = async () => {
    setPushing(true);
    await new Promise(r => setTimeout(r, 1500));
    const products = db.getProducts();
    const selectedItems = items.filter(i => selected.has(i.id));
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
      }
    });
    setPushing(false);
    setPushDone(true);
    setSelected(new Set());
    setTimeout(() => setPushDone(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-onyx to-onyxLight rounded-2xl p-6 text-white shadow-card">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
            <Database className="w-8 h-8 text-blue-300" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Onyx ERP Integration</h2>
            <p className="text-blue-200 text-sm mt-1">استيراد الأصناف والمخزون مباشرة من قاعدة بيانات Onyx</p>
          </div>
          <div className="mr-auto flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
            {config.isConnected ? <Wifi className="w-5 h-5 text-green-400" /> : <WifiOff className="w-5 h-5 text-red-400" />}
            <span className="font-semibold text-sm">{config.isConnected ? 'متصل' : 'غير متصل'}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { label: 'إجمالي الأصناف', value: items.length },
            { label: 'تم المزامنة', value: items.filter(i => i.synced).length },
            { label: 'في المتجر', value: db.getProducts().filter(p => p.onyxId).length },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-black">{s.value}</p>
              <p className="text-blue-200 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-card">
        {([['config', '⚙️ الإعدادات'], ['items', '📦 الأصناف'], ['log', '📋 سجل المزامنة']] as [string, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === key ? 'bg-onyx text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Config Tab */}
      {tab === 'config' && (
        <div className="bg-white rounded-2xl p-6 shadow-card space-y-5" data-tour="sync-settings">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-onyx" /> إعدادات الاتصال بـ Onyx ERP
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">رابط الخادم / Server URL</label>
              <input type="url" placeholder="http://onyx-server:8080/api" dir="ltr"
                value={config.serverUrl} onChange={e => setConfig(p => ({ ...p, serverUrl: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">رمز الفرع / Branch Code</label>
              <input type="text" placeholder="MAIN-01" dir="ltr"
                value={config.branchCode} onChange={e => setConfig(p => ({ ...p, branchCode: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">مفتاح API / API Token</label>
              <input type="password" placeholder="eyJhbGci..." dir="ltr"
                value={config.apiToken} onChange={e => setConfig(p => ({ ...p, apiToken: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
            💡 <strong>بيئة تجريبية:</strong> اترك الحقول فارغة أو اكتب أي قيمة واضغط "اختبار الاتصال" لتجربة المزامنة التجريبية مع 20 صنف مدمج.
          </div>

          <div className="flex gap-3">
            <button onClick={testConnection} disabled={syncing}
              className="flex items-center gap-2 px-5 py-3 bg-onyx text-white rounded-xl font-semibold text-sm hover:bg-onyxLight transition-all shadow-sm disabled:opacity-60">
              {syncing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin2" /> : <Wifi className="w-4 h-4" />}
              اختبار الاتصال
            </button>
            <button onClick={saveConfig}
              className="flex items-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-all shadow-sm">
              <CheckCircle className="w-4 h-4" /> حفظ الإعدادات
            </button>
            <button onClick={startSync} disabled={syncing}
              data-tour="sync-button"
              className="mr-auto flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-accent to-accentDark text-white rounded-xl font-bold text-sm hover:shadow-glowAccent transition-all disabled:opacity-60">
              {syncing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin2" /> : <RefreshCw className="w-4 h-4" />}
              بدء المزامنة الآن
            </button>
          </div>
        </div>
      )}

      {/* Items Tab */}
      {tab === 'items' && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-3 bg-white p-4 rounded-2xl shadow-card">
            <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-surface border border-border rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input placeholder="بحث في الأصناف..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm outline-none flex-1 text-gray-700" />
            </div>
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
              className="px-3 py-2 border border-border rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-primary-400">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={selectAll}
              className="px-4 py-2 bg-surface border border-border rounded-xl text-sm font-medium text-gray-600 hover:bg-primary-50 transition-colors">
              {selected.size === filtered.length ? 'إلغاء الكل' : 'تحديد الكل'}
            </button>
            {selected.size > 0 && (
              <button onClick={pushToStore} disabled={pushing}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-accent to-accentDark text-white rounded-xl text-sm font-bold hover:shadow-glowAccent transition-all">
                {pushing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin2" /> : <Upload className="w-4 h-4" />}
                إضافة {selected.size} صنف للمتجر
              </button>
            )}
          </div>

          {pushDone && (
            <div className="flex items-center gap-3 bg-success/10 border border-success/30 rounded-2xl p-4 animate-bounceIn">
              <CheckCircle className="w-6 h-6 text-success" />
              <p className="font-semibold text-success">تم إضافة الأصناف المحددة إلى متجر سحر بنجاح! ✨</p>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" data-tour="sync-items-table">
            {filtered.map(item => {
              const isSelected = selected.has(item.id);
              const inStore = db.getProducts().some(p => p.onyxId === item.id);
              return (
                <div key={item.id} onClick={() => !inStore && toggleSelect(item.id)}
                  className={`bg-white rounded-2xl shadow-card hover:shadow-cardHover transition-all overflow-hidden cursor-pointer ${isSelected ? 'ring-2 ring-accent' : ''} ${inStore ? 'opacity-60 cursor-default' : 'hover-lift'}`}>
                  <div className="relative">
                    <img src={item.imageUrl} alt={item.nameAr} className="w-full h-40 object-cover" />
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {item.synced && <span className="badge-synced text-xs px-2 py-0.5 rounded-full font-semibold">✓ مزامن</span>}
                      {inStore && <span className="badge-shipped text-xs px-2 py-0.5 rounded-full font-semibold">في المتجر</span>}
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-accent" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-gray-900 text-sm">{item.nameAr}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.nameEn}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="text-xs text-gray-500 font-mono">{item.sku}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div>
                        <p className="text-xs text-gray-400">سعر البيع</p>
                        <p className="font-black text-primary-700">{item.retailPrice} ر.س</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">المخزون</p>
                        <p className={`font-bold ${item.stock < 50 ? 'text-warning' : 'text-success'}`}>{item.stock} وحدة</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Log Tab */}
      {tab === 'log' && (
        <div className="bg-white rounded-2xl p-6 shadow-card" data-tour="sync-progress">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">سجل المزامنة</h3>
            {syncDone && <span className="badge-delivered text-xs px-3 py-1 rounded-full font-semibold">اكتملت المزامنة ✅</span>}
          </div>

          {syncing && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">جاري المزامنة...</span>
                <span className="text-sm font-black text-primary-700">{syncProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-400 to-accent rounded-full transition-all duration-500"
                  style={{ width: `${syncProgress}%` }} />
              </div>
            </div>
          )}

          <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm space-y-1.5 min-h-[200px]">
            {syncLogs.length === 0 && !syncing && (
              <p className="text-gray-500 italic">ابدأ المزامنة لعرض السجل...</p>
            )}
            {syncLogs.map((log, i) => (
              <p key={i} className="text-green-400 animate-fadeIn">{`> `}{log}</p>
            ))}
            {syncing && <p className="text-yellow-400 animate-pulse2">{'> '}...</p>}
          </div>

          {!syncing && syncLogs.length === 0 && (
            <button onClick={startSync} className="mt-4 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-accent to-accentDark text-white rounded-xl font-bold text-sm">
              <RefreshCw className="w-4 h-4" /> بدء المزامنة
            </button>
          )}
        </div>
      )}
    </div>
  );
}

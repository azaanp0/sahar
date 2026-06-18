import React, { useState, useCallback, useMemo } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import type { Product, ProductImage } from '@/lib/dashboard-dashe/db';
import {
  Upload, Trash2, Star, Check,
  Plus, Search, Grid, List, X, Link, Copy
} from 'lucide-react';
import { ResponsiveCard } from './ResponsiveCard';
import { Filters } from './Filters';
import { TableWrapper } from './TableWrapper';

interface MediaItem {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  productName?: string;
  productId?: string;
  createdAt: string;
}

function buildMediaLibrary(products: Product[]): MediaItem[] {
  const items: MediaItem[] = [];
  products.forEach(p => {
    p.images.forEach(img => {
      items.push({
        id: img.id,
        url: img.url,
        alt: img.alt,
        isPrimary: img.isPrimary,
        productName: p.nameAr,
        productId: p.id,
        createdAt: p.createdAt,
      });
    });
  });
  return items;
}

export default function MediaLibrary() {
  const [products, setProducts] = useState<Product[]>(db.getProducts());
  const [media, setMedia] = useState<MediaItem[]>(buildMediaLibrary(db.getProducts()));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [editingAlt, setEditingAlt] = useState('');
  const [addForm, setAddForm] = useState({ url: '', alt: '', productId: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [notification, setNotification] = useState('');

  const reload = useCallback(() => {
    const prods = db.getProducts();
    setProducts(prods);
    setMedia(buildMediaLibrary(prods));
  }, []);

  const notify = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  }, []);

  const filtered = useMemo(() => media.filter(m =>
    m.alt.includes(search) || (m.productName || '').includes(search) || m.url.toLowerCase().includes(search.toLowerCase())
  ), [media, search]);

  const saveAlt = useCallback(() => {
    if (!selected) return;
    const prods = db.getProducts();
    const prod = prods.find(p => p.id === selected.productId);
    if (prod) {
      const imgs = prod.images.map(i => i.id === selected.id ? { ...i, alt: editingAlt } : i);
      db.updateProduct(prod.id, { images: imgs });
      reload();
      setSelected(s => s ? { ...s, alt: editingAlt } : null);
      notify('✅ تم تحديث النص البديل (Alt) بنجاح');
    }
  }, [selected, editingAlt, reload, notify]);

  const deleteImage = useCallback((item: MediaItem) => {
    if (!item.productId) return;
    const prods = db.getProducts();
    const prod = prods.find(p => p.id === item.productId);
    if (prod) {
      db.updateProduct(prod.id, { images: prod.images.filter(i => i.id !== item.id) });
      reload();
      setSelected(null);
      notify('🗑️ تم حذف الصورة');
    }
  }, [reload, notify]);

  const setPrimary = useCallback((item: MediaItem) => {
    if (!item.productId) return;
    const prods = db.getProducts();
    const prod = prods.find(p => p.id === item.productId);
    if (prod) {
      db.updateProduct(prod.id, { images: prod.images.map(i => ({ ...i, isPrimary: i.id === item.id })) });
      reload();
      notify('⭐ تم تعيينها كصورة رئيسية');
    }
  }, [reload, notify]);

  const addImage = useCallback(() => {
    if (!addForm.url || !addForm.productId) return;
    const prods = db.getProducts();
    const prod = prods.find(p => p.id === addForm.productId);
    if (prod) {
      const newImg: ProductImage = { id: `IMG${Date.now()}`, url: addForm.url, alt: addForm.alt || `${prod.nameAr} - ${prod.brand}`, isPrimary: prod.images.length === 0 };
      db.updateProduct(prod.id, { images: [...prod.images, newImg] });
      reload();
      setAddForm({ url: '', alt: '', productId: '' });
      setShowAdd(false);
      notify('✅ تم إضافة الصورة بنجاح');
    }
  }, [addForm, reload, notify]);

  const copyUrl = useCallback((url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    setShowAdd(true);
  }, []);

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-5 animate-fadeIn overflow-hidden">
      {notification && (
        <div className="fixed bottom-4 left-4 right-4 sm:top-4 sm:top-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 bg-[#E91E63] dark:bg-[#C2185B] text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl shadow-xl font-semibold text-xs sm:text-sm animate-bounceIn transition-all duration-300 ease">
          {notification}
        </div>
      )}

      {/* Header */}
      <Filters
        searchPlaceholder="بحث في الصور..."
        searchValue={search}
        onSearchChange={setSearch}
      >
        <div className="flex items-center bg-white dark:bg-gray-800 border border-[#E91E63] dark:border-[#C2185B] rounded-xl overflow-hidden shadow-sm transition-all duration-300 ease">
          <button onClick={() => setViewMode('grid')} aria-label="عرض شبكي" className={`px-2 sm:px-3 py-1.5 sm:py-2.5 min-h-[44px] ${viewMode === 'grid' ? 'bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] text-black dark:text-white' : 'text-black dark:text-gray-300 hover:text-[#E91E63] dark:hover:text-[#C2185B]'} transition-colors duration-300 ease`}><Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
          <button onClick={() => setViewMode('list')} aria-label="عرض قائمة" className={`px-2 sm:px-3 py-1.5 sm:py-2.5 min-h-[44px] ${viewMode === 'list' ? 'bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] text-black dark:text-white' : 'text-black dark:text-gray-300 hover:text-[#E91E63] dark:hover:text-[#C2185B]'} transition-colors duration-300 ease`}><List className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
        </div>
        <button onClick={() => setShowAdd(true)}
          aria-label="إضافة صورة"
          className="flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-all duration-300 ease min-h-[44px]">
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> إضافة صورة
        </button>
      </Filters>

      <div className="flex flex-col lg:flex-row gap-3 sm:gap-5">
        {/* Media Grid/List */}
        <div className="flex-1 min-w-0">
          {/* Drop Zone */}
          <div
            data-tour="media-dropzone"
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className="mb-3 sm:mb-4"
          >
            <ResponsiveCard className={`border-2 border-dashed p-3 sm:p-6 text-center transition-all duration-300 ease ${dragActive ? 'drag-active border-[#E91E63] dark:border-[#C2185B]' : 'border-[#E91E63] dark:border-[#C2185B] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]'}`}>
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-[#E91E63] dark:text-[#C2185B] mx-auto mb-1.5 sm:mb-2" />
              <p className="text-xs sm:text-sm font-semibold text-black dark:text-white">اسحب وأفلت الصور هنا</p>
              <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400 mt-0.5 sm:mt-1">أو <button onClick={() => setShowAdd(true)} className="text-[#E91E63] dark:text-[#C2185B] underline">اضغط لإضافة رابط صورة</button></p>
            </ResponsiveCard>
          </div>

          <p className="text-xs sm:text-sm text-black dark:text-white mb-2 sm:mb-3">{filtered.length} صورة</p>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
              {filtered.map((item, idx) => (
                <ResponsiveCard key={item.id} onClick={() => { setSelected(item); setEditingAlt(item.alt); }}
                  data-tour={idx === 0 ? "media-first-card" : undefined}
                  className={`overflow-hidden cursor-pointer hover-lift ${selected?.id === item.id ? 'ring-2 ring-[#E91E63] dark:ring-[#C2185B]' : ''}`}
                >
                  <div className="relative aspect-square bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] transition-all duration-300 ease">
                    <img src={item.url} alt={item.alt} className="w-full h-full object-cover" loading="lazy"
                      onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/200x200/F3E8F7/9A68A8?text=${encodeURIComponent(item.alt.slice(0, 10))}`; }} />
                    {item.isPrimary && (
                      <div className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center transition-all duration-300 ease">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-1.5 sm:p-2">
                    <p className="text-[10px] sm:text-xs text-black dark:text-white truncate">{item.alt || '—'}</p>
                    <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400 truncate mt-0.5">{item.productName}</p>
                  </div>
                </ResponsiveCard>
              ))}
            </div>
          ) : (
            <ResponsiveCard className="overflow-hidden p-0">
              <TableWrapper>
                <table className="w-full min-w-[600px]">
                  <thead className="bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] border-b border-[#E91E63] dark:border-[#C2185B]">
                    <tr>{['الصورة', 'النص البديل (Alt)', 'المنتج', 'نوع', ''].map(h => <th key={h} className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold text-black dark:text-white whitespace-nowrap">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-[#E91E63] dark:divide-[#C2185B]">
                    {filtered.map(item => (
                      <tr key={item.id} className={`hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease cursor-pointer ${selected?.id === item.id ? 'bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]' : ''}`}
                        onClick={() => { setSelected(item); setEditingAlt(item.alt); }}>
                        <td className="px-2 sm:px-4 py-2 sm:py-3"><img src={item.url} alt={item.alt} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" /></td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-black dark:text-gray-300 max-w-[150px] sm:max-w-[200px] truncate">{item.alt || <span className="text-black/40 dark:text-gray-500 italic">بدون alt</span>}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-black dark:text-gray-300">{item.productName}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3">{item.isPrimary ? <span className="bg-[#4CAF50] text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">رئيسية</span> : <span className="text-[10px] sm:text-xs text-black/60">ثانوية</span>}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3">
                          <button onClick={e => { e.stopPropagation(); copyUrl(item.url, item.id); }} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease">
                            {copied === item.id ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4CAF50]" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black dark:text-gray-300" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrapper>
            </ResponsiveCard>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-full lg:w-72 flex-shrink-0 space-y-3 sm:space-y-4 animate-slideUp">
            <ResponsiveCard className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h4 className="font-bold text-black dark:text-white text-xs sm:text-sm">تفاصيل الصورة</h4>
                <button onClick={() => setSelected(null)} aria-label="إغلاق" className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-xl hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease min-h-[32px] min-w-[32px]">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black dark:text-white" />
                </button>
              </div>
              <img src={selected.url} alt={selected.alt} className="w-full aspect-square object-cover rounded-xl mb-2 sm:mb-3" />

              <div className="space-y-2 sm:space-y-3">
                <div>
                  <label className="text-[10px] sm:text-xs font-semibold text-black/60 dark:text-gray-400 mb-0.5 sm:mb-1 block">النص البديل (Alt) *</label>
                  <input value={editingAlt} onChange={e => setEditingAlt(e.target.value)}
                    data-tour="media-alt-input"
                    aria-label="النص البديل"
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]" />
                  <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400 mt-0.5 sm:mt-1">يُستخدم في SEO وإمكانية الوصول</p>
                </div>
                <button onClick={saveAlt} data-tour="media-save-details" aria-label="حفظ النص البديل" className="w-full py-1.5 sm:py-2 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease min-h-[44px]">
                  حفظ Alt
                </button>

                <div className="pt-1.5 sm:pt-2 border-t border-[#E91E63] space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-black">
                    <span className="font-semibold">المنتج:</span>
                    <span className="truncate">{selected.productName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                    <Link className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" className="text-[#E91E63] truncate hover:underline">{selected.url.slice(0, 30)}...</a>
                  </div>
                </div>

                <div className="flex gap-1.5 sm:gap-2 pt-1.5 sm:pt-2">
                  {!selected.isPrimary && (
                    <button onClick={() => setPrimary(selected)} aria-label="تعيين كصورة رئيسية" className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 bg-[rgba(255,152,0,0.1)] text-[#FF9800] rounded-xl text-[10px] sm:text-xs font-semibold hover:bg-[rgba(255,152,0,0.2)] transition-colors duration-300 ease min-h-[44px]">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> تعيين رئيسية
                    </button>
                  )}
                  <button onClick={() => deleteImage(selected)} aria-label="حذف الصورة" className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 bg-[rgba(244,67,54,0.1)] text-[#F44336] rounded-xl text-[10px] sm:text-xs font-semibold hover:bg-[rgba(244,67,54,0.2)] transition-colors duration-300 ease min-h-[44px]">
                    <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> حذف
                  </button>
                </div>
              </div>
            </ResponsiveCard>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAdd(false)} aria-hidden="true" />
          <div className="relative bg-white rounded-3xl p-4 sm:p-6 max-w-md w-full shadow-xl animate-slideUp space-y-3 sm:space-y-4 transition-all duration-300 ease overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="flex items-center justify-between">
              <h3 id="modal-title" className="font-bold text-black text-sm sm:text-base">إضافة صورة جديدة</h3>
              <button onClick={() => setShowAdd(false)} aria-label="إغلاق" className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl hover:bg-[rgba(233,30,99,0.08)] transition-colors duration-300 ease min-h-[36px] min-w-[36px]">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </button>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-black mb-1 sm:mb-1.5 block">رابط الصورة (URL) *</label>
              <input type="url" placeholder="https://..." value={addForm.url} onChange={e => setAddForm(p => ({ ...p, url: e.target.value }))} dir="ltr"
                aria-label="رابط الصورة"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#E91E63] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E91E63] transition-all duration-300 ease min-h-[44px]" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-black mb-1 sm:mb-1.5 block">النص البديل (Alt) *</label>
              <input placeholder="وصف الصورة للـ SEO..." value={addForm.alt} onChange={e => setAddForm(p => ({ ...p, alt: e.target.value }))}
                aria-label="النص البديل"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#E91E63] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E91E63] transition-all duration-300 ease min-h-[44px]" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-black mb-1 sm:mb-1.5 block">المنتج *</label>
              <select value={addForm.productId} onChange={e => setAddForm(p => ({ ...p, productId: e.target.value }))}
                aria-label="المنتج"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#E91E63] rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] transition-all duration-300 ease min-h-[44px]">
                <option value="">اختر منتجاً...</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.nameAr}</option>)}
              </select>
            </div>
            {addForm.url && (
              <div className="bg-[rgba(233,30,99,0.08)] rounded-xl p-2 transition-all duration-300 ease">
                <img src={addForm.url} alt="preview" className="w-full h-24 sm:h-32 object-cover rounded-lg"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div className="flex gap-2 sm:gap-3">
              <button onClick={() => setShowAdd(false)} aria-label="إلغاء" className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E91E63] rounded-xl text-xs sm:text-sm font-semibold text-black hover:bg-[rgba(233,30,99,0.08)] transition-colors duration-300 ease min-h-[44px]">إلغاء</button>
              <button onClick={addImage} disabled={!addForm.url || !addForm.productId}
                aria-label="إضافة الصورة"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#E91E63] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#C2185B] transition-colors duration-300 ease disabled:opacity-50 min-h-[44px]">
                إضافة الصورة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

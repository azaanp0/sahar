import React, { useState } from 'react';
import { db } from '../lib/db';
import type { Product, ProductImage } from '../lib/db';
import {
  Upload, Trash2, Star, Check,
  Plus, Search, Grid, List, X, Link, Copy
} from 'lucide-react';

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

  const reload = () => {
    const prods = db.getProducts();
    setProducts(prods);
    setMedia(buildMediaLibrary(prods));
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filtered = media.filter(m =>
    m.alt.includes(search) || (m.productName || '').includes(search) || m.url.toLowerCase().includes(search.toLowerCase())
  );

  const saveAlt = () => {
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
  };

  const deleteImage = (item: MediaItem) => {
    if (!item.productId) return;
    const prods = db.getProducts();
    const prod = prods.find(p => p.id === item.productId);
    if (prod) {
      db.updateProduct(prod.id, { images: prod.images.filter(i => i.id !== item.id) });
      reload();
      setSelected(null);
      notify('🗑️ تم حذف الصورة');
    }
  };

  const setPrimary = (item: MediaItem) => {
    if (!item.productId) return;
    const prods = db.getProducts();
    const prod = prods.find(p => p.id === item.productId);
    if (prod) {
      db.updateProduct(prod.id, { images: prod.images.map(i => ({ ...i, isPrimary: i.id === item.id })) });
      reload();
      notify('⭐ تم تعيينها كصورة رئيسية');
    }
  };

  const addImage = () => {
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
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Simulated drag-drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    setShowAdd(true);
  };

  return (
    <div className="p-6 space-y-5 animate-fadeIn">
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-sidebar text-white px-5 py-3 rounded-xl shadow-cardHover font-semibold text-sm animate-bounceIn">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-white border border-border rounded-xl px-3 py-2.5 shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input placeholder="بحث في الصور..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 text-gray-700" />
        </div>
        <div className="flex items-center bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <button onClick={() => setViewMode('grid')} className={`px-3 py-2.5 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'} transition-colors`}><Grid className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('list')} className={`px-3 py-2.5 ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'} transition-colors`}><List className="w-4 h-4" /></button>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl font-bold text-sm shadow-glow hover:-translate-y-0.5 transition-all">
          <Plus className="w-4 h-4" /> إضافة صورة
        </button>
      </div>

      <div className="flex gap-5">
        {/* Media Grid/List */}
        <div className="flex-1 min-w-0">
          {/* Drop Zone */}
          <div
            data-tour="media-dropzone"
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center mb-4 transition-all ${dragActive ? 'drag-active border-primary-400' : 'border-primary-200 bg-primary-50/30'}`}
          >
            <Upload className="w-8 h-8 text-primary-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-primary-600">اسحب وأفلت الصور هنا</p>
            <p className="text-xs text-gray-400 mt-1">أو <button onClick={() => setShowAdd(true)} className="text-primary-600 underline">اضغط لإضافة رابط صورة</button></p>
          </div>

          <p className="text-sm text-gray-500 mb-3">{filtered.length} صورة</p>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map((item, idx) => (
                <div key={item.id} onClick={() => { setSelected(item); setEditingAlt(item.alt); }}
                  data-tour={idx === 0 ? "media-first-card" : undefined}
                  className={`bg-white rounded-xl overflow-hidden shadow-card hover:shadow-cardHover transition-all cursor-pointer hover-lift ${selected?.id === item.id ? 'ring-2 ring-accent' : ''}`}>
                  <div className="relative aspect-square bg-gray-100">
                    <img src={item.url} alt={item.alt} className="w-full h-full object-cover" loading="lazy"
                      onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/200x200/F3E8F7/9A68A8?text=${encodeURIComponent(item.alt.slice(0, 10))}`; }} />
                    {item.isPrimary && (
                      <div className="absolute top-1.5 right-1.5 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <Star className="w-3 h-3 fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-600 truncate">{item.alt || '—'}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{item.productName}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <table className="w-full">
                <thead className="bg-surface border-b border-border">
                  <tr>{['الصورة', 'النص البديل (Alt)', 'المنتج', 'نوع', ''].map(h => <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-gray-500">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map(item => (
                    <tr key={item.id} className={`hover:bg-surface transition-colors cursor-pointer ${selected?.id === item.id ? 'bg-primary-50' : ''}`}
                      onClick={() => { setSelected(item); setEditingAlt(item.alt); }}>
                      <td className="px-4 py-3"><img src={item.url} alt={item.alt} className="w-12 h-12 rounded-lg object-cover" /></td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-[200px] truncate">{item.alt || <span className="text-gray-300 italic">بدون alt</span>}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{item.productName}</td>
                      <td className="px-4 py-3">{item.isPrimary ? <span className="badge-delivered text-xs px-2 py-0.5 rounded-full font-semibold">رئيسية</span> : <span className="text-xs text-gray-400">ثانوية</span>}</td>
                      <td className="px-4 py-3">
                        <button onClick={e => { e.stopPropagation(); copyUrl(item.url, item.id); }} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-primary-50 transition-colors">
                          {copied === item.id ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-72 flex-shrink-0 space-y-4 animate-slideUp">
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 text-sm">تفاصيل الصورة</h4>
                <button onClick={() => setSelected(null)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <img src={selected.url} alt={selected.alt} className="w-full aspect-square object-cover rounded-xl mb-3" />

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">النص البديل (Alt) *</label>
                  <input value={editingAlt} onChange={e => setEditingAlt(e.target.value)}
                    data-tour="media-alt-input"
                    className="w-full px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                  <p className="text-xs text-gray-400 mt-1">يُستخدم في SEO وإمكانية الوصول</p>
                </div>
                <button onClick={saveAlt} data-tour="media-save-details" className="w-full py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">
                  حفظ Alt
                </button>

                <div className="pt-2 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-semibold">المنتج:</span>
                    <span className="truncate">{selected.productName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Link className="w-3 h-3 text-gray-400" />
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 truncate hover:underline">{selected.url.slice(0, 40)}...</a>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {!selected.isPrimary && (
                    <button onClick={() => setPrimary(selected)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-warning/10 text-warning rounded-xl text-xs font-semibold hover:bg-warning/20 transition-colors">
                      <Star className="w-3.5 h-3.5" /> تعيين رئيسية
                    </button>
                  )}
                  <button onClick={() => deleteImage(selected)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-danger/10 text-danger rounded-xl text-xs font-semibold hover:bg-danger/20 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-cardHover animate-slideUp space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">إضافة صورة جديدة</h3>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">رابط الصورة (URL) *</label>
              <input type="url" placeholder="https://..." value={addForm.url} onChange={e => setAddForm(p => ({ ...p, url: e.target.value }))} dir="ltr"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">النص البديل (Alt) *</label>
              <input placeholder="وصف الصورة للـ SEO..." value={addForm.alt} onChange={e => setAddForm(p => ({ ...p, alt: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">المنتج *</label>
              <select value={addForm.productId} onChange={e => setAddForm(p => ({ ...p, productId: e.target.value }))}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-400">
                <option value="">اختر منتجاً...</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.nameAr}</option>)}
              </select>
            </div>
            {addForm.url && (
              <div className="bg-gray-50 rounded-xl p-2">
                <img src={addForm.url} alt="preview" className="w-full h-32 object-cover rounded-lg"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">إلغاء</button>
              <button onClick={addImage} disabled={!addForm.url || !addForm.productId}
                className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-colors disabled:opacity-50">
                إضافة الصورة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

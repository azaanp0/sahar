import { useState } from 'react';
import { db } from '../lib/db';
import type { Product } from '../lib/db';
import {
  Plus, Search, Edit3, Trash2, Star, Package,
  X, Image as ImageIcon, Save,
  AlertTriangle, CheckCircle, Tag, FileText, Globe
} from 'lucide-react';

const CATEGORIES = ['العناية بالبشرة', 'المكياج', 'العطور', 'العناية بالشعر', 'العناية بالجسم', 'الأظافر', 'العناية بالشفاه'];
const BRANDS = ['Lamer', 'Charlotte Tilbury', 'Arabian Oud', 'Moroccanoil', 'Urban Decay', 'Neutrogena', 'MAC', 'OPI', 'Clinique', 'The Body Shop', 'Maybelline', 'Anastasia'];
const STATUS_LABELS: Record<Product['status'], { label: string; badge: string }> = {
  active:     { label: 'نشط',         badge: 'badge-delivered' },
  draft:      { label: 'مسودة',       badge: 'badge-new' },
  outofstock: { label: 'نفذ المخزون', badge: 'badge-cancelled' },
};

function ProductModal({ product, onClose, onSave }: { product?: Product; onClose: () => void; onSave: (p: Product) => void; }) {
  const isEdit = !!product;
  const [tab, setTab] = useState<'general' | 'pricing' | 'media' | 'seo'>('general');
  const [form, setForm] = useState<Partial<Product>>(product || {
    nameAr: '', nameEn: '', category: CATEGORIES[0], brand: BRANDS[0],
    price: 0, stock: 0, status: 'active', description: '',
    images: [], isNew: true, isFeatured: false, rating: 0, reviewsCount: 0,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  const set = (field: keyof Product, val: unknown) => setForm(prev => ({ ...prev, [field]: val }));

  const addImage = () => {
    if (!imgUrl) return;
    const imgs = [...(form.images || [])];
    imgs.push({ id: `IMG${Date.now()}`, url: imgUrl, alt: imgAlt || `${form.nameAr} - ${form.brand}`, isPrimary: imgs.length === 0 });
    set('images', imgs);
    setImgUrl('');
    setImgAlt('');
  };

  const removeImage = (id: string) => set('images', (form.images || []).filter(i => i.id !== id));
  const setPrimary = (id: string) => set('images', (form.images || []).map(i => ({ ...i, isPrimary: i.id === id })));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    const slug = (form.nameEn || form.nameAr || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const saved: Product = {
      id: form.id || `PRD${Date.now()}`,
      sku: form.sku || `SKU-${Date.now()}`,
      nameAr: form.nameAr || '',
      nameEn: form.nameEn || '',
      slug: form.slug || slug,
      category: form.category || CATEGORIES[0],
      brand: form.brand || BRANDS[0],
      price: form.price || 0,
      salePrice: form.salePrice,
      discount: form.salePrice ? Math.round((1 - (form.salePrice / (form.price || 1))) * 100) : undefined,
      stock: form.stock || 0,
      status: form.status || 'active',
      images: form.images || [],
      description: form.description || '',
      metaTitle: form.metaTitle || `${form.nameAr} | سحر`,
      metaDescription: form.metaDescription,
      canonical: form.canonical || `https://sahar.sa/product/${slug}`,
      rating: form.rating || 0,
      reviewsCount: form.reviewsCount || 0,
      isNew: form.isNew || false,
      isFeatured: form.isFeatured || false,
      createdAt: form.createdAt || new Date().toISOString().split('T')[0],
      onyxId: form.onyxId,
    };
    onSave(saved);
    setSaving(false);
    setSaved(true);
    setTimeout(onClose, 800);
  };

  const TABS = [
    { id: 'general', label: 'عام', icon: FileText },
    { id: 'pricing', label: 'التسعير', icon: Tag },
    { id: 'media', label: 'الصور', icon: ImageIcon },
    { id: 'seo', label: 'SEO', icon: Globe },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-cardHover animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-lg font-bold text-gray-900">{isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${tab === t.id ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                <Icon className="w-4 h-4" />{t.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tab === 'general' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">اسم المنتج (عربي) *</label>
                  <input value={form.nameAr || ''} onChange={e => set('nameAr', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="كريم مرطب الوجه..." />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">اسم المنتج (إنجليزي)</label>
                  <input value={form.nameEn || ''} onChange={e => set('nameEn', e.target.value)} dir="ltr"
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="Product Name..." />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">الفئة</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-400">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">العلامة التجارية</label>
                  <select value={form.brand} onChange={e => set('brand', e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-400">
                    {BRANDS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">الحالة</label>
                  <select value={form.status} onChange={e => set('status', e.target.value as Product['status'])}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-400">
                    <option value="active">نشط</option>
                    <option value="draft">مسودة</option>
                    <option value="outofstock">نفذ المخزون</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isNew || false} onChange={e => set('isNew', e.target.checked)} className="w-4 h-4 accent-primary-600" />
                    <span className="text-sm text-gray-700">منتج جديد 🆕</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured || false} onChange={e => set('isFeatured', e.target.checked)} className="w-4 h-4 accent-primary-600" />
                    <span className="text-sm text-gray-700">منتج مميز ⭐</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">الوصف</label>
                <textarea rows={4} value={form.description || ''} onChange={e => set('description', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" placeholder="وصف تفصيلي للمنتج..." />
              </div>
            </>
          )}

          {tab === 'pricing' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">السعر الأصلي (ر.س) *</label>
                <input type="number" value={form.price || ''} onChange={e => set('price', +e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">سعر الخصم (ر.س)</label>
                <input type="number" value={form.salePrice || ''} onChange={e => set('salePrice', +e.target.value || undefined)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">المخزون (وحدة)</label>
                <input type="number" value={form.stock || ''} onChange={e => set('stock', +e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">رمز المنتج (SKU)</label>
                <input value={form.sku || ''} onChange={e => set('sku', e.target.value)} dir="ltr"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="SKN-001" />
              </div>
              {form.price && form.salePrice ? (
                <div className="col-span-2 bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                  <p className="text-green-700 font-bold">خصم {Math.round((1 - form.salePrice / form.price) * 100)}% · توفر {(form.price - form.salePrice).toFixed(0)} ر.س</p>
                </div>
              ) : null}
            </div>
          )}

          {tab === 'media' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {(form.images || []).map(img => (
                  <div key={img.id} className={`relative rounded-xl overflow-hidden border-2 transition-all ${img.isPrimary ? 'border-accent' : 'border-border'}`}>
                    <img src={img.url} alt={img.alt} className="w-full h-36 object-cover" />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                      <button onClick={() => setPrimary(img.id)} className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </button>
                      <button onClick={() => removeImage(img.id)} className="w-8 h-8 bg-danger rounded-full flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    {img.isPrimary && <span className="absolute top-1 right-1 bg-accent text-white text-xs px-2 py-0.5 rounded-full font-bold">رئيسية</span>}
                    <div className="p-2 bg-white">
                      <p className="text-xs text-gray-500 truncate">{img.alt}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-primary-200 rounded-xl p-5 space-y-3 bg-primary-50/30">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-primary-500" /> إضافة صورة</p>
                <input type="url" placeholder="رابط الصورة (URL)..." value={imgUrl} onChange={e => setImgUrl(e.target.value)} dir="ltr"
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                <input type="text" placeholder="النص البديل (Alt) — مثال: كريم مرطب - Lamer" value={imgAlt} onChange={e => setImgAlt(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                <button onClick={addImage} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">
                  <Plus className="w-4 h-4" /> إضافة الصورة
                </button>
              </div>
            </div>
          )}

          {tab === 'seo' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                🔍 تحسين SEO يساعد منتجك في الظهور بشكل أفضل في نتائج بحث Google
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">عنوان الصفحة (Meta Title)</label>
                <input value={form.metaTitle || ''} onChange={e => set('metaTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder={`${form.nameAr || 'اسم المنتج'} | سحر`} />
                <p className="text-xs text-gray-400 mt-1">{(form.metaTitle || '').length}/60 حرف</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">الوصف (Meta Description)</label>
                <textarea rows={3} value={form.metaDescription || ''} onChange={e => set('metaDescription', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                  placeholder="وصف موجز يظهر في نتائج البحث..." />
                <p className="text-xs text-gray-400 mt-1">{(form.metaDescription || '').length}/160 حرف</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Canonical URL</label>
                <input value={form.canonical || ''} onChange={e => set('canonical', e.target.value)} dir="ltr"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="https://sahar.sa/product/..." />
              </div>
              {/* SERP Preview */}
              {(form.metaTitle || form.nameAr) && (
                <div className="border border-border rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-3">معاينة نتيجة البحث</p>
                  <p className="text-xs text-green-700 truncate">sahar.sa › product › {form.slug || 'product-name'}</p>
                  <p className="text-blue-600 text-base font-semibold truncate mt-1">{form.metaTitle || `${form.nameAr} | سحر`}</p>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">{form.metaDescription || form.description || 'وصف المنتج...'}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <button onClick={onClose} className="px-5 py-2.5 text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors">إلغاء</button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl font-bold text-sm shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-60">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin2" />
              : saved ? <CheckCircle className="w-4 h-4" />
              : <Save className="w-4 h-4" />}
            {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ المنتج'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>(db.getProducts());
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('الكل');
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>();
  const [deleting, setDeleting] = useState<string | null>(null);

  const reload = () => setProducts(db.getProducts());

  const filtered = products.filter(p => {
    const matchSearch = p.nameAr.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search);
    const matchCat = filterCat === 'الكل' || p.category === filterCat;
    const matchStatus = filterStatus === 'الكل' || p.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const handleSave = (p: Product) => {
    if (editing) db.updateProduct(p.id, p);
    else db.addProduct(p);
    reload();
    setEditing(undefined);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    db.deleteProduct(id);
    reload();
    setDeleting(null);
  };

  return (
    <div className="p-6 space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-white border border-border rounded-xl px-3 py-2.5 shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input placeholder="بحث في المنتجات..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 text-gray-700" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="px-3 py-2.5 border border-border rounded-xl text-sm bg-white outline-none shadow-sm focus:ring-2 focus:ring-primary-400">
          {['الكل', ...CATEGORIES].map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 border border-border rounded-xl text-sm bg-white outline-none shadow-sm focus:ring-2 focus:ring-primary-400">
          <option value="الكل">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="draft">مسودة</option>
          <option value="outofstock">نفذ المخزون</option>
        </select>
        <button onClick={() => { setEditing(undefined); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl font-bold text-sm shadow-glow hover:-translate-y-0.5 transition-all">
          <Plus className="w-4 h-4" /> إضافة منتج
        </button>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>إجمالي: <strong className="text-gray-800">{filtered.length}</strong> منتج</span>
        <span>·</span>
        <span className="text-success">نشط: <strong>{filtered.filter(p => p.status === 'active').length}</strong></span>
        <span>·</span>
        <span className="text-warning">مسودة: <strong>{filtered.filter(p => p.status === 'draft').length}</strong></span>
        <span>·</span>
        <span className="text-danger">نفذ: <strong>{filtered.filter(p => p.status === 'outofstock').length}</strong></span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-border">
              <tr>
                {['المنتج', 'الفئة', 'السعر', 'المخزون', 'التقييم', 'الحالة', 'الإجراءات'].map(h => (
                  <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(p => {
                const statusCfg = STATUS_LABELS[p.status];
                const mainImg = p.images.find(i => i.isPrimary) || p.images[0];
                return (
                  <tr key={p.id} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {mainImg ? <img src={mainImg.url} alt={mainImg.alt} className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 text-gray-300 m-auto mt-3" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 line-clamp-1">{p.nameAr}</p>
                          <p className="text-xs text-gray-400">{p.brand} · {p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">{p.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{p.salePrice || p.price} ر.س</p>
                        {p.salePrice && <p className="text-xs text-gray-400 line-through">{p.price} ر.س</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className={`text-sm font-bold ${p.stock < 30 ? 'text-danger' : p.stock < 60 ? 'text-warning' : 'text-success'}`}>{p.stock}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                        <span className="text-sm font-semibold">{p.rating || '—'}</span>
                        <span className="text-xs text-gray-400">({p.reviewsCount})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusCfg.badge}`}>{statusCfg.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditing(p); setShowModal(true); }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary-50 transition-colors" title="تعديل">
                          <Edit3 className="w-4 h-4 text-primary-600" />
                        </button>
                        <button onClick={() => setDeleting(p.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors" title="حذف">
                          <Trash2 className="w-4 h-4 text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>لا توجد منتجات تطابق البحث</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showModal && <ProductModal product={editing} onClose={() => { setShowModal(false); setEditing(undefined); }} onSave={handleSave} />}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleting(null)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-cardHover animate-bounceIn text-center">
            <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg mb-2">تأكيد الحذف</h3>
            <p className="text-gray-500 text-sm mb-5">هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleting(null)} className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">إلغاء</button>
              <button onClick={() => handleDelete(deleting)} className="flex-1 px-4 py-2.5 bg-danger text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors">حذف نهائياً</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

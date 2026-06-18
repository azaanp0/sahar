import React, { useState, useCallback, useMemo } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import type { Product } from '@/lib/dashboard-dashe/db';
import { addProduct as addProductShared, updateProduct as updateProductShared, deleteProduct as deleteProductShared } from '@/lib/products';
import {
  Plus, Search, Edit3, Trash2, Star, Package,
  X, Image as ImageIcon, Save,
  AlertTriangle, CheckCircle, Tag, FileText, Globe
} from 'lucide-react';
import { ResponsiveCard } from './ResponsiveCard';
import { Filters } from './Filters';
import { TableWrapper } from './TableWrapper';

const CATEGORIES = ['العناية بالبشرة', 'المكياج', 'العطور', 'العناية بالشعر', 'العناية بالجسم', 'الأظافر', 'العناية بالشفاه'];
const BRANDS = ['Lamer', 'Charlotte Tilbury', 'Arabian Oud', 'Moroccanoil', 'Urban Decay', 'Neutrogena', 'MAC', 'OPI', 'Clinique', 'The Body Shop', 'Maybelline', 'Anastasia'];
const STATUS_LABELS: Record<Product['status'], { label: string; bgClass: string }> = {
  active:     { label: 'نشط',         bgClass: 'bg-[#DCFCE7] text-[#166534]' },
  draft:      { label: 'مسودة',       bgClass: 'bg-[#FEF3C7] text-[#92400E]' },
  outofstock: { label: 'نفذ المخزون', bgClass: 'bg-[#FEE2E2] text-[#991B1B]' },
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

  const set = useCallback((field: keyof Product, val: unknown) => setForm(prev => ({ ...prev, [field]: val })), []);

  const addImage = useCallback(() => {
    if (!imgUrl) return;
    const imgs = [...(form.images || [])];
    imgs.push({ id: `IMG${Date.now()}`, url: imgUrl, alt: imgAlt || `${form.nameAr} - ${form.brand}`, isPrimary: imgs.length === 0 });
    set('images', imgs);
    setImgUrl('');
    setImgAlt('');
  }, [imgUrl, imgAlt, form.nameAr, form.brand, form.images, set]);

  const removeImage = useCallback((id: string) => set('images', (form.images || []).filter(i => i.id !== id)), [form.images, set]);
  const setPrimary = useCallback((id: string) => set('images', (form.images || []).map(i => ({ ...i, isPrimary: i.id === id }))), [form.images, set]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    const slug = (form.nameEn || form.nameAr || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const savedProduct: Product = {
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
    onSave(savedProduct);
    setSaving(false);
    setSaved(true);
    setTimeout(onClose, 800);
  }, [form, onClose, onSave]);

  const TABS = [
    { id: 'general', label: 'عام', icon: FileText },
    { id: 'pricing', label: 'التسعير', icon: Tag },
    { id: 'media', label: 'الصور', icon: ImageIcon },
    { id: 'seo', label: 'SEO', icon: Globe },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl animate-slideUp transition-all duration-300 ease overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E91E63] dark:border-[#C2185B]">
          <h3 id="modal-title" className="text-base sm:text-lg font-bold text-black dark:text-white">{isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
          <button onClick={onClose} className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease min-h-[36px] min-w-[36px]" aria-label="إغلاق">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 sm:px-6 pt-3 overflow-x-auto">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                aria-label={t.label}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 ease whitespace-nowrap min-h-[44px] ${tab === t.id ? 'bg-[#E91E63] dark:bg-[#C2185B] text-white' : 'text-black dark:text-gray-300 hover:text-[#E91E63] dark:hover:text-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)]'}`}>
                <Icon className="w-4 h-4" />{t.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {tab === 'general' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-2">
                  <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">اسم المنتج (عربي) *</label>
                  <input value={form.nameAr || ''} onChange={e => set('nameAr', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]" placeholder="كريم مرطب الوجه..." />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="text-xs sm:text-sm font-semibold text-black mb-1.5 block">اسم المنتج (إنجليزي)</label>
                  <input value={form.nameEn || ''} onChange={e => set('nameEn', e.target.value)} dir="ltr"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] rounded-[14px] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E91E63] transition-all duration-300 ease min-h-[44px]" placeholder="Product Name..." />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">الفئة</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">العلامة التجارية</label>
                  <select value={form.brand} onChange={e => set('brand', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]">
                    {BRANDS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">الحالة</label>
                  <select value={form.status} onChange={e => set('status', e.target.value as Product['status'])}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]">
                    <option value="active">نشط</option>
                    <option value="draft">مسودة</option>
                    <option value="outofstock">نفذ المخزون</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isNew || false} onChange={e => set('isNew', e.target.checked)} className="w-4 h-4 accent-[#E91E63]" />
                    <span className="text-xs sm:text-sm text-black dark:text-gray-300">منتج جديد 🆕</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured || false} onChange={e => set('isFeatured', e.target.checked)} className="w-4 h-4 accent-[#E91E63]" />
                    <span className="text-xs sm:text-sm text-black dark:text-gray-300">منتج مميز ⭐</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">الوصف</label>
                <textarea rows={4} value={form.description || ''} onChange={e => set('description', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] resize-none transition-all duration-300 ease" placeholder="وصف تفصيلي للمنتج..." />
              </div>
            </>
          )}

          {tab === 'pricing' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">السعر الأصلي (ر.س) *</label>
                <input type="number" value={form.price || ''} onChange={e => set('price', +e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">سعر الخصم (ر.س)</label>
                <input type="number" value={form.salePrice || ''} onChange={e => set('salePrice', +e.target.value || undefined)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">المخزون (وحدة)</label>
                <input type="number" value={form.stock || ''} onChange={e => set('stock', +e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">رمز المنتج (SKU)</label>
                <input value={form.sku || ''} onChange={e => set('sku', e.target.value)} dir="ltr"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]" placeholder="SKN-001" />
              </div>
              {form.price && form.salePrice ? (
                <div className="col-span-1 sm:col-span-2 bg-[rgba(76,175,80,0.1)] border border-[#4CAF50] rounded-[14px] p-3 text-center transition-all duration-300 ease">
                  <p className="text-[#4CAF50] font-bold text-xs sm:text-sm">خصم {Math.round((1 - form.salePrice / form.price) * 100)}% · توفر {(form.price - form.salePrice).toFixed(0)} ر.س</p>
                </div>
              ) : null}
            </div>
          )}

          {tab === 'media' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(form.images || []).map(img => (
                  <div key={img.id} className={`relative rounded-[14px] overflow-hidden border-2 transition-all duration-300 ease ${img.isPrimary ? 'border-[#E91E63] dark:border-[#C2185B]' : 'border-[#E91E63] dark:border-[#C2185B]'}`}>
                    <img src={img.url} alt={img.alt} className="w-full h-32 sm:h-36 object-cover" />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                      <button onClick={() => setPrimary(img.id)} className="w-8 h-8 bg-[#E91E63] dark:bg-[#C2185B] rounded-full flex items-center justify-center transition-colors duration-300 ease">
                        <Star className="w-4 h-4 text-white" />
                      </button>
                      <button onClick={() => removeImage(img.id)} className="w-8 h-8 bg-[#F44336] rounded-full flex items-center justify-center transition-colors duration-300 ease">
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    {img.isPrimary && <span className="absolute top-1 right-1 bg-[#E91E63] dark:bg-[#C2185B] text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold">رئيسية</span>}
                    <div className="p-2 bg-white dark:bg-gray-800">
                      <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400 truncate">{img.alt}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-[#E91E63] dark:border-[#C2185B] rounded-[14px] p-4 sm:p-5 space-y-3 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] transition-all duration-300 ease">
                <p className="text-xs sm:text-sm font-semibold text-black dark:text-white flex items-center gap-2"><ImageIcon className="w-4 h-4 text-[#E91E63] dark:text-[#C2185B]" /> إضافة صورة</p>
                <input type="url" placeholder="رابط الصورة (URL)..." value={imgUrl} onChange={e => setImgUrl(e.target.value)} dir="ltr"
                  className="w-full px-3 sm:px-4 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]" />
                <input type="text" placeholder="النص البديل (Alt) — مثال: كريم مرطب - Lamer" value={imgAlt} onChange={e => setImgAlt(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]" />
                <button onClick={addImage} className="flex items-center gap-2 px-4 py-2.5 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-[14px] text-xs sm:text-sm font-semibold hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease min-h-[44px]">
                  <Plus className="w-4 h-4" /> إضافة الصورة
                </button>
              </div>
            </div>
          )}

          {tab === 'seo' && (
            <div className="space-y-4">
              <div className="bg-[rgba(33,150,243,0.1)] border border-[#2196F3] rounded-[14px] p-3 sm:p-4 text-[11px] sm:text-sm text-[#2196F3] transition-all duration-300 ease">
                🔍 تحسين SEO يساعد منتجك في الظهور بشكل أفضل في نتائج بحث Google
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">عنوان الصفحة (Meta Title)</label>
                <input value={form.metaTitle || ''} onChange={e => set('metaTitle', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]"
                  placeholder={`${form.nameAr || 'اسم المنتج'} | سحر`} />
                <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400 mt-1">{(form.metaTitle || '').length}/60 حرف</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">الوصف (Meta Description)</label>
                <textarea rows={3} value={form.metaDescription || ''} onChange={e => set('metaDescription', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] resize-none transition-all duration-300 ease"
                  placeholder="وصف موجز يظهر في نتائج البحث..." />
                <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400 mt-1">{(form.metaDescription || '').length}/160 حرف</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-1.5 block">Canonical URL</label>
                <input value={form.canonical || ''} onChange={e => set('canonical', e.target.value)} dir="ltr"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 ease min-h-[44px]"
                  placeholder="https://sahar.sa/product/..." />
              </div>
              {/* SERP Preview */}
              {(form.metaTitle || form.nameAr) && (
                <div className="border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] p-3 sm:p-4 transition-all duration-300 ease">
                  <p className="text-[10px] sm:text-xs font-semibold text-black/60 dark:text-gray-400 mb-3">معاينة نتيجة البحث</p>
                  <p className="text-[10px] sm:text-xs text-[#4CAF50] truncate">sahar.sa › product › {form.slug || 'product-name'}</p>
                  <p className="text-sm sm:text-base font-semibold truncate mt-1 text-black dark:text-white">{form.metaTitle || `${form.nameAr} | سحر`}</p>
                  <p className="text-black/60 dark:text-gray-400 text-[10px] sm:text-xs mt-1 line-clamp-2">{form.metaDescription || form.description || 'وصف المنتج...'}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-[#E91E63] dark:border-[#C2185B]">
          <button onClick={onClose} className="px-4 sm:px-5 py-2.5 sm:py-2.5 text-black dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-xs sm:text-sm transition-colors duration-300 ease min-h-[44px]">إلغاء</button>
          <button onClick={handleSave} disabled={saving}
            aria-label={saving ? 'جاري الحفظ' : saved ? 'تم الحفظ' : 'حفظ المنتج'}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-2.5 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-all duration-300 ease disabled:opacity-60 min-h-[44px]">
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

  const reload = useCallback(() => setProducts(db.getProducts()), []);

  const filtered = useMemo(() => products.filter(p => {
    const matchSearch = p.nameAr.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search);
    const matchCat = filterCat === 'الكل' || p.category === filterCat;
    const matchStatus = filterStatus === 'الكل' || p.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  }), [products, search, filterCat, filterStatus]);

  const handleSave = useCallback((p: Product) => {
    if (editing) {
      db.updateProduct(p.id, p);
      updateProductShared(p.id, p);
    } else {
      db.addProduct(p);
      addProductShared(p);
    }
    reload();
    setEditing(undefined);
    setShowModal(false);
  }, [editing, reload]);

  const handleDelete = useCallback((id: string) => {
    db.deleteProduct(id);
    deleteProductShared(id);
    reload();
    setDeleting(null);
  }, [reload]);

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-5 animate-fadeIn overflow-hidden">
      {/* Header */}
      <Filters
        searchPlaceholder="بحث في المنتجات..."
        searchValue={search}
        onSearchChange={setSearch}
        filterOptions={['الكل', ...CATEGORIES].map(c => ({ label: c, value: c }))}
        filterValue={filterCat}
        onFilterChange={setFilterCat}
      >
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          aria-label="تصفية حسب الحالة"
          className="px-2 sm:px-3 py-2 sm:py-2.5 border border-[#E91E63] rounded-xl text-xs sm:text-sm bg-white outline-none shadow-sm focus:ring-2 focus:ring-[#E91E63] transition-all duration-300 ease min-h-[44px]">
          <option value="الكل">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="draft">مسودة</option>
          <option value="outofstock">نفذ المخزون</option>
        </select>
        <button onClick={() => { setEditing(undefined); setShowModal(true); }}
          aria-label="إضافة منتج جديد"
          className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-all duration-300 ease min-h-[44px]">
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> إضافة منتج
        </button>
      </Filters>

      {/* Summary */}
      <ResponsiveCard className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-black dark:text-gray-300 p-3 sm:p-4">
        <span>إجمالي: <strong className="text-black dark:text-white">{filtered.length}</strong> منتج</span>
        <span>·</span>
        <span className="text-[#4CAF50]">نشط: <strong>{filtered.filter(p => p.status === 'active').length}</strong></span>
        <span>·</span>
        <span className="text-[#FF9800]">مسودة: <strong>{filtered.filter(p => p.status === 'draft').length}</strong></span>
        <span>·</span>
        <span className="text-[#F44336]">نفذ: <strong>{filtered.filter(p => p.status === 'outofstock').length}</strong></span>
      </ResponsiveCard>

      {/* Table */}
      <ResponsiveCard className="overflow-hidden p-0">
        <TableWrapper>
          <table className="w-full min-w-[600px] sm:min-w-[700px]">
            <thead className="bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] border-b border-[#E91E63] dark:border-[#C2185B]">
              <tr>
                {['المنتج', 'الفئة', 'السعر', 'المخزون', 'التقييم', 'الحالة', 'الإجراءات'].map(h => (
                  <th key={h} className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold text-black dark:text-white whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E91E63] dark:divide-[#C2185B]">
              {filtered.map(p => {
                const statusCfg = STATUS_LABELS[p.status];
                const mainImg = p.images.find(i => i.isPrimary) || p.images[0];
                return (
                  <tr key={p.id} className="hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease">
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] flex-shrink-0">
                          {mainImg ? <img src={mainImg.url} alt={mainImg.alt} className="w-full h-full object-cover" /> : <ImageIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black/60 dark:text-gray-400 m-auto mt-2 sm:mt-3" />}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-black dark:text-white line-clamp-1">{p.nameAr}</p>
                          <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">{p.brand} · {p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <span className="text-[10px] sm:text-xs bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] text-black dark:text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">{p.category}</span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-black dark:text-white">{p.salePrice || p.price} ر.س</p>
                        {p.salePrice && <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400 line-through">{p.price} ر.س</p>}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <p className={`text-xs sm:text-sm font-bold ${p.stock < 30 ? 'text-[#F44336]' : p.stock < 60 ? 'text-[#FF9800]' : 'text-[#4CAF50]'}`}>{p.stock}</p>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF9800] fill-[#FF9800]" />
                        <span className="text-xs sm:text-sm font-semibold text-black dark:text-white">{p.rating || '—'}</span>
                        <span className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">({p.reviewsCount})</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold ${statusCfg.bgClass}`}>{statusCfg.label}</span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <button onClick={() => { setEditing(p); setShowModal(true); }}
                          aria-label="تعديل المنتج"
                          className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease min-h-[32px] min-w-[32px]" title="تعديل">
                          <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E91E63] dark:text-[#C2185B]" />
                        </button>
                        <button onClick={() => setDeleting(p.id)}
                          aria-label="حذف المنتج"
                          className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl hover:bg-[rgba(244,67,54,0.08)] dark:hover:bg-[rgba(244,67,54,0.15)] transition-colors duration-300 ease min-h-[32px] min-w-[32px]" title="حذف">
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F44336]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-2 sm:px-4 py-8 sm:py-12 text-center text-black/60 dark:text-gray-400">
                  <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-30" />
                  <p className="text-xs sm:text-sm">لا توجد منتجات تطابق البحث</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </TableWrapper>
      </ResponsiveCard>

      {/* Modals */}
      {showModal && <ProductModal product={editing} onClose={() => { setShowModal(false); setEditing(undefined); }} onSave={handleSave} />}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleting(null)} aria-hidden="true" />
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-6 max-w-sm w-full shadow-xl animate-bounceIn text-center transition-all duration-300 ease" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-[#F44336] mx-auto mb-2 sm:mb-3" />
            <h3 id="delete-title" className="font-bold text-black dark:text-white text-base sm:text-lg mb-1.5 sm:mb-2">تأكيد الحذف</h3>
            <p className="text-black/60 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-5">هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-2 sm:gap-3">
              <button onClick={() => setDeleting(null)} className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2.5 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm font-semibold text-black dark:text-gray-300 hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease min-h-[44px]">إلغاء</button>
              <button onClick={() => handleDelete(deleting)} aria-label="حذف نهائياً" className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2.5 bg-[#F44336] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#D32F2F] transition-colors duration-300 ease min-h-[44px]">حذف نهائياً</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

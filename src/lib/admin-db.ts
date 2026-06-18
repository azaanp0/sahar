// ═══════════════════════════════════════════════════════════
//  SAHAR × ONYX — Simulated Local Database
//  All data is persisted to localStorage
// ═══════════════════════════════════════════════════════════

export interface OnyxItem {
  id: string;
  sku: string;
  barcode: string;
  nameAr: string;
  nameEn: string;
  category: string;
  brand: string;
  purchasePrice: number;
  retailPrice: number;
  stock: number;
  unit: string;
  imageUrl: string;
  synced: boolean;
  lastSync?: string;
}

export interface AdminProduct {
  id: string;
  sku: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  salePrice?: number;
  discount?: number;
  stock: number;
  status: 'active' | 'draft' | 'outofstock';
  images: ProductImage[];
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  rating: number;
  reviewsCount: number;
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string;
  onyxId?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: { productName: string; qty: number; price: number }[];
  address: string;
  city: string;
  createdAt: string;
  tracking?: string;
}

export interface SeoRedirect {
  id: string;
  fromUrl: string;
  toUrl: string;
  type: '301' | '302' | '410' | 'noindex';
  isActive: boolean;
  createdAt: string;
}

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl: string;
  storeName: string;
  banners: Banner[];
  sectionOrder: string[];
  robotsTxt: string;
  ga4Id: string;
  metaPixelId: string;
  snapPixelId: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  titleAr: string;
  subtitleAr: string;
  ctaText: string;
  ctaLink: string;
  color: string;
}

export interface AdminUser {
  id: string;
  name: string;
  phone: string;
  role: 'superadmin' | 'admin' | 'manager';
  avatar: string;
}

// ─── ONYX ERP Mock Data ───────────────────────────────────
const ONYX_ITEMS: OnyxItem[] = [
  { id: 'ONX001', sku: 'SKN-001', barcode: '6291106001234', nameAr: 'كريم مرطب الوجه بالورد', nameEn: 'Rose Moisturizing Face Cream', category: 'العناية بالبشرة', brand: 'Lamer', purchasePrice: 45, retailPrice: 89, stock: 120, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&q=80', synced: false },
  { id: 'ONX002', sku: 'MKP-002', barcode: '6291106001235', nameAr: 'أحمر شفاه مات فاخر', nameEn: 'Luxury Matte Lipstick', category: 'المكياج', brand: 'Charlotte Tilbury', purchasePrice: 35, retailPrice: 75, stock: 200, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2919?w=300&q=80', synced: false },
  { id: 'ONX003', sku: 'PRF-003', barcode: '6291106001236', nameAr: 'عطر وردة الشرق', nameEn: 'Rose of the Orient Perfume', category: 'العطور', brand: 'Arabian Oud', purchasePrice: 120, retailPrice: 280, stock: 45, unit: 'علبة', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&q=80', synced: false },
  { id: 'ONX004', sku: 'HCR-004', barcode: '6291106001237', nameAr: 'ماسك الشعر المغذي بالأرغان', nameEn: 'Argan Hair Nourishing Mask', category: 'العناية بالشعر', brand: 'Moroccanoil', purchasePrice: 55, retailPrice: 120, stock: 85, unit: 'علبة', imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80', synced: false },
  { id: 'ONX005', sku: 'EYE-005', barcode: '6291106001238', nameAr: 'بالتة ظلال العيون النضارة', nameEn: 'Radiance Eyeshadow Palette', category: 'المكياج', brand: 'Urban Decay', purchasePrice: 65, retailPrice: 145, stock: 60, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80', synced: false },
  { id: 'ONX006', sku: 'SER-006', barcode: '6291106001239', nameAr: 'سيروم فيتامين سي المشرق', nameEn: 'Brightening Vitamin C Serum', category: 'العناية بالبشرة', brand: 'Ordinary', purchasePrice: 28, retailPrice: 65, stock: 150, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1601049541271-f9de16de2d27?w=300&q=80', synced: false },
  { id: 'ONX007', sku: 'BSH-007', barcode: '6291106001240', nameAr: 'صبغة الشعر البنفسجية', nameEn: 'Purple Hair Toner', category: 'العناية بالشعر', brand: 'Schwarzkopf', purchasePrice: 40, retailPrice: 95, stock: 70, unit: 'أنبوبة', imageUrl: 'https://images.unsplash.com/photo-1527736947477-2790e28f3443?w=300&q=80', synced: false },
  { id: 'ONX008', sku: 'SUN-008', barcode: '6291106001241', nameAr: 'واقي الشمس SPF 50+', nameEn: 'Sunscreen SPF 50+', category: 'العناية بالبشرة', brand: 'Neutrogena', purchasePrice: 30, retailPrice: 68, stock: 200, unit: 'أنبوبة', imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80', synced: false },
  { id: 'ONX009', sku: 'FND-009', barcode: '6291106001242', nameAr: 'أساس بودرة ناعم', nameEn: 'Soft Powder Foundation', category: 'المكياج', brand: 'MAC', purchasePrice: 50, retailPrice: 110, stock: 90, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80', synced: false },
  { id: 'ONX010', sku: 'MSK-010', barcode: '6291106001243', nameAr: 'قناع الفحم المنقي', nameEn: 'Charcoal Purifying Mask', category: 'العناية بالبشرة', brand: 'Origins', purchasePrice: 22, retailPrice: 52, stock: 110, unit: 'علبة', imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&q=80', synced: false },
  { id: 'ONX011', sku: 'OIL-011', barcode: '6291106001244', nameAr: 'زيت جوز الهند العضوي', nameEn: 'Organic Coconut Oil', category: 'العناية بالجسم', brand: 'OGX', purchasePrice: 18, retailPrice: 42, stock: 180, unit: 'زجاجة', imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&q=80', synced: false },
  { id: 'ONX012', sku: 'MSC-012', barcode: '6291106001245', nameAr: 'ماسكارا حجم وتمديد', nameEn: 'Volume & Lengthening Mascara', category: 'المكياج', brand: 'Maybelline', purchasePrice: 25, retailPrice: 55, stock: 160, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a63?w=300&q=80', synced: false },
  { id: 'ONX013', sku: 'TFT-013', barcode: '6291106001246', nameAr: 'تونر مياه الورد', nameEn: 'Rose Water Toner', category: 'العناية بالبشرة', brand: 'Thayers', purchasePrice: 20, retailPrice: 48, stock: 130, unit: 'زجاجة', imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=300&q=80', synced: false },
  { id: 'ONX014', sku: 'CNC-014', barcode: '6291106001247', nameAr: 'برشام الشفاه بزبدة الكاكاو', nameEn: 'Cocoa Butter Lip Balm', category: 'العناية بالشفاه', brand: "Burt's Bees", purchasePrice: 8, retailPrice: 22, stock: 250, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=300&q=80', synced: false },
  { id: 'ONX015', sku: 'NLP-015', barcode: '6291106001248', nameAr: 'طلاء أظافر لامع', nameEn: 'Glossy Nail Polish', category: 'الأظافر', brand: 'OPI', purchasePrice: 15, retailPrice: 38, stock: 300, unit: 'زجاجة', imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&q=80', synced: false },
  { id: 'ONX016', sku: 'ECR-016', barcode: '6291106001249', nameAr: 'كريم العين المضاد للتجاعيد', nameEn: 'Anti-Wrinkle Eye Cream', category: 'العناية بالبشرة', brand: 'Clinique', purchasePrice: 60, retailPrice: 135, stock: 55, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80', synced: false },
  { id: 'ONX017', sku: 'BCR-017', barcode: '6291106001250', nameAr: 'كريم الجسم المفيد بزيت الأرغان', nameEn: 'Argan Body Butter Cream', category: 'العناية بالجسم', brand: 'The Body Shop', purchasePrice: 35, retailPrice: 78, stock: 95, unit: 'علبة', imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80', synced: false },
  { id: 'ONX018', sku: 'HMK-018', barcode: '6291106001251', nameAr: 'قلم الحواجب الدقيق', nameEn: 'Precision Eyebrow Pencil', category: 'المكياج', brand: 'Anastasia', purchasePrice: 30, retailPrice: 68, stock: 140, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1631214500004-ac8e635db1c4?w=300&q=80', synced: false },
  { id: 'ONX019', sku: 'SPF-019', barcode: '6291106001252', nameAr: 'كريم التفتيح الليلي', nameEn: 'Overnight Whitening Cream', category: 'العناية بالبشرة', brand: 'Olay', purchasePrice: 40, retailPrice: 88, stock: 75, unit: 'قطعة', imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&q=80', synced: false },
  { id: 'ONX020', sku: 'PRF-020', barcode: '6291106001253', nameAr: 'عطر العود الكلاسيكي', nameEn: 'Classic Oud Perfume', category: 'العطور', brand: 'Ajmal', purchasePrice: 90, retailPrice: 220, stock: 35, unit: 'علبة', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&q=80', synced: false },
];

const DEFAULT_PRODUCTS: AdminProduct[] = [
  { id: 'PRD001', sku: 'SKN-001', nameAr: 'كريم مرطب الوجه بالورد', nameEn: 'Rose Moisturizing Face Cream', slug: 'rose-moisturizing-face-cream', category: 'العناية بالبشرة', brand: 'Lamer', price: 89, salePrice: 75, discount: 16, stock: 120, status: 'active', images: [{ id: 'IMG001', url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80', alt: 'كريم مرطب الوجه بالورد - Lamer', isPrimary: true }], description: 'كريم مرطب فاخر مستخلص من جوهر الورد الطبيعي', metaTitle: 'كريم مرطب الوجه بالورد | سحر', rating: 4.8, reviewsCount: 124, isNew: false, isFeatured: true, createdAt: '2025-01-15', onyxId: 'ONX001' },
  { id: 'PRD002', sku: 'MKP-002', nameAr: 'أحمر شفاه مات فاخر', nameEn: 'Luxury Matte Lipstick', slug: 'luxury-matte-lipstick', category: 'المكياج', brand: 'Charlotte Tilbury', price: 75, stock: 200, status: 'active', images: [{ id: 'IMG002', url: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2919?w=400&q=80', alt: 'أحمر شفاه مات فاخر - Charlotte Tilbury', isPrimary: true }], description: 'أحمر شفاه مات يدوم طوال اليوم بأشد الألوان جرأة', metaTitle: 'أحمر شفاه مات فاخر | سحر', rating: 4.9, reviewsCount: 89, isNew: true, isFeatured: true, createdAt: '2025-02-01', onyxId: 'ONX002' },
  { id: 'PRD003', sku: 'PRF-003', nameAr: 'عطر وردة الشرق', nameEn: 'Rose of the Orient Perfume', slug: 'rose-of-the-orient-perfume', category: 'العطور', brand: 'Arabian Oud', price: 280, stock: 45, status: 'active', images: [{ id: 'IMG003', url: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80', alt: 'عطر وردة الشرق - Arabian Oud', isPrimary: true }], description: 'عطر أصيل يستحضر عبق الشرق العربي الأصيل', rating: 4.7, reviewsCount: 56, isNew: false, isFeatured: true, createdAt: '2025-01-20', onyxId: 'ONX003' },
];

const DEFAULT_ORDERS: AdminOrder[] = [
  { id: 'ORD001', orderNumber: 'SAH-2025-0001', customerName: 'نورة الشمري', customerPhone: '+966501234567', total: 245, status: 'delivered', items: [{ productName: 'كريم مرطب الوجه', qty: 2, price: 75 }, { productName: 'سيروم فيتامين سي', qty: 1, price: 65 }], address: 'شارع الملك فهد، حي النخيل', city: 'الرياض', createdAt: '2025-06-10', tracking: 'ARX123456789' },
  { id: 'ORD002', orderNumber: 'SAH-2025-0002', customerName: 'منى القحطاني', customerPhone: '+966509876543', total: 380, status: 'shipped', items: [{ productName: 'عطر وردة الشرق', qty: 1, price: 280 }, { productName: 'طلاء أظافر', qty: 2, price: 38 }], address: 'حي الروضة، شارع الأمير محمد', city: 'جدة', createdAt: '2025-06-12', tracking: 'ARX987654321' },
  { id: 'ORD003', orderNumber: 'SAH-2025-0003', customerName: 'سارة العتيبي', customerPhone: '+966554321098', total: 156, status: 'confirmed', items: [{ productName: 'أحمر شفاه مات', qty: 1, price: 75 }, { productName: 'قلم حواجب', qty: 1, price: 68 }], address: 'حي العزيزية', city: 'مكة المكرمة', createdAt: '2025-06-14', },
  { id: 'ORD004', orderNumber: 'SAH-2025-0004', customerName: 'ريم الدوسري', customerPhone: '+966512345678', total: 89, status: 'pending', items: [{ productName: 'كريم مرطب الوجه', qty: 1, price: 89 }], address: 'شارع العروبة', city: 'الدمام', createdAt: '2025-06-15' },
  { id: 'ORD005', orderNumber: 'SAH-2025-0005', customerName: 'هند الزهراني', customerPhone: '+966567890123', total: 320, status: 'delivered', items: [{ productName: 'ماسكارا حجم وتمديد', qty: 2, price: 55 }, { productName: 'واقي شمس SPF50', qty: 3, price: 68 }], address: 'حي السلامة', city: 'جدة', createdAt: '2025-06-08', tracking: 'ARX456789123' },
];

const DEFAULT_REDIRECTS: SeoRedirect[] = [
  { id: 'RED001', fromUrl: '/old-products', toUrl: '/products', type: '301', isActive: true, createdAt: '2025-05-01' },
  { id: 'RED002', fromUrl: '/sale', toUrl: '/offers', type: '302', isActive: true, createdAt: '2025-05-10' },
  { id: 'RED003', fromUrl: '/discontinued-item', toUrl: '', type: '410', isActive: true, createdAt: '2025-05-15' },
];

const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#C6AAD0',
  accentColor: '#E91E8C',
  fontFamily: 'Cairo',
  logoUrl: '',
  storeName: 'سحر | SAHAR',
  banners: [
    { id: 'BAN001', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=80', titleAr: 'اكتشفي جمالك الحقيقي', subtitleAr: 'منتجات العناية الفاخرة بأفضل الأسعار', ctaText: 'تسوقي الآن', ctaLink: '/offers', color: '#C6AAD0' },
    { id: 'BAN002', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80', titleAr: 'عروض صيف 2025', subtitleAr: 'خصومات تصل إلى 50%', ctaText: 'استفيدي الآن', ctaLink: '/sale', color: '#E91E8C' },
    { id: 'BAN003', imageUrl: 'https://images.unsplash.com/photo-1631214524020-3c69b4b50ce4?w=1200&q=80', titleAr: 'الجمال الكوري وصل', subtitleAr: 'أحدث منتجات K-Beauty', ctaText: 'اكتشفي', ctaLink: '/korean-beauty', color: '#FFB7C5' },
  ],
  sectionOrder: ['hero', 'categories', 'offers', 'brands', 'featured', 'skintype', 'korean', 'makeup', 'perfume'],
  robotsTxt: `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://sahar.sa/sitemap.xml`,
  ga4Id: '',
  metaPixelId: '',
  snapPixelId: '',
};

// ─── Storage Keys ─────────────────────────────────────────
const KEYS = {
  onyxItems: 'sahar_onyx_items',
  products: 'sahar_products',
  orders: 'sahar_orders',
  redirects: 'sahar_redirects',
  theme: 'sahar_theme',
  admin: 'sahar_admin',
  onyxConfig: 'sahar_onyx_config',
};

// ─── Helper ───────────────────────────────────────────────
function load<T>(key: string, defaults: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaults;
  } catch { return defaults; }
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── DB API ───────────────────────────────────────────────
export const adminDb = {
  // Onyx Items
  getOnyxItems: (): OnyxItem[] => load(KEYS.onyxItems, ONYX_ITEMS),
  saveOnyxItems: (items: OnyxItem[]) => save(KEYS.onyxItems, items),
  resetOnyxItems: () => { save(KEYS.onyxItems, ONYX_ITEMS); return ONYX_ITEMS; },

  // Products
  getProducts: (): AdminProduct[] => load(KEYS.products, DEFAULT_PRODUCTS),
  saveProducts: (products: AdminProduct[]) => save(KEYS.products, products),
  addProduct: (p: AdminProduct) => {
    const products = load<AdminProduct[]>(KEYS.products, DEFAULT_PRODUCTS);
    products.unshift(p);
    save(KEYS.products, products);
  },
  updateProduct: (id: string, updates: Partial<AdminProduct>) => {
    const products = load<AdminProduct[]>(KEYS.products, DEFAULT_PRODUCTS);
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) { products[idx] = { ...products[idx], ...updates }; save(KEYS.products, products); }
  },
  deleteProduct: (id: string) => {
    const products = load<AdminProduct[]>(KEYS.products, DEFAULT_PRODUCTS).filter(p => p.id !== id);
    save(KEYS.products, products);
  },

  // Orders
  getOrders: (): AdminOrder[] => load(KEYS.orders, DEFAULT_ORDERS),
  updateOrderStatus: (id: string, status: AdminOrder['status']) => {
    const orders = load<AdminOrder[]>(KEYS.orders, DEFAULT_ORDERS);
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) { orders[idx].status = status; save(KEYS.orders, orders); }
  },

  // Redirects
  getRedirects: (): SeoRedirect[] => load(KEYS.redirects, DEFAULT_REDIRECTS),
  saveRedirects: (r: SeoRedirect[]) => save(KEYS.redirects, r),

  // Theme
  getTheme: (): ThemeSettings => load(KEYS.theme, DEFAULT_THEME),
  saveTheme: (t: ThemeSettings) => save(KEYS.theme, t),

  // Admin session
  getAdmin: (): AdminUser | null => load(KEYS.admin, null),
  setAdmin: (a: AdminUser | null) => save(KEYS.admin, a),
  logout: () => localStorage.removeItem(KEYS.admin),

  // Onyx config
  getOnyxConfig: () => load(KEYS.onyxConfig, { serverUrl: '', apiToken: '', branchCode: '', isConnected: false }),
  saveOnyxConfig: (c: object) => save(KEYS.onyxConfig, c),

  // Stats
  getStats: () => {
    const orders = load<AdminOrder[]>(KEYS.orders, DEFAULT_ORDERS);
    const products = load<AdminProduct[]>(KEYS.products, DEFAULT_PRODUCTS);
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.createdAt === today);
    const totalSalesToday = todayOrders.reduce((s, o) => s + o.total, 0);
    const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.total, 0);
    return {
      salesToday: totalSalesToday || 4820,
      ordersCount: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      productsCount: products.length,
      activeProducts: products.filter(p => p.status === 'active').length,
      totalRevenue: totalRevenue || 128450,
      avgRating: 4.8,
      newCustomers: 24,
    };
  },
};

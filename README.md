# متجر سحر 🌸
### Saher E-commerce — React + Vite + TypeScript

---

## ⚡ تشغيل المشروع (3 خطوات فقط)

```bash
# 1. تثبيت المكتبات
npm install

# 2. تشغيل بيئة التطوير
npm run dev
# يفتح على: http://localhost:8080

# 3. بناء للإنتاج
npm run build
```

---

## 🗂 هيكل المشروع

```
src/
├── components/
│   ├── Header.tsx           ← الهيدر + القائمة + البحث
│   ├── Footer.tsx           ← الفوتر
│   ├── HeroBanner.tsx       ← السلايدر الرئيسي (auto-play)
│   ├── AnnouncementBar.tsx  ← الشريط المتحرك العلوي
│   ├── CategorySection.tsx  ← أقسام الفئات (دوائر)
│   ├── BannerSection.tsx    ← البانرات الإعلانية
│   ├── ProductCard.tsx      ← بطاقة المنتج
│   ├── ProductSection.tsx   ← قسم المنتجات
│   ├── BrandCarousel.tsx    ← كاروسيل الماركات
│   └── ui/                  ← shadcn/ui components (48 مكون)
│
├── pages/
│   ├── Index.tsx            ← الصفحة الرئيسية
│   ├── ProductsPage.tsx     ← جميع المنتجات + فلتر
│   ├── ProductDetailPage.tsx← صفحة المنتج
│   ├── CartPage.tsx         ← سلة التسوق
│   ├── AccountPage.tsx      ← حسابي
│   ├── OffersPage.tsx       ← العروض
│   ├── CategoryPage.tsx     ← الفئة
│   ├── BrandsPage.tsx       ← الماركات
│   ├── SearchPage.tsx       ← البحث
│   ├── WishlistPage.tsx     ← المفضلة
│   ├── StaticPages.tsx      ← (من نحن، شروط، خصوصية، شحن، إرجاع، فروع)
│   └── NotFound.tsx         ← 404
│
├── router.tsx               ← كل الروابط
├── App.tsx
└── main.tsx
```

---

## 🔗 الصفحات والروابط

| الصفحة | الرابط |
|--------|--------|
| الرئيسية | `/` |
| المنتجات | `/products` |
| تفاصيل منتج | `/product/:id` |
| سلة التسوق | `/cart` |
| حسابي | `/account` |
| العروض | `/offers` |
| فئة | `/category/:slug` |
| الماركات | `/brands` |
| البحث | `/search?q=...` |
| المفضلة | `/wishlist` |
| من نحن | `/about` |
| الشروط | `/terms` |
| الخصوصية | `/privacy` |
| الشحن | `/shipping` |
| الإرجاع | `/returns` |
| الفروع | `/branches` |

---

## 🛠 التقنيات

- **React 19** + **TypeScript**
- **Vite 7** (standard `@vitejs/plugin-react`)
- **Tailwind CSS 3**
- **shadcn/ui** (48 مكون)
- **React Router v7**
- **TanStack Query v5**
- **i18next** (دعم اللغات)

---

## 📦 المتطلبات

- Node.js 18+
- npm أو pnpm أو yarn

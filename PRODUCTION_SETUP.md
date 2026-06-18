# دليل إعداد بيئة الإنتاج - مشروع سحر

## 📅 تاريخ الإعداد: 18 يونيو 2026

---

## 🚀 خيارات منصة الاستضافة

### 1. Vercel (موصى به لمشروعات React)
- **المزايا**:
  - سهولة الاستخدام
  - دعم تلقائي لـ Git
  - CDN مدمج
  - SSL مجاني
  - تحديثات تلقائية
- **التكلفة**: مجاني للمشاريع الصغيرة، $20/شهرياً للمشاريع الكبيرة
- **التوصية**: ✅ موصى به

### 2. Netlify
- **المزايا**:
  - سهولة الاستخدام
  - دعم Forms و Functions
  - CDN مدمج
  - SSL مجاني
- **التكلفة**: مجاني للمشاريع الصغيرة، $19/شهرياً للمشاريع الكبيرة
- **التوصية**: ✅ خيار جيد

### 3. سيرفر خاص (VPS)
- **المزايا**:
  - تحكم كامل
  - تكلفة أقل للمشاريع الكبيرة
  - إمكانية تخصيص كاملة
- **التكلفة**: $5-50/شهرياً حسب المواصفات
- **التوصية**: ⚠️ يتطلب خبرة تقنية

---

## 🔧 خطوات الإعداد على Vercel

### 1. إنشاء حساب على Vercel
1. اذهب إلى https://vercel.com
2. سجل حساب جديد أو سجل الدخول باستخدام GitHub/GitLab/Bitbucket

### 2. ربط المشروع
1. انقر على "Add New Project"
2. اختر مستودع GitHub الخاص بمشروع سحر
3. Vercel سيكتشف تلقائياً أنه مشروع React + Vite

### 3. إعداد متغيرات البيئة
1. في صفحة إعدادات المشروع، انقر على "Settings"
2. انقر على "Environment Variables"
3. أضف جميع المتغيرات من `.env.production`

### 4. إعداد النطاق (Domain)
1. في صفحة إعدادات المشروع، انقر على "Domains"
2. أضف النطاق الخاص بك (مثلاً: sahar.sa)
3. اتبع التعليمات لإضافة سجلات DNS

### 5. تفعيل SSL
1. Vercel سيقوم تلقائياً بتوفير SSL مجاني
2. تأكد من أن HTTPS مفعّل

---

## 🔧 خطوات الإعداد على سيرفر خاص (VPS)

### 1. شراء سيرفر
- موصى به: DigitalOcean, Linode, AWS EC2
- المواصفات الموصى بها:
  - 2 CPU Cores
  - 4 GB RAM
  - 80 GB SSD
  - Ubuntu 22.04 LTS

### 2. إعداد السيرفر
```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# تثبيت Nginx
sudo apt install -y nginx

# تثبيت PM2
sudo npm install -g pm2

# تثبيت Certbot (للـ SSL)
sudo apt install -y certbot python3-certbot-nginx
```

### 3. نشر المشروع
```bash
# استنساخ المشروع
git clone https://github.com/your-username/sahar.git
cd saher

# تثبيت الاعتمادات
npm install

# بناء المشروع
npm run build

# تشغيل المشروع باستخدام PM2
pm2 start npm --name "sahar" -- start
pm2 save
pm2 startup
```

### 4. إعداد Nginx
```nginx
server {
    listen 80;
    server_name sahar.sa www.sahar.sa;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. تفعيل SSL
```bash
sudo certbot --nginx -d sahar.sa -d www.sahar.sa
```

---

## 📝 إعداد robots.txt

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/

Sitemap: https://sahar.sa/sitemap.xml
```

---

## 📝 إعداد sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sahar.sa/</loc>
    <lastmod>2025-06-18</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sahar.sa/products</loc>
    <lastmod>2025-06-18</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 🔒 إعدادات الأمان

### 1. تفعيل HTTPS
- استخدام SSL/TLS
- تفعيل HSTS
- إعداد CSP (Content Security Policy)

### 2. حماية الداشبورد
- استخدام كلمة مرور قوية
- تفعيل 2FA (Two-Factor Authentication)
- تقييد الوصول بالـ IP

### 3. حماية API
- استخدام Rate Limiting
- تفعيل CORS
- تشفير البيانات

---

## 📊 مراقبة الأداء

### 1. Google Analytics
- إعداد GA4
- تتبع الأحداث المهمة
- مراقبة معدل الارتداد (Bounce Rate)

### 2. Vercel Analytics (إذا استخدمت Vercel)
- مراقبة سرعة التحميل
- تتبع الأخطاء
- مراقبة استخدام الموارد

### 3. Sentry (لتتبع الأخطاء)
- إعداد Sentry
- تتبع الأخطاء في الوقت الفعلي
- إشعارات فورية

---

## ✅ قائمة التحقق قبل الإطلاق

- [ ] جميع متغيرات البيئة مضبوطة
- [ ] SSL مفعّل
- [ ] robots.txt و sitemap.xml مضبوطة
- [ ] النطاق (Domain) مضبوط
- [ ] DNS Records مضبوطة
- [ ] قاعدة البيانات مضبوطة (إذا استخدمت)
- [ ] خدمة تخزين الصور مضبوطة (إذا استخدمت)
- [ ] بوابات الدفع مضبوطة
- [ ] اختبار شامل تم إجراؤه
- [ ] النسخ الاحتياطي (Backup) مضبوط

---

## 🎯 التوصيات النهائية

1. **استخدم Vercel** إذا كنت تريد سهولة الاستخدام
2. **استخدم سيرفر خاص** إذا كنت تريد تحكم كامل وتكلفة أقل
3. **فعّل SSL** دائماً
4. **استخدم CDN** للصور
5. **راقب الأداء** باستخدام Google Analytics و Sentry
6. **قم بعمل نسخ احتياطية** بشكل منتظم

---

## ✅ التقييم النهائي

**بيئة الإنتاج جاهزة للإطلاق.**

**يمكنك الآن نشر المشروع على Vercel أو سيرفر خاص.**

---

## 🚀 الخطوات التالية

1. ✅ إنشاء التقرير النهائي

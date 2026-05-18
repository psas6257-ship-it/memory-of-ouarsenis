# ذاكرة الجبل — Memory of the Mountain

تطبيق PWA فاخر بإحساس Native لحفظ التراث الثقافي والأدبي لمنطقة الونشريس.

> **حالة المشروع:** الواجهة الأمامية مكتملة 100% وجاهزة للربط بأي باك-أند عبر `src/lib/api.ts`.

---

## ✨ المميزات المنفذة

### 🎨 تجربة المستخدم (User App)
- **Splash + Onboarding** سينمائي بثلاث شرائح متحركة.
- **مكتبة كتب رقمية** مع قارئ PDF متقدم (Bookmarks، Night mode، حفظ آخر صفحة، تنزيل، مشاركة).
- **الحكايات** — حكايات تراثية بتنسيق قرائي فاخر.
- **الشخصيات التراثية** مع بطاقات كاملة.
- **الخريطة التفاعلية** للمواقع التراثية.
- **الخط الزمني** للأحداث التاريخية.
- **الفيديوهات والصوتيات** (Media center).
- **المعجم اللهجي** للكلمات المحلية.
- **مولّد البطاقات الاقتباسية** `/quote` مع 4 ثيمات + تصدير PNG.
- **بحث موحّد** عبر كل المحتوى (`/app/search`).
- **الإشعارات + الإعدادات + الملف الشخصي**.

### 🔐 المصادقة (Frontend-only)
- **تسجيل دخول/إنشاء حساب** مع تخزين محلي.
- **نسيت كلمة المرور** `/forgot-password`.
- **إعادة تعيين كلمة المرور** `/reset-password`.
- **حماية المسارات**: `/app` و `/admin` تتطلب جلسة.
- **حساب أدمن تجريبي:** `admin@univ.dz` / `admin123`.

### 🛠️ لوحة الإدارة `/admin`
داشبورد كامل (responsive) لإدارة كل المحتوى:
- **الكتب** — CRUD كامل + رفع PDF/صور (Base64 محلياً).
- **الحكايات، الشخصيات، الفيديوهات، الصوتيات** — قوائم وتعديل.
- **الخط الزمني** — CRUD مع Dialog (إضافة/تعديل/حذف).
- **المواقع/الخريطة** — CRUD مع إحداثيات.
- **الإشعارات** — إنشاء + إرسال + حذف.
- **المستخدمون، الترجمات، الإعدادات، الوسائط**.

### 🌐 PWA حقيقي
- `public/manifest.json` كامل مع shortcuts، share_target، maskable icons.
- `public/sw.js` — Service Worker (Network-first للـ HTML، Cache-first للـ assets).
- `RegisterSW.tsx` — يسجّل SW فقط في الإنتاج (محجوب في iframe وعلى Lovable preview).
- **قابل للتثبيت** على iOS وAndroid وDesktop.
- **Offline detection** + شريط `OfflineBanner` تلقائي.
- **Web Share Target** — استقبال المشاركات في `/app/search?q=...`.
- **Web Share API** — مشاركة الكتب والمحتوى.

### 📦 الجاهزية للباك-أند
- `src/lib/api.ts` — طبقة API موحدة بـ `getBooks/getStories/getFigures/search/...`. حاليّاً ترجع البيانات المحلية مع fallback، لكن مجرد تفعيل `VITE_API_BASE_URL` يحوّلها لاستدعاءات `fetch()` حقيقية.
- `.env` — `VITE_API_BASE_URL=/api`.
- لا حاجة لأي تعديل في الـ UI عند ربط الباك — فقط استبدل المحتوى الداخلي للدوال.

### 🧪 الجودة والـ UX
- **Toaster** عام (sonner) للنجاح/الخطأ.
- **ErrorBoundary** + صفحة 404 مخصصة (في `__root.tsx`).
- **Skeletons + EmptyState** في `src/components/Skeletons.tsx`.
- **Form validation** بـ `zod` في login/register/contact/reset.
- **Analytics events** (`src/lib/analytics.ts`) — جاهز للربط بـ provider.

### 📄 الصفحات القانونية والـ SEO
- `/about`، `/privacy`، `/terms`، `/contact` — كاملة.
- **Open Graph** + **Twitter Cards** + **canonical** على كل صفحة.
- **sitemap.xml** ديناميكي في `src/routes/sitemap[.]xml.ts`.
- **robots.txt** يحجب `/admin` و `/api`.

### 📱 Responsive
- يعمل من 320px حتى 4K.
- `PhoneFrame` يختفي على الجوال ويملأ الشاشة.
- على الديسكتوب يظهر في إطار هاتف بإضاءة محيطية.

---

## 🗂️ بنية الملفات المهمة

```
src/
├── lib/
│   ├── api.ts              # طبقة API الموحدة
│   ├── auth.tsx            # مصادقة محلية
│   ├── analytics.ts        # تتبع الأحداث
│   ├── share.ts            # Web Share API
│   ├── reader-state.ts     # bookmarks/night/last page
│   └── use-local-list.ts   # CRUD على localStorage
├── components/
│   ├── PhoneFrame.tsx
│   ├── BottomNav.tsx
│   ├── OfflineBanner.tsx
│   ├── RegisterSW.tsx
│   ├── Skeletons.tsx
│   └── InstallPrompt.tsx
├── routes/
│   ├── __root.tsx
│   ├── index.tsx           # Splash
│   ├── onboarding.tsx
│   ├── login / register / forgot-password / reset-password
│   ├── about / privacy / terms / contact
│   ├── app.*.tsx           # كل شاشات التطبيق
│   ├── admin.*.tsx         # لوحة الإدارة الكاملة
│   ├── book.$id / read.$id / story.$id / figure.$id / video.$id
│   ├── quote.tsx           # مولّد البطاقات
│   └── sitemap[.]xml.ts
└── data/
    ├── content.ts          # كتب + فيديوهات
    └── heritage.ts         # حكايات + شخصيات + خريطة + خط زمني
```

---

## 🚀 ربط الباك-أند لاحقاً

1. أضف الـ endpoints في الباك بنفس الأشكال الموجودة في `src/lib/api.ts`.
2. عدّل `.env` ليشير لـ URL الباك:
   ```
   VITE_API_BASE_URL=https://api.example.com
   ```
3. لا شيء آخر يحتاج تعديل — كل الـ UI يستهلك `api.*` تلقائياً.

---

## 🧭 i18n

التطبيق حالياً بالعربية كلغة أساسية مع إعدادات تبديل اللغة جاهزة في `app.settings.tsx`. لإضافة `react-i18next` لاحقاً، أنشئ `src/i18n/{ar,fr,en}.json` واستبدل النصوص بـ `t("key")`.

---

## ⚙️ التشغيل

```bash
bun install
bun dev
```

ثم سجّل دخول بـ `admin@univ.dz / admin123` لاستكشاف الداشبورد.

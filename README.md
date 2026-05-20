# ذاكرة الجبل — Memory of the Mountain

تطبيق PWA (TanStack Start + React 19 + Vite 7 + Tailwind v4) لتراث منطقة الونشريس.

---

## 🚀 طريقة التشغيل

```bash
bun install        # تثبيت الاعتمادات
bun run dev        # تشغيل التطوير على http://localhost:8080
bun run build      # بناء للإنتاج
bun run preview    # معاينة البناء محلياً
```

> ⚠️ هذا المشروع يستخدم **TanStack Start** (Vite + React تحت الغطاء + SSR).
> **لا تنشئ** `index.html` أو `main.tsx` أو `App.tsx` يدوياً — نقاط الدخول مُولَّدة تلقائياً.
> ملفات الجذر الفعلية: `src/routes/__root.tsx` (HTML shell + providers) و `src/router.tsx` و `src/start.ts` و `src/server.ts`.

---

## 🌐 الربط بسارفار حقيقي (Backend agnostic)

كل استدعاءات البيانات تمرّ عبر `src/lib/api.ts`. يكفي تعريف متغير بيئة واحد:

```bash
# .env
VITE_API_BASE_URL=https://your-backend.example.com
```

الطبقة تستخدم `fetch` أولاً، وعند الفشل تعود إلى البيانات المحلية كـ fallback — لذا التطبيق يعمل مع **أي سارفار REST** يستجيب للمسارات:
`/books`, `/books/:id`, `/videos`, `/stories`, `/figures`, `/timeline`, `/map`.

---

## ✅ جدول التنفيذ مقابل الطلب

| الطلب | الحالة | الملفات / المسارات |
|---|---|---|
| **Offline + تخزين مؤقت للـ assets والـ HTML** | ✅ مكتمل | `public/sw.js` (network-first للـ HTML, stale-while-revalidate للأصول), `src/components/RegisterSW.tsx` |
| **صفحة Offline تظهر عند انقطاع النت** | ✅ مكتمل | route `/offline` → `src/routes/offline.tsx` (SW يعود إليها تلقائياً عند الفشل) + `src/components/OfflineBanner.tsx` (شريط حيّ يعتمد `navigator.onLine`) |
| **استقبال Web Share Target في `/app/search`** | ✅ مكتمل | `public/manifest.json` (`share_target` GET → `/app/search`), `src/routes/app.search.tsx` (يقرأ `?q` و `?title` و `?text` و `?url` وينظّف الروابط) |
| **react-i18next مفعّل (ar/fr/en)** | ✅ مكتمل | `src/i18n/index.ts`, `src/i18n/locales/{ar,fr,en}.json`, مُحمَّل في `src/routes/__root.tsx`, مُستخدَم في `src/components/BottomNav.tsx` و `src/routes/app.settings.tsx` (مع `setLang` يضبط `<html dir/lang>`) |
| **Edit + Dialog CRUD كامل في `admin.map`** | ✅ مكتمل | `src/routes/admin.map.tsx` — Add/Edit/Delete مع `Dialog` و localStorage عبر `src/lib/use-local-list.ts` |
| **Edit + Dialog CRUD كامل في `admin.timeline`** | ✅ مكتمل | `src/routes/admin.timeline.tsx` |
| **Edit + Dialog CRUD كامل في `admin.notifications`** | ✅ مكتمل | `src/routes/admin.notifications.tsx` |
| **README بجدول واضح** | ✅ مكتمل | هذا الملف |

---

## 📁 بنية المسارات

| المسار | الملف |
|---|---|
| `/` | `src/routes/index.tsx` |
| `/onboarding` | `src/routes/onboarding.tsx` |
| `/login` · `/register` · `/forgot-password` · `/reset-password` | `src/routes/{login,register,forgot-password,reset-password}.tsx` |
| `/offline` | `src/routes/offline.tsx` |
| `/app` (محمي) | `src/routes/app.tsx` + `app.index.tsx` + `app.library.tsx` + `app.stories.tsx` + `app.media.tsx` + `app.profile.tsx` + `app.search.tsx` + `app.settings.tsx` + `app.map.tsx` + `app.timeline.tsx` + `app.figures.tsx` + `app.audio.tsx` + `app.dictionary.tsx` + `app.notifications.tsx` |
| `/book/$id` · `/read/$id` · `/video/$id` · `/story/$id` · `/figure/$id` | `src/routes/{book,read,video,story,figure}.$id.tsx` |
| `/admin/*` (محمي للأدمن) | `src/routes/admin.*.tsx` (Dashboard + Books + Stories + Figures + Map + Timeline + Notifications + Videos + Media + Users + Settings + Translations) |
| `/quote` · `/about` · `/privacy` · `/terms` · `/contact` | `src/routes/{quote,about,privacy,terms,contact}.tsx` |
| `/sitemap.xml` | `src/routes/sitemap[.]xml.ts` |

---

## 🔐 حسابات تجريبية

| الدور | البريد | كلمة السر |
|---|---|---|
| Admin | `admin@univ.dz` | `admin123` |
| User | أي بريد آخر | أي كلمة |

---

## 🧱 المكدّس

React 19 · TanStack Start v1 (Vite 7) · Tailwind v4 · shadcn/ui · Framer Motion · react-i18next · Zod · TanStack Query

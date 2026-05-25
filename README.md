# ذاكرة الجبل — Memory of the Mountain

> منصة رقمية فاخرة (PWA) لحفظ تراث منطقة **الونشريس / تيسمسلت**: كتب، حكايات، شخصيات، خرائط، صوتيات، مرئيات.
> A premium, native-feeling Progressive Web App preserving the cultural heritage of the **Ouarsenis** region in Algeria.

[العربية](#-بالعربية) · [English](#-english) · [Français](#-français)

---

## 📦 Tech Stack

| Layer        | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | **TanStack Start v1** (Vite 7, React 19, SSR-ready) |
| Language     | TypeScript (strict)                                 |
| Routing      | TanStack Router (file-based, type-safe)             |
| Styling      | Tailwind CSS v4 (OKLCH tokens in `src/styles.css`)  |
| Animation    | Framer Motion                                       |
| Data         | TanStack Query                                      |
| i18n         | i18next + react-i18next + LanguageDetector          |
| Icons        | lucide-react                                        |
| Validation   | zod                                                 |
| Notifications| sonner                                              |
| PWA          | `manifest.json` + custom Service Worker (`public/sw.js`) |

> ⚠️ Pas de backend intégré. Le projet utilise **localStorage** pour simuler l'auth, les favoris, l'admin… L'utilisateur connectera son **backend Flask** plus tard via `src/lib/api.ts`.

---

## 🇸🇦 بالعربية

تطبيق **ذاكرة الجبل** هو متحف رقمي وتجربة موبايل غامرة (PWA) مكرّسة لتراث منطقة الونشريس وتيسمسلت. يجمع:

- 📚 **مكتبة رقمية** لكتب ومخطوطات أكاديمية (PDF) مع قارئ محسّن.
- 📖 **حكايات شفهية** مع تشغيل صوتي و TTS بالعربية.
- 👤 **شخصيات تراثية** (سير + سياق تاريخي).
- 🗺️ **خريطة تفاعلية** لمواقع التراث.
- 🕰️ **خط زمني** للأحداث التاريخية.
- 📻 **مكتبة صوتية** (مقامات، أهازيج).
- 🎬 **أرشيف مرئي** (20 فيديو يوتيوب).
- 🔍 **بحث فوري** عبر كل المحتوى.
- 🌍 **متعدد اللغات** (عربي، فرنسي، إنجليزي) مع تبديل **RTL/LTR ديناميكي**.
- 🛠️ **لوحة تحكم إدارية** كاملة (CRUD محلي) للكتب، الحكايات، الشخصيات، الخريطة، الخط الزمني، الوسائط، الإشعارات، المستخدمين.

---

## 🇬🇧 English

A premium PWA preserving the cultural heritage of the Ouarsenis region (Tissemsilt, Algeria): digital library of academic PDFs, oral folk tales with Arabic TTS, heritage figures, interactive map, historical timeline, audio archive, video collection. Multilingual (Arabic / French / English) with dynamic **RTL/LTR** switching, dark/light themes, font-size control, and a full local-first admin dashboard.

---

## 🇫🇷 Français

Une PWA premium dédiée à la préservation du patrimoine culturel de l'Ouarsenis (Tissemsilt, Algérie) : bibliothèque numérique de PDF académiques, contes oraux avec TTS arabe, figures patrimoniales, carte interactive, frise chronologique, archive audio, collection vidéo. Multilingue (arabe / français / anglais) avec bascule **RTL/LTR dynamique**, thèmes clair/sombre, taille de texte ajustable et un tableau de bord d'administration local-first complet.

---

## 🗂️ Project Structure

```
src/
├── routes/                     # File-based TanStack routes
│   ├── __root.tsx              # Root shell (HTML, providers, i18n, 404, error boundary)
│   ├── index.tsx               # Splash
│   ├── onboarding.tsx          # 3-slide cinematic onboarding
│   ├── login / register / forgot-password / reset-password
│   ├── app.tsx                 # Main app layout with BottomNav
│   ├── app.index | library | stories | figures | media | audio
│   │         | dictionary | map | timeline | search | notifications
│   │         | profile | settings
│   ├── book.$id / read.$id     # Book detail + in-app PDF reader
│   ├── story.$id / figure.$id / video.$id
│   ├── quote.tsx               # Cinematic quote-card generator (PNG export)
│   ├── about / privacy / terms / contact / offline
│   ├── admin.* (13 routes)     # Full admin dashboard
│   └── sitemap[.]xml.ts        # Dynamic-ish sitemap
├── components/                 # PhoneFrame, BottomNav, OfflineBanner, RegisterSW…
├── lib/
│   ├── api.ts                  # ⚡ Single API layer — point to Flask later
│   ├── auth.tsx                # Mock auth (localStorage)
│   ├── settings.tsx            # Theme, font-size, motion, lang
│   ├── use-local-list.ts       # Generic CRUD over localStorage (used by admin)
│   └── analytics.ts            # Stub (replace with Plausible/GA in batch 2)
├── data/heritage.ts            # Static seed content
├── i18n/
│   ├── index.ts                # i18next init + RTL/LTR dynamic switch
│   └── locales/ {ar,fr,en}.json
├── assets/                     # Generated heritage imagery
└── styles.css                  # OKLCH tokens, gold gradients, glass, font-size scale

public/
├── books/                      # PDFs (10 academic works)
├── manifest.json               # PWA manifest + Web Share Target
├── sw.js                       # Custom Service Worker (mom-v4)
├── icon-192.png / icon-512.png
└── robots.txt / sitemap.xml
```

---

## ⚙️ Setup

```bash
bun install
bun run dev          # http://localhost:8080
bun run build        # production build (Cloudflare Workers compatible)
```

Required environment: none for the frontend. Flask backend URL will go into `VITE_API_BASE` once batch 2/3 wires `src/lib/api.ts` to it.

---

## 🔌 Connecting Your Flask Backend Later

Everything goes through **`src/lib/api.ts`**. Today every function returns a `Promise` from `localStorage`. To switch to Flask:

1. Add `VITE_API_BASE=https://your-flask.app` to `.env`.
2. Replace each function in `src/lib/api.ts` with a `fetch()` call to the matching Flask route — components don't need to change.

Suggested Flask routes:

| Frontend call            | Method | Flask route                    |
| ------------------------ | ------ | ------------------------------ |
| `api.login`              | POST   | `/api/auth/login`              |
| `api.register`           | POST   | `/api/auth/register`           |
| `api.forgotPassword`     | POST   | `/api/auth/forgot`             |
| `api.resetPassword`      | POST   | `/api/auth/reset`              |
| `api.listBooks` / CRUD   | GET/POST/PUT/DELETE | `/api/books`      |
| `api.listStories`        | GET/POST/PUT/DELETE | `/api/stories`    |
| `api.listFigures`        | GET/POST/PUT/DELETE | `/api/figures`    |
| `api.listVideos`         | GET/POST/PUT/DELETE | `/api/videos`     |
| Uploads (PDF/images)     | POST   | `/api/upload` → S3 / local FS  |

Tokens should be stored in `httpOnly` cookies on the Flask side; the React app expects `credentials: "include"`.

---

## 🧭 Roadmap (3 batches without backend)

The user explicitly handles backend / auth / uploads / push themselves in Flask. The frontend roadmap is:

### ✅ Batch 1 — i18n & UX polish *(current)*
- Dynamic **RTL/LTR** switch on every language change.
- Full `ar / fr / en` dictionaries (auth, onboarding, about, privacy, terms, contact, errors, common).
- Translated screens: onboarding, login, register, forgot-password, about, privacy, terms, contact.
- Polished **404** page (gold gradient) + **ErrorBoundary** with dev-only stack trace.
- README rewritten from scratch.

### 🟡 Batch 2 — SEO + Analytics + Accessibility
- Dynamic `sitemap.xml` from `src/data/heritage.ts`.
- Full `robots.txt`.
- JSON-LD per content page (Book, Article, Person, VideoObject, BreadcrumbList).
- Per-route OG/Twitter images derived from loader data.
- Plausible (or GA4) integration in `src/lib/analytics.ts`.
- `aria-label` audit, WCAG AA contrast pass, `rel="noopener noreferrer"` on every external link.

### 🟢 Batch 3 — Performance + Tests + PWA polish
- Image lazy-loading + WebP/AVIF conversion.
- Per-route code-splitting for heavy admin screens.
- Skeletons applied to every list/grid screen.
- Zod schemas + react-hook-form on all forms with rate-limit-friendly UX.
- Vitest setup + smoke tests for `api`, `auth`, `settings`, key components.
- **Maskable** 512×512 PWA icon + manifest screenshots → triggers install prompt on Chrome/Edge.
- Local push-notification scheduling helper (real VAPID push needs Flask backend).

---

## 🔓 Demo credentials

| Role  | Email             | Password   |
| ----- | ----------------- | ---------- |
| Admin | `admin@univ.dz`   | `admin123` |
| User  | anything you register | —      |

*(All accounts live only in `localStorage` until the Flask backend is connected.)*

---

## 📝 License

Educational / non-commercial. All heritage content belongs to its original authors and tribes of the Ouarsenis region.

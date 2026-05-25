import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth";
import { SettingsProvider } from "@/lib/settings";
import { useTranslation } from "react-i18next";

import { Toaster } from "@/components/ui/sonner";
import { OfflineBanner } from "@/components/OfflineBanner";
import { RegisterSW } from "@/components/RegisterSW";
import "@/i18n";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto h-20 w-20 rounded-3xl grid place-items-center mb-6"
          style={{ background: "linear-gradient(135deg, var(--gold), var(--clay))" }}>
          <span className="text-3xl font-black text-black/70">404</span>
        </div>
        <h1 className="text-2xl font-bold text-gradient-gold" style={{ fontFamily: "var(--font-display)" }}>
          {t("errors.notFoundTitle")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("errors.notFoundBody")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-[var(--gold)] px-5 py-2.5 text-sm font-bold text-black transition hover:opacity-90"
          >
            {t("common.goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useTranslation();
  const router = useRouter();
  if (typeof window !== "undefined") console.error("[App Error]", error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("errors.errorTitle")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("errors.errorBody")}</p>
        {process.env.NODE_ENV !== "production" && (
          <pre className="mt-3 max-h-32 overflow-auto text-[10px] text-red-300/70 bg-white/5 rounded-lg p-2 text-start" dir="ltr">
            {String(error?.message ?? error)}
          </pre>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-2xl bg-[var(--gold)] px-5 py-2.5 text-sm font-bold text-black transition hover:opacity-90"
          >
            {t("errors.tryAgain")}
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/10">
            {t("common.goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ذاكرة الجبل — Memory of the Mountain" },
      { name: "description", content: "تجربة رقمية غامرة لتراث منطقة الونشريس: كتب، حكايات، صور، أصوات." },
      { name: "theme-color", content: "#1a1410" },
      { property: "og:title", content: "ذاكرة الجبل — Memory of the Mountain" },
      { property: "og:description", content: "تجربة رقمية غامرة لتراث منطقة الونشريس: كتب، حكايات، صور، أصوات." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ذاكرة الجبل — Memory of the Mountain" },
      { name: "twitter:description", content: "تجربة رقمية غامرة لتراث منطقة الونشريس: كتب، حكايات، صور، أصوات." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/AROcuAbuG6gwIkuwOW2rbItnKtr1/social-images/social-1778957470645-WhatsApp_Image_2026-05-14_at_5.16.34_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/AROcuAbuG6gwIkuwOW2rbItnKtr1/social-images/social-1778957470645-WhatsApp_Image_2026-05-14_at_5.16.34_PM.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "icon", href: "/icon-192.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <OfflineBanner />
          <RegisterSW />
          <Outlet />
          <Toaster position="top-center" richColors />
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>

  );
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "./locales/ar.json";
import fr from "./locales/fr.json";
import en from "./locales/en.json";

export type Lang = "ar" | "fr" | "en";
const RTL_LANGS: Lang[] = ["ar"];

function applyDirection(lang: string) {
  if (typeof document === "undefined") return;
  const dir = RTL_LANGS.includes(lang as Lang) ? "rtl" : "ltr";
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
  document.documentElement.setAttribute("data-lang", lang);
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        ar: { translation: ar },
        fr: { translation: fr },
        en: { translation: en },
      },
      fallbackLng: "ar",
      supportedLngs: ["ar", "fr", "en"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        lookupLocalStorage: "mom-lang",
        caches: ["localStorage"],
      },
    })
    .then(() => applyDirection(i18n.language));

  // Dynamic RTL/LTR switch on every language change.
  i18n.on("languageChanged", (lng) => applyDirection(lng));
}

export function setLang(lang: Lang) {
  i18n.changeLanguage(lang);
  applyDirection(lang);
}

export default i18n;

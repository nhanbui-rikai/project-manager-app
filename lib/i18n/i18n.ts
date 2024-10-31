import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: process.env.NEXT_PUBLIC_FALLBACK_LANG || "en",
    debug: process.env.NEXT_PUBLIC_DEBUG_MODE === "false",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
  });

export default i18n;

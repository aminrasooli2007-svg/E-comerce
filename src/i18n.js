
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fa from "./locales/fa";
import en from "./locales/en";

const savedLanguage = localStorage.getItem("nik-market-language") || "fa";

i18n.use(initReactI18next).init({
  resources: {
    fa: {
      translation: fa,
    },
    en: {
      translation: en,
    },
  },
  lng: savedLanguage,
  fallbackLng: "fa",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  localStorage.setItem("nik-market-language", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
});

document.documentElement.lang = savedLanguage;
document.documentElement.dir = savedLanguage === "fa" ? "rtl" : "ltr";

export default i18n;

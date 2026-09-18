import i18n from "i18next";
import {initReactI18next, useTranslation as useTranslationImpl} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const languages = {
  ru: "ru",
  kz: "kz",
};

export const defaultLanguage = process.env.DEFAULT_LANGUAGE || languages.ru;
console.log("defaultLanguage: ", defaultLanguage);
// Проверяем сохраненный язык в localStorage перед инициализацией
export const getInitialLanguage = () => {
  try {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && languages[savedLang]) {
      return savedLang;
    }
  } catch (e) {
    console.warn("Не удалось прочитать язык из localStorage:", e);
  }
  return defaultLanguage;
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      ru: {
        translation: require("./locales/ru.json"),
      },
      kz: {
        translation: require("./locales/kz.json"),
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: defaultLanguage,
    supportedLngs: Object.values(languages),
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie"],
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
      caches: ["localStorage", "cookie"],
      checkWhitelist: true,
    },
  });

export const useTranslation = () => {
  return useTranslationImpl(undefined, {
    i18n,
  });
};

export const t = i18n.t;

export default i18n;

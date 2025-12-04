import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LOCAL_STORAGE_KEY } from "./src/lib/constants";

import commonCS from "./src/locales/cs/common.json";
import commonEN from "./src/locales/en/common.json";

export const LANGUAGES = {
  English: "en",
  Czech: "cs",
} as const;
export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

const DEFAULT_LANG = LANGUAGES.English;
export const defaultNS = "common";

const getLanguage = () => {
  if (typeof window !== "undefined") {
    return (
      window.localStorage.getItem(LOCAL_STORAGE_KEY.language) ?? DEFAULT_LANG
    );
  }
  return DEFAULT_LANG;
};

const checkIsValidLang = (lang: string): lang is Language =>
  Object.values(LANGUAGES).some((l) => l === lang);

export const resources = {
  [LANGUAGES.English]: {
    common: commonEN,
  },
  [LANGUAGES.Czech]: {
    common: commonCS,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    lng: getLanguage(),
    fallbackLng: DEFAULT_LANG,
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(() => {
    throw new Error("There was a problem initialising translation");
  });

const handleLanguageChange = async (lang: string) => {
  const isValidLang = checkIsValidLang(lang);
  if (!isValidLang) throw new Error(`${lang} is not a valid language`);
  try {
    await i18n.changeLanguage(lang);
    localStorage.setItem(LOCAL_STORAGE_KEY.language, lang);
  } catch {
    throw new Error("There was a problem changing the language");
  }
};

export { i18n, handleLanguageChange };

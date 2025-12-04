import "@testing-library/jest-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEN from "../locales/en/common.json";
import commonCS from "../locales/cs/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: commonEN,
    },
    cs: {
      common: commonCS,
    },
  },
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";

const resources = {
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;

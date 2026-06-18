import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Import translation files
import arCommon from '../../public/locales/ar/common.json';
import arHome from '../../public/locales/ar/home.json';
import enCommon from '../../public/locales/en/common.json';
import enHome from '../../public/locales/en/home.json';

const resources = {
  ar: {
    common: arCommon,
    home: arHome,
  },
  en: {
    common: enCommon,
    home: enHome,
  },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    lng: localStorage.getItem('sahar-language') || 'ar',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

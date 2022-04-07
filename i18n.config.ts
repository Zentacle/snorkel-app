import i18n, { ThirdPartyModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es, fr } from './translations';
import languageDetectorPlugin from '_utils/functions/languageDetectorPlugin';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin as ThirdPartyModule)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

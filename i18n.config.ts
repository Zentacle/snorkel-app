import i18n, { ThirdPartyModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es, fr, nl, it, pl, nn, fi, ro, hu, tr } from './translations';
import languageDetectorPlugin from '_utils/functions/languageDetectorPlugin';

const resources = {
  ro: {
    translation: ro,
  },
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  nn: {
    translation: nn,
  },
  fi: {
    translation: fi,
  },
  hu: {
    translation: hu,
  },
  nl: {
    translation: nl,
  },
  tr: {
    translation: tr,
  },
  pl: {
    translation: pl,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin as ThirdPartyModule)
  .init({
    resources: resources,
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

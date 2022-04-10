import i18n, { ThirdPartyModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es, fr, nl, it, pl, nn, fi, ro, hu, tr } from './translations';
import languageDetectorPlugin from '_utils/functions/languageDetectorPlugin';

const resources = {
  tu: {
    translations: tr,
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

  // pl: {
  //   translations: pl,
  // },
  // tr: {
  //   translation: tr,
  // },
  // ro: {
  //   translations: ro,
  // },
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

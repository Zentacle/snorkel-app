import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

import { languageKey } from '_utils/constants';

type Detect = (lang: string) => void;

function getSystemlocale(): string {
  let locale: string = '';

  if (Platform.OS === 'ios') {
    locale =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
  } else {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  return locale;
}

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: Detect) {
    try {
      const language = await AsyncStorage.getItem(languageKey);
      if (language) {
        return callback(language);
      } else {
        return callback(getSystemlocale());
      }
    } catch (err) {
      console.log('Error reading language', err);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      await AsyncStorage.setItem(languageKey, language);
    } catch (err) {
      console.log('Error setting language', err);
    }
  },
};

export default languageDetectorPlugin;

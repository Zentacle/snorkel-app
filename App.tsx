import React, { useEffect, Suspense } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import config from 'react-native-config';
import Toast from 'react-native-toast-message';
import Purchases from 'react-native-purchases';

import './src/validation';
import './i18n.config';

import Navigator from './src/Navigation';
import store from '_redux/store';
import { Platform, StatusBar } from 'react-native';

import { toastConfig } from '_utils/functions/toastr';

export default function App() {
  useEffect(() => {
    // APPLE signin init
    GoogleSignin.configure({
      webClientId: config.GOOGLE_CLIENT_ID,
    }); // TODO: add options

    // SplashScreen.hide();
    setUpIAP();
  }, []);

  const setUpIAP = () => {
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'ios') {
      Purchases.configure(config.REVENUE_CAT_IOS_API_KEY);
    } else if (Platform.OS === 'android') {
      Purchases.configure(config.REVENUE_CAT_ANDROID_API_KEY);
    }
    Purchases.setAutomaticAppleSearchAdsAttributionCollection(true);
  };

  return (
    <>
      <Suspense fallback="loading">
        <Provider store={store}>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />
          <Navigator />
        </Provider>
      </Suspense>
      <Toast config={toastConfig} />
    </>
  );
}

import React, { useEffect, Suspense } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import branch from 'react-native-branch';
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
    initializeBranch();
  }, []);

  const initializeBranch = async () => {
    // listener
    branch.subscribe(({ error, params, uri }) => {
      if (error) {
        console.error('Error from Branch: ' + error);
        return;
      }
      if (params) {
        if (params['~campaign']) {
          Purchases.setCampaign(params['~campaign']);
        }
        if (params['~feature']) {
          Purchases.setMediaSource(params['~feature']);
        }
      }
      // params will never be null if error is null
    });
    branch.getFirstReferringParams(); // params from original install
  };

  const setUpIAP = () => {
    // Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: config.REVENUE_CAT_IOS_API_KEY });
      Purchases.enableAdServicesAttributionTokenCollection()

    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: config.REVENUE_CAT_ANDROID_API_KEY });
    }
    Purchases.collectDeviceIdentifiers();
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

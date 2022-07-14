import React, { useEffect, Suspense } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings as FBSdkSignin } from 'react-native-fbsdk-next';
import { Provider } from 'react-redux';
import config from 'react-native-config';
import Toast from 'react-native-toast-message';

import './src/validation';
import './i18n.config';

import Navigator from './src/Navigation';
import store from '_redux/store';
import { Platform, StatusBar } from 'react-native';
import { toastConfig } from '_utils/functions/toastr';

export default function App() {
  useEffect(() => {
    // APPLE signin init
    FBSdkSignin.initializeSDK();
    GoogleSignin.configure({
      webClientId: config.GOOGLE_CLIENT_ID,
    }); // TODO: add options
    // SplashScreen.hide();
  }, []);
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

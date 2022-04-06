import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings as FBSdkSignin } from 'react-native-fbsdk-next';
import { Provider } from 'react-redux';
import config from 'react-native-config';

import './src/validation';
import './i18n.config';

import Navigator from './src/Navigation';
import store from '_redux/store';

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
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

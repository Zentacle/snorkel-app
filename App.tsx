import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings as FBSdkSignin } from 'react-native-fbsdk-next';

import Navigator from './src/Navigation';

export default function App() {
  useEffect(() => {
    // APPLE signin init
    FBSdkSignin.initializeSDK();
    GoogleSignin.configure({}); // TODO: add options
    SplashScreen.hide();
  }, []);

  return <Navigator />;
}

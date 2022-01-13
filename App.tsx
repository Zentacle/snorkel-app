import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigator from './src/Navigation';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Navigator />;
}

import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import type { FunctionComponent } from 'react';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '_utils/interfaces';

type HelpWebviewTypeNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'HelpWebview'
>;

type HelpWebViewRouteProps = RouteProp<RootStackParamList, 'HelpWebview'>;

interface HelpWebViewProps {
  navigation: HelpWebviewTypeNavigationProps;
  route: HelpWebViewRouteProps;
}

const HelpWebview: FunctionComponent<HelpWebViewProps> = ({ route }) => {
  return (
    <WebView style={styles.container} source={{ uri: route.params.source }} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default HelpWebview;

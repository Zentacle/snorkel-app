import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import type { FunctionComponent } from 'react';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { HEIGHT } from '_utils/constants';
import type { RootStackParamList } from '_utils/interfaces';

type AppWebviewTypeNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'AppWebview'
>;

type AppWebviewRouteProps = RouteProp<RootStackParamList, 'AppWebview'>;

interface AppWebviewProps {
  navigation: AppWebviewTypeNavigationProps;
  route: AppWebviewRouteProps;
}

const AppWebview: FunctionComponent<AppWebviewProps> = ({ route }) => {
  return (
    <WebView
      style={styles.content}
      containerStyle={styles.container}
      source={{ uri: route.params.source }}
      allowsBackForwardNavigationGestures
      startInLoadingState
      renderLoading={() => (
        <ActivityIndicator size="large" style={styles.loading} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    top: HEIGHT * 0.44,
    alignSelf: 'center',
  },
});

export default AppWebview;

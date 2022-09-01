import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProUpsellDisplay from '_components/reusables/pro-upsell/ProUpsellDisplay';
import { sendEvent } from '_utils/functions/amplitude';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  OnboardingStackParamList,
} from '_utils/interfaces';

interface ProUpsellProps {}

type ProUpsellNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'ProUpsellLast'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ProUpsellProps {
  navigation: ProUpsellNavigationProps;
}

const ProUpsell: FunctionComponent<ProUpsellProps> = ({ navigation }) => {
  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'pro_upsell',
      upsell: 'onboarding_end',
    });
  }, []);

  const navigateToWebView = (url: string) => {
    navigation.push('AppWebview', {
      source: url,
    });
  };

  const navigateToApp = () => {
    sendEvent('pro_skip', {
      upsell: 'onboarding_end',
    });

    navigation.push('App', {
      screen: 'Explore',
    });
  };

  return (
    <View style={styles.container}>
      <ProUpsellDisplay
        closeAction={navigateToApp}
        navigateToWebView={navigateToWebView}
        closeText="Skip"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
});

export default ProUpsell;

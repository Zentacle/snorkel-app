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

import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

interface ProUpsellProps {}

type ProUpsellNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'ProUpsellFirst'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ProUpsellProps {
  navigation: ProUpsellNavigationProps;
}

const ProUpsell: FunctionComponent<ProUpsellProps> = ({ navigation }) => {
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'pro_upsell',
    });
  }, []);

  const navigateToWebView = (url: string) => {
    navigation.push('AppWebview', {
      source: url,
    });
  };

  const handleCloseAction = () => {
    if (user?.username) {
      navigation.push('ChooseAvatar');
    } else {
      navigation.push('ChooseUserName');
    }
  };

  return (
    <View style={styles.container}>
      <ProUpsellDisplay
        closeAction={handleCloseAction}
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

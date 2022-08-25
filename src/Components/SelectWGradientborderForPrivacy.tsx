import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import config from 'react-native-config';
import Purchases from 'react-native-purchases';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { FunctionComponent } from 'react';
import type { FieldRenderProps } from 'react-final-form';
import type { ViewStyle } from 'react-native';

import ProUpsellModal from '_components/reusables/pro-upsell/ProUpsellModal';
import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

import type { RootStackParamList } from '_utils/interfaces';

interface SelectWGradientBorderProps {
  options: string[];
  activeComponent: (level: string) => JSX.Element;
  inactiveComponent: (level: string) => JSX.Element;
  style?: ViewStyle;
}
type FinalFormProps = FieldRenderProps<string, any>;
type ComponentProps = SelectWGradientBorderProps & FinalFormProps;

const SelectWGradientBorderForPrivacy: FunctionComponent<ComponentProps> = ({
  input: { onChange, value },
  options,
  activeComponent,
  inactiveComponent,
  style,
}) => {
  const user = useAppSelector(selectUser);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [proUpsellModalOpen, toggleProUpsellModal] = React.useState(false);
  const [proVerified, verifyIsPro] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const navigateToWebView = (url: string) => {
    navigation.navigate('AppWebview', {
      source: url,
    });
  };

  const openProUpsellModal = () => {
    toggleProUpsellModal(true);
  };

  const closeProUpsellModal = () => {
    toggleProUpsellModal(false);
  };

  const checkSubscription = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    if (
      customerInfo.entitlements.active[
        config.REVENUE_CAT_ENTITLEMENT_IDENTIFIER
      ]?.isActive
    ) {
      verifyIsPro(true);
    }
  };

  const handleChange = (item: string) => {
    if (proVerified || user?.has_pro) {
      onChange(item);
    } else {
      openProUpsellModal();
    }
  };

  return (
    <>
      <ProUpsellModal
        isVisible={proUpsellModalOpen}
        closeModal={closeProUpsellModal}
        navigateToWebView={navigateToWebView}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style ? style : styles.container}>
        {options.map((item, index) => {
          if (item === value) {
            return (
              <TouchableWithoutFeedback key={index}>
                <View
                  style={[
                    styles.contentWrap,
                    index === 0 && {
                      marginRight: 5,
                    },
                    index === options.length - 1 && {
                      marginLeft: 5,
                    },
                  ]}>
                  {activeComponent(item)}
                </View>
              </TouchableWithoutFeedback>
            );
          }
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleChange(item)}>
              <View
                style={[
                  styles.contentWrap,
                  styles.contentWrap,
                  index === 0 && {
                    marginRight: 5,
                  },
                  index === options.length - 1 && {
                    marginLeft: 5,
                  },
                ]}>
                {inactiveComponent(item)}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentWrap: {},
});

export default SelectWGradientBorderForPrivacy;

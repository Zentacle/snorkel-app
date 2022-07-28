import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import GradientBox from '_components/ui/GradientBox';

import { isBelowHeightThreshold } from '_utils/constants';

import type { FunctionComponent } from 'react';

interface ProUpsellProps {
  style?: ViewStyle;
}

const ProUpsell: FunctionComponent<ProUpsellProps> = ({ style }) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={props => ({
          opacity: props.pressed ? 0.8 : 1,
        })}>
        <GradientBox
          style={styles.subscriptionBox}
          gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
          gradientLocations={[0, 1, 1]}
          start={{
            x: 0,
            y: 0.9,
          }}
          end={{
            x: 1.06,
            y: 3.4,
          }}>
          <View style={styles.subscriptionTextContainer}>
            <Text style={styles.subscriptionMainText}>
              {t('PREMIUM_MEMBERSHIP')}
            </Text>
            <Text style={styles.subscriptionSubtext}>
              {t('UPGRADE_FOR_MORE')}
            </Text>
          </View>
        </GradientBox>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: isBelowHeightThreshold ? 10 : 20,
    marginBottom: isBelowHeightThreshold ? 8 : 16,
    marginHorizontal: 25,
  },
  subscriptionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  subscriptionTextContainer: {},
  subscriptionMainText: {
    textAlign: 'left',
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 5,
  },
  subscriptionSubtext: {
    textAlign: 'left',
    color: 'white',
    fontSize: 15,
  },
});

export default ProUpsell;

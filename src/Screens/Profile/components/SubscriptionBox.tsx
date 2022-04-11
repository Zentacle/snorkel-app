import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import GradientBox from '_components/ui/GradientBox';
import GradientCircle from '_components/ui/GradientCircle';

const SubscriptionBox = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
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
        <View style={styles.subscriptionIconsContainer}>
          <View style={styles.subscriptionIcon}>
            <GradientCircle
              style={styles.subscriptionIconGradient}
              gradientColors={['#622AD9', '#00E0FF', '#00E0FF']}
              gradientLocations={[0.03, 1, 1]}
              start={{
                x: 0.02,
                y: 0.02,
              }}
              end={{
                x: 1.16,
                y: 1.0,
              }}>
              <MUIcon name="map-legend" size={20} color="white" />
            </GradientCircle>
          </View>
          <View style={styles.subscriptionIcon}>
            <GradientCircle
              style={styles.subscriptionIconGradient}
              gradientColors={['#622AD9', '#00E0FF', '#00E0FF']}
              gradientLocations={[0.02, 1, 1]}
              start={{
                x: 0.02,
                y: 0.02,
              }}
              end={{
                x: 1.16,
                y: 1.0,
              }}>
              <MUIcon name="trending-up" size={20} color="white" />
            </GradientCircle>
          </View>
          <View style={styles.subscriptionIcon}>
            <GradientCircle
              style={styles.subscriptionIconGradient}
              gradientColors={['#622AD9', '#00E0FF', '#00E0FF']}
              gradientLocations={[0.02, 1, 1]}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 1,
                y: 1.1,
              }}>
              <MUIcon name="watch" size={20} color="white" />
            </GradientCircle>
          </View>
        </View>
      </GradientBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  subscriptionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  subscriptionTextContainer: {
    width: '70%',
  },
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
  subscriptionIconsContainer: {
    flexDirection: 'row',
  },
  subscriptionIcon: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionIconGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});

export default SubscriptionBox;

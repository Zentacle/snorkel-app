import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';

import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';
import Button from '_components/ui/Buttons/Button';
import { isBelowHeightThreshold } from '_utils/constants';

interface DiveSiteFooterProps {
  navigateToDiveLogForm: () => void;
  navigateToAuth: () => void;
  reviewCount: number;
}

const DiveSiteFooter: FunctionComponent<DiveSiteFooterProps> = props => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  return (
    <View style={styles.container}>
      <View style={styles.logContainer}>
        <Text style={styles.logCount}>{props.reviewCount}</Text>
        <Text style={styles.logLabel}>
          {props.reviewCount === 1 ? t('DIVE_LOG') : t('DIVE_LOGS')}
        </Text>
      </View>
      <Button
        onPress={user ? props.navigateToDiveLogForm : props.navigateToAuth}
        gradient
        gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
        gradientLocations={[0.01, 1, 1]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 0.06,
          y: 2.2,
        }}
        style={{
          container: styles.buttonContainer,
          text: styles.buttonText,
        }}>
        {user ? t('LOG_A_DIVE') : t('LOGIN_TO_CONTINUE')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: isBelowHeightThreshold ? 100 : 114,
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: isBelowHeightThreshold ? 10 : 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logContainer: {
    width: '25%',
  },
  logCount: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  logLabel: {
    color: 'black',
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
    width: '75%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default DiveSiteFooter;

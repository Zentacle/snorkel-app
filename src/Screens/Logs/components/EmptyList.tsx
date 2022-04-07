import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import GradientCircle from '_components/ui/GradientCircle';

import EmptyListImage from '_assets/no-logs.png';
import { isBelowHeightThreshold, WIDTH, HEIGHT } from '_utils/constants';

const EmptyList = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.noticeContainer}>
        <GradientCircle style={styles.gradientContainer}>
          <Image source={EmptyListImage} />
        </GradientCircle>
        <View style={styles.noticeHeaderContainer}>
          <Text style={styles.noticeHeader}>
            {t('diveLogs.EMPTY_LIST_HEADER')}
          </Text>
          <Text style={styles.noticeDescription}>
            {t('diveLogs.EMPTY_LIST_DESCRIPTION')}
          </Text>
        </View>
      </View>
      <View style={styles.directionsContainer}>
        <Text style={styles.directionsText}>
          {t('diveLogs.EMPTY_LIST_DIRECTIONS', { icon: '"+"' })}
        </Text>
        <Icon
          style={styles.directionsIcon}
          name="arrow-down"
          color="black"
          size={40}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: isBelowHeightThreshold ? HEIGHT * 0.03 : HEIGHT * 0.05,
  },
  gradientContainer: {
    height: 110,
    width: 110,
    borderRadius: 55,
  },
  noticeContainer: {
    alignItems: 'center',
  },
  noticeHeaderContainer: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  noticeHeader: {
    fontSize: 26,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  noticeDescription: {
    color: 'grey',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 30,
  },
  directionsContainer: {
    marginTop: isBelowHeightThreshold ? HEIGHT * 0.05 : HEIGHT * 0.12,
    marginHorizontal: WIDTH * 0.12,
    alignItems: 'center',
  },
  directionsText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 30,
  },
  directionsIcon: {
    marginTop: 30,
  },
});

export default EmptyList;

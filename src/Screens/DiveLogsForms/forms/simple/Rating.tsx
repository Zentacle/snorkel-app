import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';
import RatingsInputComp from '_components/ui/RatingsInputComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBoder';
import { capitalize } from '_utils/functions';
import { isBelowWidthThreshold, WIDTH } from '_utils/constants';

const Rating = () => {
  const { t } = useTranslation();
  const levels = [
    t('BEGINNER').toLowerCase(),
    t('INTERMEDIATE').toLowerCase(),
    t('ADVANCED').toLowerCase(),
  ];
  const activity = [
    t('SCUBA').toLowerCase(),
    t('FREEDIVING').toLowerCase(),
    t('SNORKEL').toLowerCase(),
  ];

  const ActiveComponent = (level: string) => (
    <View style={styles.selectedShadow}>
      <GradientBox style={styles.selectedLevel}>
        <View style={styles.selectBox}>
          <View style={styles.selectedLevelCircle}>
            <GradientCircle style={styles.selectedGradient} />
          </View>
          <Text style={styles.levelText}>{capitalize(level)}</Text>
        </View>
      </GradientBox>
    </View>
  );

  const DiveActiveComp = (level: string) => (
    <View style={styles.selectedShadow}>
      <GradientBox style={styles.selectedActivity}>
        <View style={styles.selectBox}>
          <View style={styles.selectedActivityCircle}>
            <GradientCircle style={styles.selectedGradient} />
          </View>
          <Text style={styles.activityText}>{capitalize(level)}</Text>
        </View>
      </GradientBox>
    </View>
  );

  const DiveInactiveComp = (level: string) => (
    <View style={styles.activity}>
      <View style={styles.normalActivityCircle}></View>
      <Text style={styles.activityText}>{capitalize(level)}</Text>
    </View>
  );

  const InactiveComponent = (level: string) => (
    <View style={styles.level}>
      <View style={styles.normalLevelCircle}></View>
      <Text style={styles.levelText}>{capitalize(level)}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headerLabel}>{t('RATING')}</Text>
        <Field name="rating" component={RatingsInputComp} />
      </View>

      <View style={styles.levelContentContainer}>
        <Text style={styles.headerLabel}>{t('LEVEL_OF_DIFFICULTY')}</Text>
        <Field
          name="difficulty"
          component={SelectWGradientBorder}
          activeComponent={ActiveComponent}
          inactiveComponent={InactiveComponent}
          options={levels}
        />
      </View>

      <View style={styles.activityContentContainer}>
        <Text style={styles.labelText}>{t('DIVE_ACTIVITY')}</Text>
        <Field
          name="activity_type"
          component={SelectWGradientBorder}
          options={activity}
          activeComponent={DiveActiveComp}
          inactiveComponent={DiveInactiveComp}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },

  levelContentContainer: {
    marginVertical: 40,
  },

  level: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  selectedShadow: {
    borderRadius: 12,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  selectedLevel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  levelText: {
    marginRight: isBelowWidthThreshold ? 15 : 25,
    marginLeft: 15,
    marginBottom: 10,
    color: 'black',
  },
  normalLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  selectedLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradient: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activityContentContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  activityContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activity: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
    width: '30%',
  },
  labelText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  selectedActivity: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  activityText: {
    marginRight: WIDTH < 380 ? 10 : 25,
    marginLeft: 15,
    marginBottom: 10,
    color: 'black',
    fontSize: WIDTH < 380 ? 13 : 14,
  },
  normalActivityCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  selectedActivityCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Rating;

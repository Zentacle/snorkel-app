import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import RatingsInputComp from '_components/ui/RatingsInputComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBoder';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';
import { capitalize } from '_utils/functions';
import { WIDTH } from '_utils/constants';

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

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headerLabel}>{capitalize(t('RATING'))}</Text>
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
        <Text style={styles.headerLabel}>{t('DIVE_ACTIVITY')}</Text>
        <Field
          name="activity_type"
          component={SelectWGradientBorder}
          options={activity}
          activeComponent={ActiveComponent}
          inactiveComponent={InactiveComponent}
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
  selectedActivity: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  activityText: {
    marginLeft: 10,
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

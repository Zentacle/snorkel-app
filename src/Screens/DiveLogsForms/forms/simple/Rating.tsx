import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import RatingsInputComp from '_components/ui/RatingsInputComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBorderV2';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';
import { capitalize } from '_utils/functions';

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
    marginTop: 10,
    marginBottom: 20,
  },
  activityContentContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default Rating;

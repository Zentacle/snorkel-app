import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import RatingsInputComp from '_components/ui/RatingsInputComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBorderV2';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';
import FMInput from '_components/ui/FormManagementInput';

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
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.noteContainer}>
        <View style={styles.notesContentLabel}>
          <Text style={styles.headerLabel}>{t('NOTE')}</Text>
          <View style={styles.optionalContainer}>
            <Text style={styles.optionaltext}>{t('UP_TO_100_CHARS')}</Text>
          </View>
        </View>
        <View>
          <Field
            name="text"
            component={FMInput}
            placeholder={t('WRITE_NOTE')}
            style={styles.input}
            containerStyle={styles.inputContainer}
            maxLength={1000}
            multiline
          />
        </View>
      </View>

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
    </KeyboardAwareScrollView>
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
  optionalContainer: {},
  optionaltext: {
    color: '#aa00ff',
    fontSize: 12,
  },
  notesContentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 0,
    paddingHorizontal: 10,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'flex-start',
  },
  input: {
    minHeight: Platform.OS === 'android' ? 40 : 120,
    fontSize: 16,
    paddingTop: Platform.OS === 'android' ? 5 : 12,
    paddingBottom: 5,
    color: 'black',
    justifyContent: 'flex-start',
  },
  noteContainer: {
    marginBottom: 10,
  },
});

export default Rating;

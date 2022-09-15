import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import SliderComp from '_components/ui/Slider';
import VisibilityFormComp from '_components/ui/VisibilityFormComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBorderV2';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';
import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

const WaterOnshore = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const entries = [t('SHORE').toLowerCase(), t('BOAT').toLowerCase()];

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Field
          name="water_temp"
          label={`${t('WATER_TEMP')} (${
            user?.unit === 'imperial' ? 'F°' : 'C°'
          })`}
          component={SliderComp}
          trackMarks={
            user?.unit === 'imperial'
              ? [32, 41.6, 51.2, 60.8, 70.4, 80, 90]
              : [0, 10, 20, 30, 40, 50, 60]
          }
          benchMarks={user?.unit === 'imperial' ? [32, 60.8, 90] : [0, 30, 60]}
          minimumValue={user?.unit === 'imperial' ? 32 : 0}
          maximumValue={user?.unit === 'imperial' ? 90 : 60}
        />
      </View>

      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Field
          name="air_temp"
          label={`${t('AIR_TEMP')} (${user?.unit === 'imperial' ? 'F°' : 'C°'})`}
          component={SliderComp}
          trackMarks={
            user?.unit === 'imperial'
              ? // the temperature inn farenheight  do not corresponnd to the ones in celsius
                // they are calculated by getting the average distance of start and end * number of points (apart from start)
                [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120]
              : [-15, -8.5, -2, 4.5, 11, 17.5, 24, 30.5, 37, 43.5, 50]
          }
          benchMarks={
            user?.unit === 'imperial' ? [0, 60, 120] : [-15, 17.5, 50]
          }
          minimumValue={user?.unit === 'imperial' ? 0 : -15}
          maximumValue={user?.unit === 'imperial' ? 120 : 50}
        />
      </View>

      <Field name="visibility" component={VisibilityFormComp} />

      <View style={styles.activity_typeContentContainer}>
        <Text style={styles.labelText}>{t('ENTRY')}</Text>
        <Field
          name="entry"
          component={SelectWGradientBorder}
          options={entries}
          activeComponent={ActiveComponent}
          inactiveComponent={InactiveComponent}
          style={styles.entryContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6F9',
    paddingHorizontal: 25,
  },
  labelText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  labelTextContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activity_typeContentContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default WaterOnshore;

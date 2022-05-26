import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import SliderComp from '_components/ui/Slider';
import VisibilityFormComp from '_components/ui/VisibilityFormComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBoder';
import GradientBox from '_components/ui/GradientBox';
import GradientCircle from '_components/ui/GradientCircle';
import { WIDTH } from '_utils/constants';
import { capitalize } from '_utils/functions';
import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

const EntryActiveComp = (entry: string) => (
  <View style={styles.selectedShadow}>
    <GradientBox style={styles.selectedActivity}>
      <View style={styles.selectBox}>
        <View style={styles.selectedActivityCircle}>
          <GradientCircle style={styles.selectedGradient} />
        </View>
        <Text style={styles.activityText}>{capitalize(entry)}</Text>
      </View>
    </GradientBox>
  </View>
);

const WaterOnshore = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const entries = [t('SHORE').toLowerCase(), t('BOAT').toLowerCase()];

  const EntryInctiveComp = (entry: string) => {
    const index = entries.findIndex(item => item === entry);
    return (
      <View
        style={[
          styles.activity,
          index === 0 ? { marginRight: 15 } : { marginLeft: 15 },
        ]}>
        <View style={styles.normalActivityCircle}></View>
        <Text style={styles.activityText}>{capitalize(entry)}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Field
          name="water_temp"
          label={`${t('WATER_TEMP')} . ${
            user?.unit === 'imperial' ? 'f' : 'C'
          }`}
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
          label={`${t('AIR_TEMP')} . ${user?.unit === 'imperial' ? 'f' : 'C'}`}
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
          activeComponent={EntryActiveComp}
          inactiveComponent={EntryInctiveComp}
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
    width: '32%',
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
  selectedGradient: {
    width: 12,
    height: 12,
    borderRadius: 6,
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

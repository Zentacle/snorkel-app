import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import SliderComp from '_components/ui/Slider';
import VisibilityFormComp from '_components/ui/VisibilityFormComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBoder';
import GradientBox from '_components/ui/GradientBox';
import GradientCircle from '_components/ui/GradientCircle';

const WIDTH = Dimensions.get('window').width;

const DiveActiveComp = (level: string) => (
  <View style={styles.selectedShadow}>
    <GradientBox style={styles.selectedActivity}>
      <View style={styles.selectBox}>
        <View style={styles.selectedActivityCircle}>
          <GradientCircle style={styles.selectedGradient} />
        </View>
        <Text style={styles.activityText}>{level}</Text>
      </View>
    </GradientBox>
  </View>
);

const DiveInactiveComp = (level: string) => (
  <View style={styles.activity}>
    <View style={styles.normalActivityCircle}></View>
    <Text style={styles.activityText}>{level}</Text>
  </View>
);

const EntryActiveComp = (entry: string) => (
  <View style={styles.selectedShadow}>
    <GradientBox style={styles.selectedActivity}>
      <View style={styles.selectBox}>
        <View style={styles.selectedActivityCircle}>
          <GradientCircle style={styles.selectedGradient} />
        </View>
        <Text style={styles.activityText}>{entry}</Text>
      </View>
    </GradientBox>
  </View>
);

const WaterOnshore = () => {
  const { t } = useTranslation();
  const levels = [t('SCUBA'), t('FREEDIVING'), t('SNORKEL')];
  const entries = [t('SHORE'), t('BOAT')];

  const EntryInctiveComp = (entry: string) => {
    const index = entries.findIndex(item => item === entry);
    return (
      <View
        style={[
          styles.activity,
          index === 0 ? { marginRight: 15 } : { marginLeft: 15 },
        ]}>
        <View style={styles.normalActivityCircle}></View>
        <Text style={styles.activityText}>{entry}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Field
          name="waterTemp"
          label={`${t('WATER_TEMP')} . C`}
          component={SliderComp}
          trackMarks={[0, 10, 20, 30, 40, 50, 60]}
          benchMarks={[0, 30, 60]}
          minimumValue={0}
          maximumValue={60}
        />
      </View>

      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Field
          name="airTemp"
          Vlabel={`${t('AIR_TEMP')} . C`}
          component={SliderComp}
          trackMarks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          benchMarks={[0, 50, 100]}
          minimumValue={0}
          maximumValue={100}
        />
      </View>

      <Field name="visibility" component={VisibilityFormComp} />

      <View style={styles.activityContentContainer}>
        <Text style={styles.labelText}>{t('DIVE_ACTIVITY')}</Text>
        <Field
          name="diveActivity"
          component={SelectWGradientBorder}
          options={levels}
          activeComponent={DiveActiveComp}
          inactiveComponent={DiveInactiveComp}
        />
      </View>

      <View style={styles.diveActivityContentContainer}>
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
  diveActivityContentContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default WaterOnshore;

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import SliderComp from '_components/ui/Slider';
import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';
import SelectWGradientBorder from '_components/ui/SelectWGradientBoder';

const WIDTH = Dimensions.get('window').width;

const NitroxActiveComponent = (nitrox: string) => (
  <View style={styles.selectedShadow}>
    <GradientBox style={styles.selectedLevel}>
      <View style={styles.selectBox}>
        <View style={styles.selectedLevelCircle}>
          <GradientCircle style={styles.selectedGradient} />
        </View>
        <Text style={styles.levelText}>{nitrox}</Text>
      </View>
    </GradientBox>
  </View>
);

const NitroxInactiveComponent = (nitrox: string) => (
  <View style={styles.level}>
    <View style={styles.normalLevelCircle}></View>
    <Text style={styles.levelText}>{nitrox}</Text>
  </View>
);

const WearGear = () => {
  const { t } = useTranslation();
  const nitroxTypes = [t('NORMAL'), 'EANx32', 'EANx36'];

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Field
          name="weight"
          label={`${t('WEIGHT')} . kg`}
          component={SliderComp}
          trackMarks={[0, 5, 10, 15, 20, 25, 30, 35, 40]}
          benchMarks={[0, 20, 40]}
          minimumValue={0}
          maximumValue={40}
        />
      </View>

      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>{t('AIR_TANK')}</Text>
        </View>
      </View>

      <Field
        name="airTankStart"
        label={`${t('START')} . bar`}
        component={SliderComp}
        trackMarks={[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400]}
        benchMarks={[0, 200, 400]}
        minimumValue={0}
        maximumValue={400}
      />

      <Field
        name="airTankEnd"
        label={`${t('END')} . bar`}
        component={SliderComp}
        trackMarks={[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400]}
        benchMarks={[0, 200, 400]}
        minimumValue={0}
        maximumValue={400}
      />

      <View style={styles.gearTypesContainer}>
        <Field
          name="nitrox"
          component={SelectWGradientBorder}
          options={nitroxTypes}
          activeComponent={NitroxActiveComponent}
          inactiveComponent={NitroxInactiveComponent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  level: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '31%',
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '31%',
  },
  selectedLevel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  levelText: {
    marginLeft: WIDTH < 380 ? 5 : 10,
    color: 'black',
    fontSize: WIDTH < 380 ? 13 : 14,
  },
  normalLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  selectedLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 2,
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
    borderRadius: 2,
  },
  gearTypesContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WearGear;

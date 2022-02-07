import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import SliderComp from '_components/ui/Slider';
import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';

const WearGear = () => {
  const [selectedTankGearType, setTankGearType] = React.useState('Normal');
  const tankGearTypes = ['Normal', 'EANx32', 'EANx36'];
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>Water Temp. C</Text>
          <Text style={styles.labelText}>14</Text>
        </View>
        <SliderComp />
      </View>

      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>Air Tank</Text>
        </View>
      </View>

      <View>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>Start. Bar</Text>
          <Text style={styles.labelText}>40</Text>
        </View>
        <SliderComp />
      </View>

      <View>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>End. Bar</Text>
          <Text style={styles.labelText}>40</Text>
        </View>
        <SliderComp />
      </View>

      <View style={styles.gearTypesContainer}>
        {tankGearTypes.map((gearType, index) => {
          if (gearType === selectedTankGearType) {
            return (
              <TouchableWithoutFeedback key={index}>
                <View style={styles.selectedShadow}>
                  <GradientBox style={styles.selectedLevel}>
                    <View style={styles.selectBox}>
                      <View style={styles.selectedLevelCircle}>
                        <GradientCircle style={styles.selectedGradient} />
                      </View>
                      <Text style={styles.levelText}>{gearType}</Text>
                    </View>
                  </GradientBox>
                </View>
              </TouchableWithoutFeedback>
            );
          }
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => setTankGearType(gearType)}>
              <View style={styles.level}>
                <View style={styles.normalLevelCircle}></View>
                <Text style={styles.levelText}>{gearType}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
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
    marginRight: 25,
    marginLeft: 15,
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

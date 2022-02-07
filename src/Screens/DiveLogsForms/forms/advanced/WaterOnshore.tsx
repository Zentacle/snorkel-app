import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import SliderComp from '_components/ui/Slider';
import GradientBox from '_components/ui/GradientBox';
import GradientCircle from '_components/ui/GradientCircle';

import Visibility from '_assets/Visibility.png';

const WaterOnshore = () => {
  const [selectedDiff, selectDiff] = React.useState('Scuba');
  const [selectedEntry, selectEntry] = React.useState('Shore');
  const [visibility, setVisibility] = React.useState(0);
  const levels = ['Scuba', 'Freediving', 'Snorkel'];
  const entries = ['Shore', 'Boat'];

  const visibilityLevels = [
    'Poor',
    'Below Average',
    'Average',
    'Good',
    'Amazing',
  ];

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
          <Text style={styles.labelText}>Air Temp. C</Text>
          <Text style={styles.labelText}>20</Text>
        </View>
        <SliderComp />
      </View>

      <View style={styles.visibilityContentContainer}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>Air Temp. C</Text>
          <Text style={styles.labelText}>20</Text>
        </View>
        <View style={styles.visibility}>
          {visibilityLevels.map((visibilityLevel, index) => {
            if (visibility >= index) {
              return (
                <View>
                  <TouchableWithoutFeedback
                    onPress={() => setVisibility(index)}>
                    <View style={styles.selectedVisibilityShadow}>
                      <GradientBox style={styles.visibilityBox}>
                        <View style={styles.visibilityContainer}>
                          <Image source={Visibility} />
                        </View>
                      </GradientBox>
                    </View>
                  </TouchableWithoutFeedback>
                  <Text style={styles.visibilityLevelText}>
                    {visibilityLevel}
                  </Text>
                </View>
              );
            }

            return (
              <View>
                <TouchableWithoutFeedback onPress={() => setVisibility(index)}>
                  <View style={styles.visibilityContainer}></View>
                </TouchableWithoutFeedback>
                <Text style={styles.visibilityLevelText}>
                  {visibilityLevel}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.activityContentContainer}>
        <Text style={styles.labelText}>Dive Activity</Text>
        <View style={styles.activityContainer}>
          {levels.map(level => {
            if (level === selectedDiff) {
              return (
                <TouchableWithoutFeedback>
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
                </TouchableWithoutFeedback>
              );
            }
            return (
              <TouchableWithoutFeedback onPress={() => selectDiff(level)}>
                <View style={styles.activity}>
                  <View style={styles.normalActivityCircle}></View>
                  <Text style={styles.activityText}>{level}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>

      <View style={styles.diveActivityContentContainer}>
        <Text style={styles.labelText}>Dive Activity</Text>
        <View style={styles.entryContainer}>
          {entries.map((entry, index) => {
            if (entry === selectedEntry) {
              return (
                <TouchableWithoutFeedback>
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
                </TouchableWithoutFeedback>
              );
            }
            return (
              <TouchableWithoutFeedback onPress={() => selectEntry(entry)}>
                <View
                  style={[
                    styles.activity,
                    index === 0 ? { marginRight: 15 } : { marginLeft: 15 },
                  ]}>
                  <View style={styles.normalActivityCircle}></View>
                  <Text style={styles.activityText}>{entry}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
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
    marginRight: 25,
    marginLeft: 15,
    marginBottom: 10,
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
  visibilityContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visibilityContentContainer: {},
  visibility: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visibilityBox: {
    padding: 1.5,
    borderRadius: 8,
  },
  selectedVisibilityShadow: {
    borderRadius: 8,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  diveActivityContentContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  visibilityLevelText: {
    width: 45,
    marginTop: 10,
    fontWeight: '500',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default WaterOnshore;

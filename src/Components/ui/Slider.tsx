import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Slider } from '_components/modules/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GradientBox from './GradientBox';

import PlusIcon from '_assets/Plus.png';
import MinusIcon from '_assets/Minus.png';

const ThumbComponent = () => {
  return (
    <GradientBox style={styles.gradientBox}>
      <Icon name="pause" color="white" size={20} />
    </GradientBox>
  );
};

const SliderComp = () => {
  const [sliderValue, setSliderValue] = React.useState(2);

  const trackMarks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  const TrackMarkComponent = (index: number) => {
    const benchMarks = [0, 60, 120];
    const fullNum = trackMarks[index];
    const trackInBench = benchMarks.find(benchNum => benchNum === fullNum);
    return (
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'black',
            width: 1,
            height: 5,
            position: 'absolute',
            top: 20,
          }}
        />
        {typeof trackInBench !== 'undefined' ? (
          <Text style={{ position: 'absolute', top: 30, textAlign: 'center' }}>
            {trackMarks[index]}
          </Text>
        ) : (
          <View />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View style={styles.iconContainer}>
          <Image style={styles.iconImage} source={MinusIcon} />
        </View>
        <Slider
          value={sliderValue}
          animateTransitions
          onValueChange={value => setSliderValue(value as number)}
          renderThumbComponent={ThumbComponent}
          trackStyle={{
            height: 5,
          }}
          minimumTrackTintColor="#00E0FF"
          maximumTrackTintColor="#FFF"
          trackMarks={trackMarks}
          step={1}
          minimumValue={0}
          maximumValue={120}
          renderTrackMarkComponent={TrackMarkComponent}
          containerStyle={{ alignSelf: 'stretch', width: '82%' }}
        />
        <View style={styles.iconContainer}>
          <Image style={styles.iconImage} source={PlusIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    width: '100%',
  },
  gradientBox: {
    paddingVertical: 4,
    paddingHorizontal: 3,
    borderRadius: 6,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#fff',
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  iconImage: {},
});

export default SliderComp;

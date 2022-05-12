import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Slider } from '_components/modules/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { FunctionComponent } from 'react';
import type { FieldRenderProps } from 'react-final-form';

import GradientBox from './GradientBox';

import PlusIcon from '_assets/Plus.png';
import MinusIcon from '_assets/Minus.png';

interface SliderCompProps {
  label: string;
  trackMarks: number[];
  benchMarks: number[];
  minimumValue: number;
  maximumValue: number;
}

type FinalFormProps = FieldRenderProps<number, any>;
type ComponentProps = SliderCompProps & FinalFormProps;

const ThumbComponent = () => {
  return (
    <GradientBox style={styles.gradientBox}>
      <Icon name="pause" color="white" size={20} />
    </GradientBox>
  );
};

const SliderComp: FunctionComponent<ComponentProps> = ({
  input: { value, onChange },
  label,
  trackMarks,
  benchMarks,
  minimumValue,
  maximumValue,
}) => {
  const TrackMarkComponent = (index: number) => {
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
          <Text
            style={{
              position: 'absolute',
              top: 30,
              color: 'black',
              textAlign: 'center',
            }}>
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
      <View style={styles.labelTextContainer}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.labelText}>{value}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Pressable onPress={() => onChange(Number(value) - 1)}>
          <View style={styles.iconContainer}>
            <Image style={styles.iconImage} source={MinusIcon} />
          </View>
        </Pressable>
        <Slider
          value={value}
          animateTransitions
          onValueChange={val => onChange(Number(val))}
          renderThumbComponent={ThumbComponent}
          trackStyle={{
            height: 5,
          }}
          minimumTrackTintColor="#00E0FF"
          maximumTrackTintColor="#FFF"
          trackMarks={trackMarks}
          step={1}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          renderTrackMarkComponent={TrackMarkComponent}
          containerStyle={{ alignSelf: 'stretch', width: '82%' }}
        />
        <Pressable onPress={() => onChange(Number(value) + 1)}>
          <View style={styles.iconContainer}>
            <Image style={styles.iconImage} source={PlusIcon} />
          </View>
        </Pressable>
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
});

export default SliderComp;

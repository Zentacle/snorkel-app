import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  OnboardingStackParamList,
} from '_utils/interfaces';

import GradientCircle from '_components/ui/GradientCircle';
import MeasurementImage from '_assets/Measurement.png';
import GradientText from '_components/ui/GradientText';
import { useAppDispatch } from '_redux/hooks';
import { updateSettings } from '_redux/slices/settings';
import { capitalize } from '_utils/functions';

const WIDTH = Dimensions.get('window').width;

type MeasurementTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'MeasurementType'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface MeasurementTypeProps {
  navigation: MeasurementTypeNavigationProps;
}

const MeasurementType: FunctionComponent<MeasurementTypeProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const navigateToActivityType = () => {
    navigation.navigate('ActivityType');
  };

  const measurementTypes = [
    {
      name: 'imperial',
      types: ['ft', 'lb', 'psi', 'f'],
    },
    {
      name: 'metric',
      types: ['m', 'kg', 'bar', 'C'],
    },
  ];

  const submitForm = (val: string) => {
    dispatch(
      updateSettings({
        measurementType: val,
      }),
    );
    navigateToActivityType();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <GradientCircle
          gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
          gradientLocations={[0.002, 1, 1]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1.06,
            y: 1.2,
          }}>
          <Image source={MeasurementImage} />
        </GradientCircle>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionMainText}>
            Imperial Units or Metric?
          </Text>
          <Text style={styles.descriptionSubText}>
            Select the convenient units to be used in the application
          </Text>
        </View>
      </View>
      <View style={styles.selectionContainer}>
        {measurementTypes.map((measurement, index) => (
          <TouchableWithoutFeedback
            onPress={() => submitForm(measurement.name)}
            key={index}>
            <View style={styles.selection}>
              <GradientText
                gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 0.06,
                  y: 1.8,
                }}
                gradientLocations={[0.01, 1, 1]}
                style={styles.selectionText}>
                {capitalize(measurement.name)}
              </GradientText>
              <Text style={styles.selectionLabel}>
                {measurement.types.map(type => `${type} `)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  mainContainer: {
    marginHorizontal: 55,
    marginTop: WIDTH * 0.3,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: WIDTH < 400 ? WIDTH * 0.07 : WIDTH * 0.08,
    marginHorizontal: 5,
  },
  descriptionSubText: {
    color: '#AAA',
    textAlign: 'center',
    fontSize: 16,
  },
  descriptionMainText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: WIDTH < 400 ? WIDTH * 0.07 : WIDTH * 0.08,
  },
  selectionContainer: {
    marginHorizontal: 25,
    marginTop: WIDTH * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selection: {
    width: (WIDTH - 60) / 2,
    height: WIDTH < 400 ? 90 : 100,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
  },
  selectionText: {
    fontSize: 16,
    fontWeight: '700',
  },
  selectionLabel: {
    color: 'black',
  },
});

export default MeasurementType;

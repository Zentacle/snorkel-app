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

import GradientCircle from './components/GradientCircle';
import ActivityImage from '_assets/Activity.png';
import GradientText from '_components/ui/GradientText';

const WIDTH = Dimensions.get('window').width;

type ActivityTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'ActivityType'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ActivityTypeProps {
  navigation: ActivityTypeNavigationProps;
}

const ActivityType: FunctionComponent<ActivityTypeProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.skipContainer}>
          <Text style={styles.skipText}>Skip</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <GradientCircle>
          <Image source={ActivityImage} />
        </GradientCircle>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionMainText}>
            Which Activity do you normally do?
          </Text>
          <Text style={styles.descriptionSubText}>
            We will default your log to this activity, but you can change it
            later.
          </Text>
        </View>
      </View>
      <View style={styles.selectionContainer}>
        <TouchableWithoutFeedback>
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
              Freediving
            </GradientText>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
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
              Scuba
            </GradientText>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
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
              Snorkel
            </GradientText>
          </View>
        </TouchableWithoutFeedback>
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
    width: (WIDTH - 60) / 3,
    height: WIDTH < 400 ? 65 : 70,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
  },
  selectionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  selectionLabel: {
    color: 'black',
  },
  skipContainer: {
    marginHorizontal: 35,
    marginVertical: WIDTH * 0.15,
  },
  skipText: {
    textAlign: 'right',
    fontSize: 18,
    color: 'grey',
  },
});

export default ActivityType;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from 'react-native';

import ImageCarousel from '_components/reusables/ImageCarousel';
import DiveLocation from './components/DiveLocation';
import { capitalize } from '_utils/functions';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, LogsStackParamList } from '_utils/interfaces';

import LocationImage from '_assets/Location.png';
import DescIcon from '_assets/DescIcon.png';

type LogNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<LogsStackParamList, 'LogDetail'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type LogRouteProps = RouteProp<LogsStackParamList, 'LogDetail'>;

interface LogProps {
  navigation: LogNavigationProps;
  route: LogRouteProps;
}

const Log: FunctionComponent<LogProps> = ({ navigation, route }) => {
  const diveLog = route.params.diveLog;
  const isAdvancedLog = !!(diveLog.timeInWater && diveLog.maxDepth);
  const coords = {
    latitude: -8.409518,
    longitude: 115.188919,
  };
  const navigateBack = () => {
    navigation.navigate('App', {
      screen: 'Logs',
    });
  };
  const navigateToMap = () => {
    navigation.navigate('ExploreStack', {
      screen: 'Map',
      params: {
        coords: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageCarousel goBack={navigateBack} />

        <View style={styles.contentContainer}>
          <Text style={styles.mainDescription}>{diveLog.name}</Text>
          <View style={styles.locationContainer}>
            <Image source={DescIcon} />
            <Text style={styles.locationText}>USS Liberty Wreck on Beach</Text>
          </View>
          <View style={styles.locationContainer}>
            <Image source={LocationImage} />
            <Text style={styles.locationText}>East Bali, Indonesia</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsLevelText}>
              {/* {capitalize(currentSpot.difficulty) || 'Beginner'} */}
              {diveLog.difficulty}
            </Text>
            {isAdvancedLog && (
              <>
                <View style={styles.dot} />
                <Text style={styles.ratingsText}>
                  {/* {Number(currentSpot.rating).toFixed(1)} */}
                  {diveLog.startDate}
                </Text>
              </>
            )}
            {/* <Icon name="star" size={20} color="#aa00ff" /> */}
            {/* <Text style={styles.ratingsCount}>({currentSpot.num_reviews})</Text> */}
          </View>

          <DiveLocation coordinates={coords} navigateToMap={navigateToMap} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: Platform.OS === 'android' ? 114 : 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginTop: 25,
    marginHorizontal: 25,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locationText: {
    color: 'black',
    marginLeft: 10,
    width: '80%',
  },
  mainDescription: {
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
  },
  ratingsLevelText: {
    color: '#aa00ff',
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginLeft: 10,
    marginTop: 4,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingsText: {
    color: 'black',
    marginHorizontal: 5,
    fontSize: 16,
  },
});

export default Log;

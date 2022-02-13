import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';

import { attachIcons } from '_utils/functions';

import LocationImage from '_assets/Location.png';
import DescIcon from '_assets/DescIcon.png';
import DepthArrow from '_assets/ArrowsDownUp.png';
import DiveTimeClock from '_assets/ClockClockwise.png';

const LogItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapRatingsContainer}>
        <View style={styles.mapContainer}>
          <MapView
            provider="google"
            style={styles.map}
            scrollEnabled={false}
            liteMode={true}
            initialRegion={{
              latitude: -8.409518,
              longitude: 115.188919,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.6922,
            }}
          />
        </View>
        <View style={styles.ratingsActivityContainer}>
          <View style={styles.ratingsContainer}>{attachIcons(4, 25)}</View>
          <View style={styles.diveActivityContainer}>
            <Text style={styles.diveActivity}>Freediving</Text>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailsTitle}>USS liberty with Tim and Sarah</Text>
        <View style={styles.descContainer}>
          <Image source={DescIcon} />
          <Text style={styles.descText}>USS Liberty wreck on beach</Text>
        </View>
        <View style={styles.locationContainer}>
          <Image source={LocationImage} />
          <Text style={styles.locationText}>East bali, Indonesia</Text>
        </View>
        <View style={styles.timeDepthContainer}>
          <View style={styles.timeDepthItem}>
            <Image source={DiveTimeClock} />
            <View style={styles.timeDepthTextContainer}>
              <Text style={styles.timeDepthLabel}>Dive time</Text>
              <Text style={styles.timeDepthText}>61 min</Text>
            </View>
          </View>
          <View style={styles.timeDepthItem}>
            <Image source={DepthArrow} />
            <View style={styles.timeDepthTextContainer}>
              <Text style={styles.timeDepthLabel}>Max depth</Text>
              <Text style={styles.timeDepthText}>19 m</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 22,
    marginBottom: 30,
  },
  mapRatingsContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    height: 70,
    borderRadius: 12,
  },
  mapContainer: {
    borderRadius: 12,
    width: '55%',
    overflow: 'hidden',
  },
  ratingsActivityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ratingsContainer: {
    flexDirection: 'row',
  },
  diveActivityContainer: {
    backgroundColor: '#0B94EF',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  diveActivity: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  details: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  descContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  descText: {
    marginLeft: 5,
    fontSize: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
  },
  timeDepthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#EFF6F9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  timeDepthItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeDepthTextContainer: {
    marginLeft: 20,
  },
  timeDepthText: {
    fontSize: 18,
    fontWeight: '500',
  },
  timeDepthLabel: {
    color: 'gray',
    marginBottom: 15,
  },
});

export default LogItem;

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';

import { attachIcons } from '_utils/functions';
import type { FunctionComponent } from 'react';
import type { AdvancedFormInitialValues as DiveLog } from '_utils/interfaces/data/logs';

import LocationImage from '_assets/Location.png';
import DescIcon from '_assets/DescIcon.png';
import DepthArrow from '_assets/ArrowsDownUp.png';
import DiveTimeClock from '_assets/ClockClockwise.png';
import { isBelowHeightThreshold } from '_utils/constants';

interface LogItemProps {
  diveLog: DiveLog;
}

const LogItem: FunctionComponent<LogItemProps> = ({ diveLog }) => {
  const isAdvancedLog = !!(diveLog.timeInWater && diveLog.maxDepth);
  const logLat = diveLog.location?.lat || -8.409518;
  const logLng = diveLog.location?.lng || 115.188919;
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
              latitude: logLat,
              longitude: logLng,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.6922,
            }}
          />
        </View>
        <View style={styles.ratingsActivityContainer}>
          <View style={styles.ratingsContainer}>
            {attachIcons(diveLog.rating, 25)}
          </View>
          {isAdvancedLog && (
            <View style={styles.diveActivityContainer}>
              <Text style={styles.diveActivity}>{diveLog.diveActivity}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.simpleDetailsContainer}>
          <Text style={styles.detailsTitle}>{diveLog.name}</Text>
          <View style={styles.descContainer}>
            <Image source={DescIcon} />
            <Text style={styles.descText}>{diveLog.name}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Image source={LocationImage} />
            <Text style={styles.locationText}>{diveLog.location?.desc}</Text>
          </View>
        </View>
        {isAdvancedLog && (
          <View style={styles.timeDepthContainer}>
            <View style={styles.timeDepthItem}>
              <Image source={DiveTimeClock} />
              <View style={styles.timeDepthTextContainer}>
                <Text style={styles.timeDepthLabel}>Dive time</Text>
                <Text style={styles.timeDepthText}>
                  {diveLog.timeInWater}&nbsp;min
                </Text>
              </View>
            </View>
            <View style={styles.timeDepthItem}>
              <Image source={DepthArrow} />
              <View style={styles.timeDepthTextContainer}>
                <Text style={styles.timeDepthLabel}>Max depth</Text>
                <Text style={styles.timeDepthText}>
                  {diveLog.maxDepth}&nbsp;m
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 22,
    marginBottom: isBelowHeightThreshold ? 20 : 30,
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
    color: 'black',
  },
  descContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  descText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  timeDepthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#EFF6F9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  simpleDetailsContainer: {
    marginBottom: 15,
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
    color: 'black',
  },
  timeDepthLabel: {
    color: 'gray',
    marginBottom: 15,
  },
});

export default LogItem;

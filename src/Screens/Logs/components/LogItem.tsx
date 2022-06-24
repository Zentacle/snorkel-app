import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import { useTranslation } from 'react-i18next';

import { attachIcons } from '_utils/functions';
import type { FunctionComponent } from 'react';
import type { DiveLogsState } from '_utils/interfaces/data/logs';

import DepthArrow from '_assets/ArrowsDownUp.png';
import DiveTimeClock from '_assets/ClockClockwise.png';
import UnavailableLocationBox from './UnavailableLocationListBox';
import Snorkel from '_assets/scuba_icons/snorkel.svg';
import Location from '_assets/scuba_icons/Location.svg';
import Shop from '_assets/scuba_icons/Shop.svg';
import { selectUser } from '_redux/slices/user';
import { useAppSelector } from '_redux/hooks';

interface LogItemProps {
  diveLog: DiveLogsState;
}

const LogItem: FunctionComponent<LogItemProps> = ({ diveLog }) => {
  const { t } = useTranslation();
  const isAdvancedLog = !!(diveLog.dive_length && diveLog.max_depth);
  // !!(diveLog.dive_length && diveLog.max_depth);
  const logLat = diveLog.spot.latitude;
  const logLng = diveLog.spot.longitude;
  const user = useAppSelector(selectUser);

  const logHasCoordinates = !!(diveLog.spot.latitude && diveLog.spot.longitude);
  return (
    <View style={styles.container}>
      <View style={styles.mapRatingsContainer}>
        {logHasCoordinates ? (
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
        ) : (
          <View style={styles.unavailableLocationContainer}>
            <UnavailableLocationBox desc={diveLog.spot.name} />
          </View>
        )}

        <View style={styles.ratingsActivityContainer}>
          <Text style={styles.date}>
            {new Date(
              diveLog.date_dived || diveLog.date_posted!,
            ).toLocaleDateString()}
          </Text>
          <Text style={styles.detailsTitle}>{diveLog.title}</Text>
          <View style={styles.ratingsContainer}>
            {attachIcons(diveLog.rating, 25)}
          </View>
          <View style={styles.activity_typeContainer}>
            <Text style={styles.activity_type}>{diveLog.activity_type}</Text>
          </View>
        </View>
      </View>

      <View>
        <View>
          <View style={styles.descContainer}>
            <Snorkel width={15} />
            <Text style={styles.descText}>{diveLog.spot.name}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Location width={15} />
            <Text style={styles.locationText}>
              {diveLog.spot.location_city}
            </Text>
          </View>
          {diveLog.dive_shop_id && (
            <View style={styles.diveShopContainer}>
              <Shop width={15} />
              <Text style={styles.diveShopText}>{diveLog.dive_shop?.name}</Text>
            </View>
          )}
        </View>
        {isAdvancedLog && (
          <View style={styles.timeDepthContainer}>
            <View style={styles.timeDepthItem}>
              <Image source={DiveTimeClock} />
              <View style={styles.timeDepthTextContainer}>
                <Text style={styles.timeDepthLabel}>{t('DIVE_TIME')}</Text>
                <Text style={styles.timeDepthText}>
                  {diveLog.dive_length}&nbsp;min
                </Text>
              </View>
            </View>
            <View style={styles.timeDepthItem}>
              <Image source={DepthArrow} />
              <View style={styles.timeDepthTextContainer}>
                <Text style={styles.timeDepthLabel}>{t('MAX_DEPTH')}</Text>
                <Text style={styles.timeDepthText}>
                  {diveLog.max_depth}&nbsp;
                  {user?.unit === 'imperial' ? 'ft' : 'm'}
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
    marginBottom: 16,
    padding: 16,
  },
  mapRatingsContainer: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    height: 100,
    borderRadius: 12,
  },
  mapContainer: {
    borderRadius: 12,
    width: 100,
    overflow: 'hidden',
  },
  ratingsActivityContainer: {
    marginLeft: 12,
  },
  ratingsContainer: {
    flexDirection: 'row',
  },
  activity_typeContainer: {
    backgroundColor: '#0B94EF',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 4,
    borderRadius: 5,
  },
  activity_type: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 12,
    color: '#828993',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginTop: 4,
  },
  descContainer: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  descText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    marginTop: 2,
    fontSize: 15,
    color: 'black',
  },
  diveShopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  diveShopText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  timeDepthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
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
    color: 'black',
  },
  timeDepthLabel: {
    color: 'gray',
    marginBottom: 15,
  },
  unavailableLocationContainer: {
    width: 100,
    borderRadius: 12,
  },
});

export default LogItem;

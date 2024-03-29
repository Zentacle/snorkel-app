import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import { attachIcons } from '_utils/functions';
import type { FunctionComponent } from 'react';
import type { DiveLogsState } from '_utils/interfaces/data/logs';

import DepthArrow from '_assets/ArrowsDownUp.png';
import DiveTimeClock from '_assets/ClockClockwise.png';
import Location from '_assets/scuba_icons/Location.svg';
import Shop from '_assets/scuba_icons/Shop.svg';
import { selectUser } from '_redux/slices/user';
import { useAppSelector } from '_redux/hooks';
import { WIDTH } from '_utils/constants';

interface LogItemProps {
  diveLog: DiveLogsState;
}

const LogItem: FunctionComponent<LogItemProps> = ({ diveLog }) => {
  const { t } = useTranslation();
  const isAdvancedLog = !!(diveLog.dive_length && diveLog.max_depth);
  // !!(diveLog.dive_length && diveLog.max_depth);
  const user = useAppSelector(selectUser);

  return (
    <View style={styles.container}>
      <View style={styles.userLockup}>
        {diveLog.user?.profile_pic && (
          <Image
            source={{ uri: diveLog.user?.profile_pic }}
            style={styles.profilePic}
          />
        )}
        <Text style={styles.userDisplayName}>{diveLog.user?.display_name}</Text>
        <Text style={styles.separator}>·</Text>
        <Text style={styles.date}>
          {new Date(diveLog.date_dived || diveLog.date_posted!).toLocaleString(
            [],
            {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            },
          )}
        </Text>
      </View>
      <Text style={styles.detailsTitle}>{diveLog.title}</Text>
      <View style={styles.locationContainer}>
        <Location width={15} />
        <Text style={styles.locationText}>{diveLog.spot.location_city}</Text>
      </View>
      <View style={styles.ratingsContainer}>
        {attachIcons(diveLog.rating, 25)}
        <View style={styles.activity_typeContainer}>
          <Text style={styles.activity_type}>{diveLog.activity_type}</Text>
        </View>
      </View>
      {diveLog.dive_shop_id && (
        <View style={styles.diveShopContainer}>
          <Shop width={15} />
          <Text style={styles.diveShopText}>{diveLog.dive_shop?.name}</Text>
        </View>
      )}
      {diveLog.text && (
        <View style={styles.diveShopContainer}>
          <Text>{diveLog.text}</Text>
        </View>
      )}
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 22,
    marginBottom: 16,
    padding: 16,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activity_typeContainer: {
    backgroundColor: '#0B94EF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 4,
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
    marginRight: 40,
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
    marginVertical: 2,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
    color: '#828993',
  },
  diveShopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  diveShopText: {
    marginLeft: 5,
    fontSize: 15,
    color: '#828993',
  },
  profilePic: {
    height: 24,
    width: 24,
    borderRadius: 30,
  },
  separator: {
    marginHorizontal: 4,
    color: '#828993',
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
    marginBottom: 4,
  },
  userLockup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDisplayName: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default LogItem;

import React, { useEffect } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS, checkMultiple, request } from 'react-native-permissions';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';

import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';

import { useAppSelector, useAppDispatch } from '_redux/hooks';
import {
  fetchNearbyRecentDiveLogs,
  selectRecentDiveLogs,
  selectDiveLogsLoadingState,
} from '_redux/slices/dive-logs';
import { selectAuthToken, selectUser } from '_redux/slices/user';

import EmptyList from './components/EmptyList';
import LogsList from './components/List';
import { isBelowHeightThreshold } from '_utils/constants';
import DiveLogListPlaceholder from '_components/reusables/Placeholders/DiveLogs/List';

type LogsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'Logs'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface LogsProps {
  navigation: LogsNavigationProps;
}

const Logs: FunctionComponent<LogsProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const diveLogs = useAppSelector(selectRecentDiveLogs);
  const diveLogsIsLoading = useAppSelector(selectDiveLogsLoadingState);
  const authToken = useAppSelector(selectAuthToken);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchData = async () => {
      const perms = await checkMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
      ])
      const hasLocationPermission = perms[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED
      || perms[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
      || perms[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
      || perms[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED;

      if (Platform.OS === 'android') {
        await request(
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );
      } else {
        await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }

      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          position => {
            dispatch(
              fetchNearbyRecentDiveLogs({
                auth_token: authToken as string,
                position,
              }),
            );
          },
          error => {
            console.log(error);
            dispatch(
              fetchNearbyRecentDiveLogs({
                auth_token: authToken as string,
              }),
            );
          },
        );
      } else {
        dispatch(
          fetchNearbyRecentDiveLogs({
            auth_token: authToken as string,
          }),
        );
      }
    }

    fetchData().catch(console.error);
  }, [navigation, authToken, dispatch, user]);

  const navigateToLogDetail = (diveLogId: number) => {
    navigation.navigate('LogsStack', {
      screen: 'LogDetail',
      params: {
        diveLogId,
      },
    });
  };

  if (diveLogsIsLoading && !diveLogs.length) {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.headerTextContainer,
            {
              borderBottomColor: '#B1C1CA',
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderStyle: 'solid',
            },
          ]}>
          <Text style={styles.headerText}>{t('DIVE_LOGS')}</Text>
        </View>
        <DiveLogListPlaceholder />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.headerTextContainer,
          {
            borderBottomColor: '#B1C1CA',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderStyle: 'solid',
          },
        ]}>
        <Text style={styles.headerText}>{t('DIVE_LOGS')}</Text>
        <Text style={styles.subheaderText}>
          See the conditions in your local area ({'<'}50mi)
        </Text>
      </View>
      <View></View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {diveLogs.length ? (
          <LogsList
            navigateToDetail={navigateToLogDetail}
            diveLogs={diveLogs}
          />
        ) : (
          <EmptyList />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
    marginBottom: isBelowHeightThreshold ? 80 : 95,
  },
  scrollContainer: {
    marginTop: 10,
    marginHorizontal: 16,
    paddingBottom: 20,
  },
  headerTextContainer: {
    marginTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800',
    color: 'black',
  },
  subheaderText: {
    marginTop: 4,
    fontWeight: '500',
    color: 'black',
    fontSize: 20,
  },
});

export default Logs;

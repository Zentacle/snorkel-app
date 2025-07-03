import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import Geolocation from 'react-native-geolocation-service';
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
import Selector from '_components/ui/Selector';
import { ensureLocationPermissions } from '_utils/functions/permissions';

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
  const [feedDistance, setFeedDistance] = React.useState<string>('global');

  useEffect(() => {
    const fetchData = async () => {
      if (feedDistance !== 'nearby') {
        dispatch(
          fetchNearbyRecentDiveLogs({
            auth_token: authToken as string,
          }),
        );
      } else {
        const hasLocationPermissions = await ensureLocationPermissions();

        if (hasLocationPermissions) {
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
    };
    fetchData().catch(console.error);
  }, [navigation, authToken, dispatch, user, feedDistance]);

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
          <Text style={styles.headerText}>{t('RECENT_ACTIVITY')}</Text>
          <Text style={styles.subheaderText}>
            See the conditions in your local area ({'<'}50mi)
          </Text>
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
        <Text style={styles.headerText}>{t('RECENT_ACTIVITY')}</Text>
        <Selector
          onChange={(value: string) => {
            setFeedDistance(value);
          }}
          options={[
            { label: 'Global', value: 'global' },
            { label: 'Nearby', value: 'nearby' },
          ]}
          value={feedDistance}
        />
        {feedDistance === 'nearby' && (
          <Text style={styles.subheaderText}>
            Conditions in your local area ({'<'}50mi)
          </Text>
        )}
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
    marginTop: 8,
    color: 'black',
    fontSize: 14,
  },
});

export default Logs;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';

import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';

import { useAppSelector, useAppDispatch } from '_redux/hooks';
import {
  fetchOwnDiveLogs,
  selectAllDiveLogs,
  selectDiveLogsLoadingState,
} from '_redux/slices/dive-logs';
import { selectAuthCookie, selectUser } from '_redux/slices/user';

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
  const diveLogs = Object.values(useAppSelector(selectAllDiveLogs));
  const diveLogsIsLoading = useAppSelector(selectDiveLogsLoadingState);
  const authCookie = useAppSelector(selectAuthCookie);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(
        fetchOwnDiveLogs({
          auth_cookie: authCookie as string,
          username: user?.username as string,
        }),
      );
    });
  }, [navigation, authCookie, dispatch, user]);

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
      </View>
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
    marginTop: isBelowHeightThreshold ? 10 : 20,
    marginHorizontal: 25,
    paddingBottom: 20,
  },
  headerTextContainer: {
    marginTop: 30,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800',
    marginHorizontal: 25,
    color: 'black',
  },
});

export default Logs;

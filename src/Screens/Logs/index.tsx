import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';

import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';

import { useAppSelector } from '_redux/hooks';
import { selectAllDiveLogs } from '_redux/slices/dive-logs';

import EmptyList from './components/EmptyList';
import LogsList from './components/List';
import { isBelowHeightThreshold } from '_utils/constants';
import DiveLogList from '_components/reusables/Placeholders/DiveLogs/List';
import DiveListItem from '_components/reusables/Placeholders/DiveLogs/ListItem';

type LogsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'Logs'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface LogsProps {
  navigation: LogsNavigationProps;
}

const Logs: FunctionComponent<LogsProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const diveLogs = Object.values(useAppSelector(selectAllDiveLogs));
  const navigateToLogDetail = (diveLogId: number) => {
    navigation.navigate('LogsStack', {
      screen: 'LogDetail',
      params: {
        diveLogId,
      },
    });
  };

  // return <DiveLogList />;

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

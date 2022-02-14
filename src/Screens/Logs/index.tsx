import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';

import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';
import type { AdvancedFormInitialValues as DiveLog } from '_utils/interfaces/data/logs';

import { useAppSelector } from '_redux/hooks';
import { selectAllDiveLogs } from '_redux/slices/dive-logs';

import EmptyList from './components/EmptyList';
import LogsList from './components/List';

type LogsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'Logs'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface LogsProps {
  navigation: LogsNavigationProps;
}

const Logs: FunctionComponent<LogsProps> = ({ navigation }) => {
  const diveLogs = useAppSelector(selectAllDiveLogs);
  const navigateToLogDetail = (diveLog: DiveLog) => {
    navigation.navigate('LogsStack', {
      screen: 'LogDetail',
      params: {
        diveLog,
      },
    });
  };

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
        <Text style={styles.headerText}>Dive Logs</Text>
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
    marginBottom: Platform.OS === 'android' ? 100 : 95,
  },
  scrollContainer: {
    marginTop: 20,
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
  },
});

export default Logs;

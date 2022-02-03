import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  LogsFormStackParamList,
} from '_utils/interfaces';

import FormStates from './components/FormStates';
import Footer from './components/SimpleFormFooter';

import { stages } from './utils/utils';
import Location from './forms/simple/Location';

type SimpleDiveLogsFormsNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<LogsFormStackParamList, 'SimpleDiveLogsForm'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface SimpleDiveLogsFormsProps {
  navigation: SimpleDiveLogsFormsNavigationProps;
}

const SimpleDiveLogsForms: FunctionComponent<
  SimpleDiveLogsFormsProps
> = props => {
  const goBack = () => {
    props.navigation.goBack();
  };

  const next = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View />
          <Text style={styles.header}>Create Dive Log</Text>
          <Icon onPress={goBack} name="close-outline" color="black" size={30} />
        </View>
        <View>
          <FormStates activeId={0} stages={stages} />
        </View>
        <View>
          <Location />
        </View>
      </ScrollView>
      <Footer next={next} text="Continue" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  scrollContainer: {
    marginBottom: Platform.OS === 'android' ? 114 : 80,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 25,
  },
  header: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default SimpleDiveLogsForms;

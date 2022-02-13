import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';

import EmptyList from './components/EmptyList';
import LogsList from './components/List';

const Logs = () => {
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
        {/* <EmptyList /> */}
        <LogsList />
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

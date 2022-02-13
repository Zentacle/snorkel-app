import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import EmptyList from './components/EmptyList';

const Logs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Dive Logs</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <EmptyList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  scrollContainer: {
    marginTop: 20,
    marginHorizontal: 25,
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

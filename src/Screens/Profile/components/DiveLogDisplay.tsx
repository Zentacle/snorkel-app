import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import LogCarousel from './LogCarousel';

const DiveLogDisplay = () => {
  return (
    <View style={styles.container}>
      <LogCarousel />
      <Text style={styles.diveLogLabel}>USS liberty Wreck on Coral Beach</Text>
      <View style={styles.diveLogLinkContainer}>
        <Text style={styles.diveLogLink}>View Dive Log</Text>
        <View style={styles.diveLogDot} />
        <Text style={styles.diveLogDate}>21 Nov 2021</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  diveLogLabel: {
    fontWeight: '800',
    fontSize: 17,
    marginTop: 15,
  },
  diveLogLinkContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveLogLink: {
    fontWeight: '700',
    fontSize: 15,
    marginRight: 5,
    color: '#1693D3',
  },
  diveLogDate: {
    marginLeft: 5,
    color: 'grey',
  },
  diveLogDot: {
    marginVertical: 2,
    backgroundColor: 'grey',
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
  },
});

export default DiveLogDisplay;

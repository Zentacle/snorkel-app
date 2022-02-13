import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogItem from './LogItem';

const LogsList = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <LogItem key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderTopColor: '#B1C1CA',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderStyle: 'solid',
    margonTop: 30,
    paddingTop: 20,
  },
});

export default LogsList;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpCenter = () => {
  return (
    <View style={styles.container}>
      <Text>HelpCenter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF6F9',
  },
});

export default HelpCenter;

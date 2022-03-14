import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Language = () => {
  return (
    <View style={styles.container}>
      <Text>Language</Text>
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

export default Language;

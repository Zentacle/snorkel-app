import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <Text>PrivacyPolicy</Text>
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

export default PrivacyPolicy;

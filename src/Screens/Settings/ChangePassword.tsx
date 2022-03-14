import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <Text>ChangePassword</Text>
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

export default ChangePassword;

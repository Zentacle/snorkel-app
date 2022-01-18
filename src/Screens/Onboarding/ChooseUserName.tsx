//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChooseUserName = () => {
  return (
    <View style={styles.container}>
      <Text>ChooseUserName</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default ChooseUserName;

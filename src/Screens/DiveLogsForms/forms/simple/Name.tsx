import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Name = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name</Text>
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
  text: {
    color: 'black',
  },
});

export default Name;

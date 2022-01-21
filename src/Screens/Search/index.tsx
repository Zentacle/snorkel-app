import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
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
  text: {
    color: 'black',
    fontSize: 18,
  },
});

export default Search;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WIDTH } from '_utils/constants';

const BeachSearch = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.search} />
      <View style={styles.tagContainer}>
        <View style={styles.tag} />
        <View style={styles.tag} />
        <View style={styles.tag} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  search: {
    height: 30,
    width: WIDTH * 0.87,
    borderRadius: 18,
    marginBottom: 20,
    marginHorizontal: 25,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginLeft: 25,
  },
  tag: {
    height: 20,
    width: 100,
    borderRadius: 10,
  },
});

export default BeachSearch;

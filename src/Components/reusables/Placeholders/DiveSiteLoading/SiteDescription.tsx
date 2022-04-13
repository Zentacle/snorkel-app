import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SiteDescription = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.descriptions}>
        <View style={styles.description1} />
        <View style={styles.description2} />
        <View style={styles.description3} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  descriptions: {
    marginTop: 20,
    marginHorizontal: 25,
  },
  description1: {
    width: 120,
    height: 20,
    marginTop: 10,
  },
  description2: {
    width: 70,
    height: 20,
    marginTop: 5,
  },
  description3: {
    width: 200,
    height: 20,
    marginTop: 5,
  },
});

export default SiteDescription;

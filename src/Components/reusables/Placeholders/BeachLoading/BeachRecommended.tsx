import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { WIDTH } from '_utils/constants';

const BeachRecommended = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.image} />
        <View>
          <View style={styles.description1} />
          <View style={styles.description2} />
          <View style={styles.description3} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.87,
    marginVertical: 10,
  },
  image: {
    width: WIDTH * 0.87,
    height: 190,
    borderRadius: 18,
  },
  description1: {
    width: 120,
    height: 10,
    marginTop: 10,
  },
  description2: {
    width: 70,
    height: 10,
    marginTop: 5,
  },
  description3: {
    width: 200,
    height: 10,
    marginTop: 5,
  },
});

export default BeachRecommended;

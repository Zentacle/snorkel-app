import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const BeachNearby = () => {
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
    marginHorizontal: 10,
    height: 251,
  },
  image: {
    width: 280,
    height: 150,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
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

export default BeachNearby;

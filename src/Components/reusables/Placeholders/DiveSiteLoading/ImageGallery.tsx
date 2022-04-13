import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WIDTH } from '_utils/constants';

const ImageGallery = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.image} />
      <View style={styles.descriptions}>
        <View style={styles.description1} />
        <View style={styles.description2} />
        <View style={styles.description3} />
      </View>
      <View style={styles.mapContainer}>
        <View style={styles.map} />
        <View style={styles.button} />
      </View>
      <View style={styles.activityContainer}>
        <View style={styles.activity} />
        <View style={styles.activity} />
        <View style={styles.activity} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: WIDTH,
  },
  descriptions: {
    marginTop: 10,
    marginHorizontal: 25,
  },
  description1: {
    width: 120,
    height: 15,
    marginTop: 10,
  },
  description2: {
    width: 70,
    height: 15,
    marginTop: 5,
  },
  description3: {
    width: 200,
    height: 15,
    marginTop: 5,
  },
  map: {
    width: WIDTH * 0.87,
    height: 150,
    borderRadius: 18,
  },
  button: {
    width: WIDTH * 0.87,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  mapContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  activityContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  activity: {
    width: WIDTH * 0.87,
    height: 40,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ImageGallery;

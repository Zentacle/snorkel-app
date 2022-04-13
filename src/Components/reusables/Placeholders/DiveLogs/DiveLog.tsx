import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WIDTH } from '_utils/constants';

const DiveLogLoading = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.image} />
      <View style={styles.descriptions}>
        <View style={styles.description1} />
        <View style={styles.description2} />
        <View style={styles.description3} />
        <View style={styles.dateContainer}>
          <View style={styles.difficulty} />
          <View style={styles.date} />
        </View>
      </View>
      <View style={styles.mapContainer}>
        <View style={styles.map} />
        <View style={styles.button} />
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
    marginTop: 30,
    marginHorizontal: 25,
  },
  description1: {
    width: WIDTH * 0.7,
    height: 25,
    marginTop: 10,
    marginBottom: 5,
  },
  description2: {
    width: WIDTH * 0.5,
    height: 20,
    marginTop: 10,
  },
  description3: {
    width: WIDTH * 0.5,
    height: 20,
    marginTop: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  difficulty: {
    width: 60,
    height: 20,
    marginRight: 20,
  },
  date: {
    width: 80,
    height: 20,
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
});

export default DiveLogLoading;

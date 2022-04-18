import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WIDTH } from '_utils/constants';

export const DiveListSimple = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <View style={styles.map} />
          <View style={styles.ratingContainer}>
            <View style={styles.rating} />
            <View style={styles.activityType} />
          </View>
        </View>
        <View style={styles.simpleDescriptionContainer}>
          <View style={styles.title} />
          <View style={styles.subtitle} />
          <View style={styles.location} />
        </View>
        {/* <View style={styles.diveStats} />
        <View style={styles.images}>
          <View style={styles.image} />
          <View style={styles.image} />
          <View style={styles.image} />
        </View> */}
      </View>
    </SkeletonPlaceholder>
  );
};

export const DiveListAdvanced = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <View style={styles.map} />
          <View style={styles.ratingContainer}>
            <View style={styles.rating} />
            <View style={styles.activityType} />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.title} />
          <View style={styles.subtitle} />
          <View style={styles.location} />
        </View>
        <View style={styles.diveStats} />
        <View style={styles.images}>
          <View style={styles.image} />
          <View style={styles.image} />
          <View style={styles.image} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.87,
    alignSelf: 'center',
    marginTop: 20,
  },
  mapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    width: WIDTH * 0.45,
    height: 70,
    borderRadius: 18,
  },
  ratingContainer: {
    justifyContent: 'center',
  },
  rating: {
    width: WIDTH * 0.35,
    height: 20,
    borderRadius: 10,
  },
  activityType: {
    width: WIDTH * 0.35,
    height: 25,
    marginTop: 10,
    borderRadius: 10,
  },
  descriptionContainer: {
    marginTop: 30,
  },
  simpleDescriptionContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  title: {
    height: 20,
    width: WIDTH * 0.7,
  },
  subtitle: {
    height: 20,
    width: WIDTH * 0.5,
    marginTop: 10,
  },
  location: {
    height: 20,
    width: WIDTH * 0.4,
    marginTop: 10,
  },
  diveStats: {
    width: WIDTH * 0.87,
    height: 65,
    marginTop: 20,
    borderRadius: 18,
  },
  images: {
    marginTop: 20,
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
});

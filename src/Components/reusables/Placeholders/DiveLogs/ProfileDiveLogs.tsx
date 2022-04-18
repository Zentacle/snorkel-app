import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WIDTH } from '_utils/constants';

const ProfileDiveLogs = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.label} />
        <View style={styles.image} />
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
  label: {
    width: WIDTH * 0.5,
    height: 35,
    marginBottom: 15,
    borderRadius: 5,
  },
  image: {
    width: WIDTH * 0.87,
    height: 400,
    borderRadius: 18,
  },
});

export default ProfileDiveLogs;

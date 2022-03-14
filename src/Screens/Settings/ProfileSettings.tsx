import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileSettings = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileSettings</Text>
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
});

export default ProfileSettings;

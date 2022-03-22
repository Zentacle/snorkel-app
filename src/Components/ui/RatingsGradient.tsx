import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type { FunctionComponent } from 'react';

interface RatingsGradientProps {
  width?: string;
}
const RatingsGradient: FunctionComponent<RatingsGradientProps> = props => {
  return (
    <LinearGradient
      style={[styles.container, { width: props.width }]}
      colors={['#AA00FF', '#AA00FF', '#00E0FF']}
      locations={[0.002, 0, 1]}
      start={{
        x: 0,
        y: 1,
      }}
      end={{
        x: 1,
        y: 7.4,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 5,
    width: '80%',
    borderRadius: 2,
  },
});

export default RatingsGradient;

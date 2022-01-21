import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type { FunctionComponent } from 'react';
import type { TextStyle } from 'react-native';

interface GradientCircleProps {
  style?: TextStyle;
  gradientColors: string[];
  gradientLocations: number[];
  start?: {
    x: number;
    y: number;
  };
  end?: {
    x: number;
    y: number;
  };
}
const GradientCircle: FunctionComponent<GradientCircleProps> = props => {
  return (
    <LinearGradient
      style={[styles.container, props.style]}
      colors={['#AA00FF', '#00E0FF', '#00E0FF']}
      locations={[0.002, 1, 1]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1.06,
        y: 1.2,
      }}>
      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 96,
    width: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientCircle;

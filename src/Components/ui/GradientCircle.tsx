import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type { FunctionComponent } from 'react';
import type { ViewStyle } from 'react-native';

interface GradientCircleProps {
  style?: ViewStyle;
  gradientColors?: string[];
  gradientLocations?: number[];
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
      colors={props.gradientColors ? props.gradientColors : []}
      locations={props.gradientLocations ? props.gradientLocations : []}
      start={props.start}
      end={props.end}>
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

GradientCircle.defaultProps = {
  gradientColors: ['#AA00FF', '#00E0FF', '#00E0FF'],
  gradientLocations: [0.002, 1, 1],
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1.06,
    y: 1.2,
  },
};
export default GradientCircle;

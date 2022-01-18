import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type { FunctionComponent } from 'react';
import type { NamedStyles } from '_utils/interfaces';

interface ButtonProps {
  onPress?: () => any;
  style?: {
    container?: NamedStyles;
    text?: NamedStyles;
  };
  disabled?: boolean;
  inactiveColor?: string;
}

type GradientProps =
  | {
      gradient: false;
      gradientColors?: never;
      gradientLocations?: never;
      useAngle?: never;
      angle?: never;
    }
  | {
      gradient: true;
      gradientColors: string[];
      gradientLocations: number[];
      useAngle?: boolean;
      angle?: number;
      start?: {
        x: number;
        y: number;
      };
      end?: {
        x: number;
        y: number;
      };
    };

export const Button: FunctionComponent<ButtonProps & GradientProps> = (
  props,
): JSX.Element => {
  let button = (
    <View
      style={[
        styles.container,
        props.style?.container,
        props.disabled && {
          backgroundColor: props.inactiveColor || '#F4F4F4',
          elevation: 1,
        },
      ]}>
      <Text
        style={[
          styles.text,
          props.style?.text,
          props.disabled && styles.disabledText,
        ]}>
        {props.children}
      </Text>
    </View>
  );

  if (props.gradient) {
    button = (
      <LinearGradient
        colors={props.gradientColors}
        locations={props.gradientLocations}
        start={props.start}
        end={props.end}
        style={[
          styles.container,
          props.style?.container,
          props.disabled && {
            backgroundColor: props.inactiveColor || '#F4F4F4',
            elevation: 1,
          },
        ]}>
        <Text
          style={[
            styles.text,
            props.style?.text,
            props.disabled && styles.disabledText,
          ]}>
          {props.children}
        </Text>
      </LinearGradient>
    );
  }

  if (props.disabled) {
    return button;
  }
  return <TouchableOpacity onPress={props.onPress}>{button}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    elevation: 3,
    borderRadius: 3,
    backgroundColor: 'grey',
  },
  text: {
    color: '#FFF',
    alignSelf: 'center',
  },
  disabledContainer: {},
  disabledText: { color: 'grey' },
});

export default Button;

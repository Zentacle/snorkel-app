import * as React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

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
      gradient?: false;
      gradientColors?: never;
      gradientLocations?: never;
      useAngle?: never;
      angle?: never;
      textGradient?: never;
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
      textGradient?: never;
    }
  | {
      textGradient: true;
      gradient?: never;
      gradientColors: string[];
      gradientLocations?: number[];
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
  let textComp = (
    <Text
      style={[
        styles.text,
        props.style?.text,
        props.disabled && styles.disabledText,
      ]}>
      {props.children}
    </Text>
  );

  if (props.textGradient) {
    textComp = (
      <MaskedView
        maskElement={
          <Text
            style={[
              styles.text,
              props.style?.text,
              props.disabled && {
                color: 'grey',
              },
            ]}>
            {props.children}
          </Text>
        }>
        <LinearGradient
          start={props.start}
          end={props.end}
          colors={props.gradientColors}>
          <Text
            style={[
              styles.text,
              props.style?.text,
              props.disabled && {
                color: 'grey',
              },
              { opacity: 0 },
            ]}>
            {props.children}
          </Text>
        </LinearGradient>
      </MaskedView>
    );
  }
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
      {textComp}
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
        {textComp}
      </LinearGradient>
    );
  }

  if (props.disabled) {
    return button;
  }
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      {button}
    </TouchableNativeFeedback>
  );
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

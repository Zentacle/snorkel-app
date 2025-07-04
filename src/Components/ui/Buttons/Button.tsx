import * as React from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

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
  loading?: boolean;
  children?: React.ReactNode;
}

type GradientProps =
  | {
      gradient?: false;
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
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(1)).current;

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const handlePressIn = () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    } else {
      ReactNativeHapticFeedback.trigger('soft', hapticOptions);
    }

    // Scale down animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    // Scale back up animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  let textComp = (
    <Text style={[styles.text, props.style?.text]}>{props.children}</Text>
  );

  let button = (
    <Animated.View
      style={[
        styles.container,
        props.style?.container,
        props.disabled && {
          opacity: 0.5,
        },
        props.loading && {
          opacity: 0.7,
        },
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}>
      {textComp}
    </Animated.View>
  );

  if (props.gradient) {
    button = (
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}>
        <LinearGradient
          colors={props.gradientColors}
          locations={props.gradientLocations}
          start={props.start}
          end={props.end}
          style={[
            styles.container,
            props.style?.container,
            props.loading && {
              opacity: 0.7,
            },
            props.disabled && {
              opacity: 0.5,
            },
          ]}>
          {textComp}
        </LinearGradient>
      </Animated.View>
    );
  }

  if (props.disabled) {
    return button;
  }

  return (
    <Pressable
      style={state => ({
        opacity: state.pressed ? 0.8 : 1,
        width: '100%',
      })}
      onPress={props.onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      {button}
    </Pressable>
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

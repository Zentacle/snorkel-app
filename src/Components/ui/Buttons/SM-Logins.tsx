import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Animated,
  Platform,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import type { FunctionComponent } from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { NamedStyles } from '_utils/interfaces';

interface ButtonProps {
  onPress?: () => any;
  style?: {
    container?: NamedStyles;
    text?: NamedStyles;
  };
  disabled?: boolean;
  inactiveColor?: string;
  imageSource: ImageSourcePropType;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = (props): JSX.Element => {
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

  const handlePress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  const textComp = (
    <Text
      style={[
        styles.text,
        props.style?.text,
        props.disabled && {
          color: 'grey',
        },
        props.loading && { opacity: 0.3 },
        { color: '#AA00FF' },
      ]}>
      {props.children}
    </Text>
  );

  const button = (
    <Animated.View
      style={[
        styles.container,
        props.style?.container,
        props.disabled && {
          backgroundColor: props.inactiveColor || '#F4F4F4',
          elevation: 1,
        },
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}>
      <Image style={styles.image} source={props.imageSource} />
      {textComp}
      <View />
    </Animated.View>
  );

  if (props.disabled) return button;

  return (
    <TouchableNativeFeedback
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {button}
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 12,
    elevation: 3,
    borderRadius: 7,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {},
  text: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default Button;

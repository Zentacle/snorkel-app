import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

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
    <View
      style={[
        styles.container,
        props.style?.container,
        props.disabled && {
          backgroundColor: props.inactiveColor || '#F4F4F4',
          elevation: 1,
        },
      ]}>
      <Image style={styles.image} source={props.imageSource} />
      {textComp}
      <View />
    </View>
  );

  if (props.disabled) return button;
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
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

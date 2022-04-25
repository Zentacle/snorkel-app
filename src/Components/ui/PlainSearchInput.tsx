import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { FunctionComponent } from 'react';
import type { ViewStyle, TextStyle, ColorValue } from 'react-native';

import FilterIcon from '_assets/Filter.png';

interface BaseProps {
  style?: ViewStyle | TextStyle;
  containerStyle?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  onClickFilterIcon?: () => void;
  withFilterIcon?: boolean;
  onChange?: (val: string) => void;
  value?: string;
  autoFocus?: boolean;
}

const PlainSearchInput: FunctionComponent<BaseProps> = ({
  withFilterIcon,
  containerStyle,
  onClickFilterIcon,
  placeholder,
  placeholderTextColor,
  onChange,
  value,
  style,
  autoFocus,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon style={styles.icon} name="search" size={22} color="grey" />
      <TextInput
        style={[styles.input, style, withFilterIcon && { width: '80%' }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChange}
        autoFocus={autoFocus ?? false}
      />
      {withFilterIcon && (
        <TouchableWithoutFeedback onPress={onClickFilterIcon}>
          <Image source={FilterIcon} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  input: {
    minWidth: '60%',
    height: 40,
  },
  icon: {
    width: 30,
  },
  image: {},
});

export default PlainSearchInput;

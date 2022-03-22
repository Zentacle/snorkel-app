import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { FunctionComponent } from 'react';
import type { ViewStyle, TextStyle, ColorValue } from 'react-native';
import type { FieldRenderProps } from 'react-final-form';

import FilterIcon from '_assets/Filter.png';

const HEIGHT = Dimensions.get('window').height;

type FinalFormProps = FieldRenderProps<string, any>;

interface BaseProps {
  style?: ViewStyle | TextStyle;
  containerStyle?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  handleInputFocus?: () => void;
}

type FilterIconOption =
  | {
      withFilterIcon?: boolean;
      onClickFilterIcon: () => void;
      filterIcon?: string;
      filterIconSize?: number;
    }
  | {
      withFilterIcon?: false;
      onClickFilterIcon: never;
      filterIcon: never;
      filterIconSize: never;
    };

type InputSearchProps = BaseProps & FinalFormProps & FilterIconOption;

const SearchInput: FunctionComponent<InputSearchProps> = ({
  withFilterIcon,
  containerStyle,
  onClickFilterIcon,
  placeholder,
  placeholderTextColor,
  input: { value, onChange },
  handleInputFocus,
  filterIcon,
  filterIconSize,
  style,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon style={styles.icon} name="search" size={22} color="grey" />
      <TextInput
        style={[styles.input, style, withFilterIcon && { width: '80%' }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onFocus={handleInputFocus}
        value={value}
        onChangeText={(val: string) => onChange(val)}
      />
      {withFilterIcon && (
        <TouchableWithoutFeedback onPress={onClickFilterIcon}>
          {filterIcon ? (
            <Icon
              style={styles.icon}
              name={filterIcon}
              size={filterIconSize || 30}
              color="black"
            />
          ) : (
            <Image source={FilterIcon} />
          )}
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
    marginHorizontal: 25,
    borderRadius: 12,
    marginTop: HEIGHT * 0.045,
  },
  input: {
    width: '90%',
    height: 40,
  },
  icon: {
    width: 30,
  },
  image: {},
});

export default SearchInput;

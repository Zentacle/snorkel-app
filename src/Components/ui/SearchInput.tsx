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
  onClickFilterIcon?: () => void;
  withFilterIcon?: boolean;
  handleInputFocus?: () => void;
}

type InputSearchProps = BaseProps & FinalFormProps;

type FilteredSearchInputProps = Omit<
  BaseProps,
  'containerStyle' | 'onClickFilterIcon' | 'withFilterIcon'
>;

const SearchInput: FunctionComponent<InputSearchProps> = ({
  withFilterIcon,
  containerStyle,
  onClickFilterIcon,
  placeholder,
  placeholderTextColor,
  input: { value, onChange },
  handleInputFocus,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon style={styles.icon} name="search" size={22} color="grey" />
      <TextInput
        // {...(props as unknown as FilteredSearchInputProps)}
        style={[styles.input, withFilterIcon && { width: '80%' }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onFocus={handleInputFocus}
        value={value}
        onChangeText={(val: string) => onChange(val)}
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

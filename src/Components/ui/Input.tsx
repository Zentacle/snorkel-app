import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import PasswordImage from '_assets/logos/pwd/EyeClosed.png';

import type { FunctionComponent } from 'react';
import type {
  ViewStyle,
  TextStyle,
  ColorValue,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputChangeEventData,
} from 'react-native';

type NativeSyntheticFocus =
  | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
  | undefined;
type NativeSyntheticChange =
  | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
  | undefined;

interface BaseProps {
  style?: TextStyle;
  containerStyle?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  passwordType?: boolean;
  maxLength?: number;
  multiline?: boolean;
  onChange?: NativeSyntheticChange;
  value?: string | undefined;
  onFocus?: NativeSyntheticFocus;
  onBlur?: NativeSyntheticFocus;
}

type InputProps = BaseProps;
type FilteredInputProps = Omit<
  InputProps,
  'containerStyle' | 'input' | 'meta' | 'passwordType'
>;

const Input: FunctionComponent<InputProps> = (props): JSX.Element => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  if (props.passwordType) {
    return (
      <View
        style={[
          styles.container,
          props.containerStyle,
          { flexDirection: 'row', justifyContent: 'space-between' },
        ]}>
        <TextInput
          style={[styles.input, props.style]}
          secureTextEntry={secureTextEntry}
          {...(props as unknown as FilteredInputProps)}
        />
        <TouchableWithoutFeedback
          onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <View style={{ justifyContent: 'center', width: 30 }}>
            {secureTextEntry && <Image source={PasswordImage} />}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  return (
    <View style={[styles.container, props.containerStyle]}>
      <TextInput
        style={[styles.input, props.style]}
        {...(props as unknown as FilteredInputProps)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  input: {
    height: 40,
    color: 'black',
  },
});

export default Input;

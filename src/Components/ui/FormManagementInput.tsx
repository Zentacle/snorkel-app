import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import type { FieldRenderProps } from 'react-final-form';
import type { FunctionComponent } from 'react';
import type { ViewStyle, TextStyle, ColorValue } from 'react-native';

import PasswordImage from '_assets/logos/pwd/EyeClosed.png';

type FinalFormProps = FieldRenderProps<string, any>;

interface BaseProps {
  style?: TextStyle;
  containerStyle?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  passwordType?: boolean;
  maxLength?: number;
  multiline?: boolean;
}

type FormManagementInputProps = BaseProps & FinalFormProps;
type FilteredFormManagementInputProps = Omit<
  FormManagementInputProps,
  'containerStyle' | 'input' | 'meta' | 'passwordType'
>;

const Input: FunctionComponent<FormManagementInputProps> = (
  props,
): JSX.Element => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  if (props.passwordType) {
    return (
      <View
        style={[
          styles.container,
          props.containerStyle,
          { flexDirection: 'row', justifyContent: 'space-between' },
          props.meta.touched &&
            props.meta.invalid && {
              borderColor: 'red',
            },
        ]}>
        <TextInput
          style={[styles.input, props.style]}
          secureTextEntry={secureTextEntry}
          onFocus={props.input.onFocus as any}
          onBlur={props.input.onBlur as any}
          {...(props as unknown as FilteredFormManagementInputProps)}
          value={props.input.value}
          onChangeText={(text: string) =>
            props.input.onChange && props.input.onChange(text)
          }
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
    <View
      style={[
        styles.container,
        props.containerStyle,
        props.meta.touched &&
          props.meta.invalid && {
            borderColor: 'red',
          },
      ]}>
      <TextInput
        style={[styles.input, props.style]}
        {...(props as unknown as FilteredFormManagementInputProps)}
        value={props.input.value}
        onFocus={props.input.onFocus as any}
        onBlur={props.input.onBlur as any}
        onChangeText={(text: string) =>
          props.input.onChange && props.input.onChange(text)
        }
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

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import type { FunctionComponent } from 'react';
import type { FieldRenderProps } from 'react-final-form';
import type { ViewStyle } from 'react-native';

interface SelectWGradientBorderProps {
  options: string[];
  activeComponent: (level: string) => JSX.Element;
  inactiveComponent: (level: string) => JSX.Element;
  style?: ViewStyle;
}
type FinalFormProps = FieldRenderProps<string, any>;
type ComponentProps = SelectWGradientBorderProps & FinalFormProps;

const SelectWGradientBorder: FunctionComponent<ComponentProps> = ({
  input: { onChange, value },
  options,
  activeComponent,
  inactiveComponent,
  style,
}) => {
  return (
    <View style={style ? style : styles.container}>
      {options.map((level, index) => {
        if (level === value) {
          return (
            <TouchableWithoutFeedback key={index}>
              {activeComponent(level)}
            </TouchableWithoutFeedback>
          );
        }
        return (
          <TouchableWithoutFeedback key={index} onPress={() => onChange(level)}>
            {inactiveComponent(level)}
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SelectWGradientBorder;

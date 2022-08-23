import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style ? style : styles.container}>
      {options.map((item, index) => {
        if (item === value) {
          return (
            <TouchableWithoutFeedback key={index}>
              <View
                style={[
                  styles.contentWrap,
                  index === 0 && {
                    marginRight: 5,
                  },
                  index === options.length - 1 && {
                    marginLeft: 5,
                  },
                ]}>
                {activeComponent(item)}
              </View>
            </TouchableWithoutFeedback>
          );
        }
        return (
          <TouchableWithoutFeedback key={index} onPress={() => onChange(item)}>
            <View
              style={[
                styles.contentWrap,
                styles.contentWrap,
                index === 0 && {
                  marginRight: 5,
                },
                index === options.length - 1 && {
                  marginLeft: 5,
                },
              ]}>
              {inactiveComponent(item)}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentWrap: {},
});

export default SelectWGradientBorder;

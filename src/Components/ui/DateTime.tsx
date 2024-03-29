import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';

import type { FunctionComponent } from 'react';
import type { FieldRenderProps } from 'react-final-form';

import { DateTimeMode } from '_screens/DiveLogsForms/utils/interfaces';

interface DateTimeProps {
  label: string;
  mode: DateTimeMode;
}
type FinalFormProps = FieldRenderProps<Date, any>;
type ComponentProps = DateTimeProps & FinalFormProps;

const DateTime: FunctionComponent<ComponentProps> = ({
  input: { onChange, value },
  label,
  mode,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.dateContainer}>
        <DatePicker
          date={value || new Date()}
          mode={mode}
          onDateChange={(dateValue: Date) => onChange(dateValue)}
          maximumDate={new Date()}
          style={{
            height: 150,
          }}
          theme='light'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  dateContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    marginTop: 10,
  },
  labelText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },
});

export default DateTime;

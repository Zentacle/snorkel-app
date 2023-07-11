import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import type { FunctionComponent } from 'react';

interface Option {
  label: string;
  value: string;
}

interface Props {
  onChange: (selectedValue: string) => void;
  options: Option[];
  value: string;
}

const Selector: FunctionComponent<Props> = ({ options, value, onChange }) => {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          onPress={() => {
            onChange(option.value);
          }}
          style={value === option.value ? styles.selected : styles.option}>
          <View>
            <Text style={{
              ...styles.text,
              color: value === option.value ? 'white' : 'black',
            }}>{option.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
  },
  selected: {
    backgroundColor: '#aa00ff',
    borderRadius: 5,
    color: 'white',
    flexBasis: 50,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },
  option: {
    alignItems: 'center',
    flexBasis: 50,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Selector;

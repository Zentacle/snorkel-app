import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Field } from 'react-final-form';

import FMInput from '_components/ui/FormManagementInput';

const Name = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContentLabel}>
        <Text style={styles.headerLabel}>Enter Name</Text>
        <View style={styles.optionalContainer}>
          <Text style={styles.optionaltext}>Up to 40 Characters</Text>
        </View>
      </View>
      <View>
        <Field
          name="name"
          component={FMInput}
          placeholder="Write Title"
          style={styles.input}
          containerStyle={styles.inputContainer}
          maxLength={40}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  optionalContainer: {},
  optionaltext: {
    color: '#aa00ff',
    fontSize: 12,
  },
  nameContentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 0,
    paddingHorizontal: 10,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  input: {
    height: 45,
    fontSize: 16,
    color: 'black',
  },
});

export default Name;

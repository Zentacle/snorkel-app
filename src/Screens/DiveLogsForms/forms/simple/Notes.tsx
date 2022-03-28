import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Field } from 'react-final-form';

import FMInput from '_components/ui/FormManagementInput';

const Notes = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.notesContentLabel}>
        <Text style={styles.headerLabel}>Note</Text>
        <View style={styles.optionalContainer}>
          <Text style={styles.optionaltext}>Up to 1000 Characters</Text>
        </View>
      </View>
      <View>
        <Field
          name="note"
          component={FMInput}
          placeholder="Write Title"
          style={styles.input}
          containerStyle={styles.inputContainer}
          maxLength={1000}
          multiline
        />
      </View>
    </ScrollView>
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
  notesContentLabel: {
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
    justifyContent: 'flex-start',
  },
  input: {
    minHeight: Platform.OS === 'android' ? 40 : 90,
    fontSize: 16,
    paddingTop: Platform.OS === 'android' ? 5 : 12,
    paddingBottom: 5,
    color: 'black',
    justifyContent: 'flex-start',
  },
});

export default Notes;

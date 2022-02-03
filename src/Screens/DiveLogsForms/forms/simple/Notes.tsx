import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Input from '_components/ui/Input';

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
        <Input
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
  },
  input: {
    // height: 145,
    minHeight: 45,
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 5,
  },
});

export default Notes;

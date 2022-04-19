import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { DiveListAdvanced, DiveListSimple } from './ListItem';

const DiveLogList = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DiveListSimple />
        <DiveListSimple />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DiveLogList;

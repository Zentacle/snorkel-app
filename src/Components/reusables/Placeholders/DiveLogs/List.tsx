import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import DiveListItem from './ListItem';

const DiveLogList = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DiveListItem />
        <DiveListItem />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DiveLogList;

import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import BeachNearby from './BeachNearby';
import BeachRecommended from './BeachRecommended';
import { HEIGHT } from '_utils/constants';
import BeachSearch from './BeachSearch';

const BeachLoading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <BeachSearch />
        <ScrollView
          style={styles.scroll}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((_, index) => (
            <BeachNearby key={index} />
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          {[1, 2, 3].map((_, index) => (
            <BeachRecommended key={index} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginBottom: HEIGHT < 780 ? 80 : 65,
  },
  scroll: {
    paddingLeft: 25,
  },
});

export default BeachLoading;

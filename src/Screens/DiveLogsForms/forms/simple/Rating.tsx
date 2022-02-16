import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Field } from 'react-final-form';

import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';
import RatingsInputComp from '_components/ui/RatingsInputComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBoder';

const Rating = () => {
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const ActiveComponent = (level: string) => (
    <View style={styles.selectedShadow}>
      <GradientBox style={styles.selectedLevel}>
        <View style={styles.selectBox}>
          <View style={styles.selectedLevelCircle}>
            <GradientCircle style={styles.selectedGradient} />
          </View>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </GradientBox>
    </View>
  );

  const InactiveComponent = (level: string) => (
    <View style={styles.level}>
      <View style={styles.normalLevelCircle}></View>
      <Text style={styles.levelText}>{level}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headerLabel}>Rating</Text>
        <Field name="rating" component={RatingsInputComp} />
      </View>

      <View style={styles.levelContentContainer}>
        <Text style={styles.headerLabel}>Level of difficulty</Text>
        <Field
          name="difficulty"
          component={SelectWGradientBorder}
          activeComponent={ActiveComponent}
          inactiveComponent={InactiveComponent}
          options={levels}
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

  levelContentContainer: {
    marginVertical: 40,
  },

  level: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  selectedShadow: {
    borderRadius: 12,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  selectedLevel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  levelText: {
    marginRight: 25,
    marginLeft: 15,
    marginBottom: 10,
  },
  normalLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  selectedLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradient: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Rating;

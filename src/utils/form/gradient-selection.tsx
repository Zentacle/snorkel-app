import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';

import { capitalize } from '_utils/functions';

export const ActiveComponent = (item: string) => (
  <View style={styles.selectedShadow}>
    <GradientBox style={styles.selectedItem}>
      <View style={styles.selectBox}>
        <View style={styles.selectedItemCircle}>
          <GradientCircle style={styles.selectedGradient} />
        </View>
        <Text style={styles.itemText}>{capitalize(item)}</Text>
      </View>
    </GradientBox>
  </View>
);

export const InactiveComponent = (item: string) => (
  <View style={styles.item}>
    <View style={styles.normalItemCircle} />
    <Text style={styles.itemText}>{capitalize(item)}</Text>
  </View>
);

const styles = StyleSheet.create({
  selectedShadow: {
    borderRadius: 12,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    // width: '30%',
  },
  selectedItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  itemText: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
    marginBottom: 8,
    color: 'black',
  },
  normalItemCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 10,
  },
  selectedItemCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradient: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

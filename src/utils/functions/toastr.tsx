import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import GradientBox from '_components/ui/GradientBox';

export const toastConfig: ToastConfig = {
  info: ({ text1 }) => {
    return (
      <View style={styles.container}>
        <GradientBox style={styles.indicator} />
        <Text style={styles.text}>{text1}</Text>
      </View>
    );
  },
  error: ({ text1 }) => {
    return (
      <View style={styles.container}>
        <GradientBox
          gradientColors={['#FF4600', '#FFF000', '#FFF000']}
          style={styles.indicator}
        />
        <Text style={styles.text}>{text1}</Text>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '90%',
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.6,
    marginTop: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 20,
  },
  indicator: {
    width: 5,
    height: 60,
    // borderRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginLeft: -2,
  },
});

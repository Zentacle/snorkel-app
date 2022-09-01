import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import GradientBox from '_components/ui/GradientBox';

export const toastConfig: ToastConfig = {
  info: ({ text1, text2 }) => {
    return (
      <View style={styles.container}>
        <GradientBox style={styles.indicator} />
        <View>
          <Text style={styles.text}>{text1}</Text>
          {text2 && <Text style={styles.text2}>{text2}</Text>}
        </View>
      </View>
    );
  },
  error: ({ text1 }) => {
    return (
      <View style={styles.container}>
        <GradientBox
          gradientColors={['#FF0000', '#FF5900', '#FF5900']}
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
  text2: {
    color: 'grey',
    fontSize: 13,
    textAlign: 'center',
    marginLeft: 20,
    marginTop: 5,
  },
  indicator: {
    width: 5,
    minHeight: 60,
    // borderRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginLeft: -2,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SnorkelGray from 'assets/scuba_icons/snorkel-gray.svg';
import Button from '_components/ui/Buttons/Button';
import { isBelowHeightThreshold } from '_utils/constants';

const NoDiveShop: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <View style={styles.labelDot} />
        <Text style={styles.label}>No Dive Shop Added</Text>
      </View>
      <View style={styles.contentContainer}>
        <SnorkelGray />
      </View>
      <Button
        gradient
        gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
        gradientLocations={[0.01, 1, 1]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 0.06,
          y: 2.2,
        }}
        style={{
          container: styles.buttonContainer,
          text: styles.buttonText,
        }}>
        Add Shop
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 50,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E6ECEF',
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    color: 'black',
  },
  contentContainer: {
    backgroundColor: '#E6ECEF',
    height: 150,
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 12,
    paddingVertical: isBelowHeightThreshold ? 12 : 16,
    marginHorizontal: 0,
    marginVertical: isBelowHeightThreshold ? 10 : 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default NoDiveShop;

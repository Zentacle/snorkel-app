import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CoordsIndicator from '_assets/coords.jpeg';

interface UnavailableLocationBoxProps {
  desc: string;
}
const UnavailableLocationBox: React.FunctionComponent<
  UnavailableLocationBoxProps
> = ({ desc }) => {
  return (
    <View style={styles.container}>
      <View style={styles.coordsContainer}>
        <Image source={CoordsIndicator} style={styles.coordsIndicator} />
        <Text style={styles.locationAvailabilityText}>
          No coordinates available
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  coordsIndicator: {
    width: 40,
    height: 40,
  },
  coordsContainer: {
    alignItems: 'center',
  },
  locationName: {
    color: 'black',
    fontWeight: '500',
    fontSize: 13,
  },
  locationAvailabilityText: {
    color: 'grey',
    marginTop: 5,
    fontSize: 10,
    width: 100,
    textAlign: 'center',
  },
});

export default UnavailableLocationBox;

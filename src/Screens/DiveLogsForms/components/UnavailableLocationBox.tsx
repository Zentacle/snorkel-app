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
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationName}>{desc}</Text>
          <Text style={styles.locationAvailabilityText}>
            No Location coordinates available
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coordsIndicator: {
    width: 70,
    height: 70,
  },
  coordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {},
  locationName: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
  locationAvailabilityText: {
    color: 'grey',
    marginTop: 10,
    fontSize: 12,
  },
});

export default UnavailableLocationBox;

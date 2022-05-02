import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CoordsIndicator from '_assets/coords.jpeg';

interface UnavailableLocationBoxProps {
  desc: string;
  onClickEdit?: () => void;
  location_city: string;
  showEdit?: boolean;
}
const UnavailableLocationBox: React.FunctionComponent<
  UnavailableLocationBoxProps
> = ({ desc, location_city, onClickEdit, showEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.coordsContainer}>
        <Image source={CoordsIndicator} style={styles.coordsIndicator} />
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationName}>{desc}</Text>
          <Text style={styles.locationCity}>{location_city}</Text>
          <Text style={styles.locationAvailabilityText}>
            No Location coordinates available
          </Text>
        </View>
      </View>
      {showEdit && (
        <Icon
          name="pencil-outline"
          color="black"
          size={20}
          onPress={onClickEdit}
          style={styles.editIcon}
        />
      )}
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
  locationCity: {
    marginTop: 3,
    fontSize: 14,
    color: 'grey',
  },
  locationAvailabilityText: {
    color: 'grey',
    marginTop: 10,
    fontSize: 12,
  },
  editIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default UnavailableLocationBox;

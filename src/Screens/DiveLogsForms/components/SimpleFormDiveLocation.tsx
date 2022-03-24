import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { FunctionComponent } from 'react';

import LocationImage from '_assets/Location.png';
import DescIcon from '_assets/DescIcon.png';

interface SimpleFormDiveLocationProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  desc: string;
  onClickEdit: () => void;
}

const SimpleFormDiveLocation: FunctionComponent<
  SimpleFormDiveLocationProps
> = ({ coordinates, onClickEdit, desc }) => {
  const canShowLocation = coordinates.latitude && coordinates.longitude;
  return (
    <View style={styles.diveLocationContainer}>
      {canShowLocation ? (
        <>
          <Text style={styles.diveSiteLocationHeader}>Dive Site Location</Text>
          <View style={styles.mapContainer}>
            <MapView
              provider="google"
              style={styles.map}
              scrollEnabled={false}
              liteMode={true}
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.0121,
                longitudeDelta: 0.2122,
              }}>
              <Marker
                coordinate={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                }}
              />
            </MapView>
          </View>
          <View style={styles.locationDetails}>
            <View>
              <View style={styles.descContainer}>
                <Image source={DescIcon} />
                <Text style={styles.descText}>Dive place</Text>
              </View>
              <View style={styles.locationContainer}>
                <Image source={LocationImage} />
                <Text style={styles.locationText}>{desc}</Text>
              </View>
            </View>
            <Icon name="pencil-outline" size={30} onPress={onClickEdit} />
          </View>
        </>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  diveSiteLocationHeader: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  diveLocationContainer: {
    marginTop: 20,
  },
  mapContainer: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  map: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  locationDetails: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    width: '100%',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  descText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
});

export default SimpleFormDiveLocation;

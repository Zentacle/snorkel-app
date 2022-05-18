import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';

import Snorkel from '_assets/scuba_icons/snorkel.svg';
import Location from '_assets/scuba_icons/Location.svg';

interface SimpleFormDiveLocationProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  desc: string;
  onClickEdit: () => void;
  location_city: string;
}

const SimpleFormDiveLocation: FunctionComponent<
  SimpleFormDiveLocationProps
> = ({ coordinates, onClickEdit, desc, location_city }) => {
  const { t } = useTranslation();
  const canShowLocation = coordinates.latitude && coordinates.longitude;

  return (
    <View style={styles.diveLocationContainer}>
      {canShowLocation ? (
        <>
          <Text style={styles.diveSiteLocationHeader}>
            {t('DIVE_SITE_LOCATION')}
          </Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              scrollEnabled={false}
              liteMode={true}
              region={{
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
                <Snorkel width={15} />
                <Text style={styles.descText}>{desc}</Text>
              </View>
              <View style={styles.locationContainer}>
                <Location width={15} />
                <Text style={styles.locationText}>{location_city}</Text>
              </View>
            </View>
            <Icon
              name="pencil-outline"
              color="black"
              size={30}
              onPress={onClickEdit}
            />
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
    paddingVertical: 20,
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

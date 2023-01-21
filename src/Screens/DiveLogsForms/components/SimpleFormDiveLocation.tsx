import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';

interface SimpleFormDiveLocationProps {
  coordinates: {
    latitude?: number;
    longitude?: number;
  };
  desc: string;
  onClickEdit: () => void;
  location_city: string;
}

const SimpleFormDiveLocation: FunctionComponent<
  SimpleFormDiveLocationProps
> = ({ coordinates, onClickEdit, desc, location_city }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.diveLocationContainer}>
      <Text style={styles.diveSiteLocationHeader}>
        {t('DIVE_SITE_LOCATION')}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={onClickEdit}>
        {coordinates.latitude && coordinates.longitude && (
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
        )}
        <View style={styles.locationDetails}>
          <Text style={styles.descText}>{desc}</Text>
          <Text style={styles.locationText}>{location_city}</Text>
        </View>
        <Icon
          name="pencil-outline"
          color="black"
          size={30}
          style={styles.editIcon}
        />
      </TouchableOpacity>
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
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 8,
    marginTop: 10,
  },
  mapContainer: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  map: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  locationDetails: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingHorizontal: 16,
    flexShrink: 1,
  },
  descText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  locationText: {
    marginTop: 4,
    fontSize: 15,
    color: 'black',
  },
  editIcon: {
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    flexShrink: 0,
  },
});

export default SimpleFormDiveLocation;

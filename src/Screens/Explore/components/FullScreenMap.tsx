import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import type { FunctionComponent } from 'react';

interface FullScreenMapProps {
  coords: {
    lat: number;
    lng: number;
  };
}

const FullScreenMap: FunctionComponent<FullScreenMapProps> = ({ coords }) => {
  return (
    <MapView
      provider="google"
      style={styles.map}
      initialRegion={{
        latitude: coords.lat,
        longitude: coords.lng,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0621,
      }}>
      <Marker
        coordinate={{
          latitude: coords.lat,
          longitude: coords.lng,
        }}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

export default FullScreenMap;

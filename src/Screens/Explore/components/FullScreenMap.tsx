import React from 'react';
import type { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import debounce from 'lodash/debounce';

import { fetchDiveSites } from '_redux/slices/dive-sites/api';
import { Spot } from '_utils/interfaces/data/spot';

interface FullScreenMapProps {
  coords: {
    lat: number;
    lng: number;
  };
  isExplore?: boolean;
}

const FullScreenMap: FunctionComponent<FullScreenMapProps> = ({
  coords,
  isExplore,
}) => {
  const [diveSites, setDiveSites] = React.useState<Spot[]>([]);

  const fetchMoreSites = React.useMemo(
    () =>
      debounce(async (latitude: number, longitude: number) => {
        const response = await fetchDiveSites({
          latitude: latitude,
          longitude: longitude,
        });
        setDiveSites(response.data);
      }, 500),
    [],
  );

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coords.lat,
        longitude: coords.lng,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0621,
      }}
      onRegionChangeComplete={region => {
        if (isExplore) {
          fetchMoreSites(region.latitude, region.longitude);
        }
      }}>
      {isExplore ? (
        diveSites.map(site => (
          <Marker
            title={site.name}
            description={site.location_city}
            coordinate={{
              latitude: site.latitude,
              longitude: site.longitude,
            }}
          />
        ))
      ) : (
        <Marker
          coordinate={{
            latitude: coords.lat,
            longitude: coords.lng,
          }}
        />
      )}
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

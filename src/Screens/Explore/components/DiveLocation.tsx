import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';
import Button from '_components/ui/Buttons/Button';

interface DiveLocationProps {
  navigateToMap: () => void;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const DiveLocation: FunctionComponent<DiveLocationProps> = ({
  navigateToMap,
  coordinates,
}) => {
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
              showsUserLocation={true}
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
          <Button
            onPress={navigateToMap}
            textGradient
            start={{
              x: 0,
              y: 1,
            }}
            end={{
              x: 0.65,
              y: 0.4,
            }}
            gradientColors={['#AA00FF', '#AA00FF', '#00E0FF']}
            style={{
              container: styles.viewMapButtonContainer,
              text: styles.viewMapButtonText,
            }}>
            {t('VIEW_MAP')}
          </Button>
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
    borderRadius: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  viewMapButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
    padding: 16,
    marginHorizontal: 0,
    elevation: 0.5,
  },
  viewMapButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default DiveLocation;

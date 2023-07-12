import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import type { FunctionComponent } from 'react';
import type { FieldRenderProps } from 'react-final-form';
import type { ViewStyle } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

interface MapInputProps {
  containerStyle?: ViewStyle;
  style?: ViewStyle;
}
type FinalFormProps = FieldRenderProps<
  {
    latitude: number;
    longitude: number;
  },
  any
>;
type ComponentProps = MapInputProps & FinalFormProps;

const MapInput: FunctionComponent<ComponentProps> = ({
  containerStyle,
  input: { onChange, value },
  style,
}) => {
  const [region, setRegion] = useState({
    latitude: value.latitude,
    longitude: value.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState({
    latitude: value.latitude,
    longitude: value.longitude,
  });

  const onRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
    onChange({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
  };

  const selectLocation = (e: any) => {
    setMarker(e.nativeEvent.coordinate);
    onChange({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <MapView
      style={styles.container}
      region={region}
      onRegionChangeComplete={onRegionChange}
      onPress={selectLocation}>
      <Marker coordinate={marker} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    borderRadius: 10,
  },
  contentWrap: {},
});

export default MapInput;

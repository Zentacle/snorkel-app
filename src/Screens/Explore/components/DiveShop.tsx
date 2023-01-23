import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';

import type { FunctionComponent } from 'react';

import Location from '_assets/scuba_icons/Location.svg';
import { DiveShopFull } from '_utils/interfaces/data/shops';

interface DiveShopProps {
  shop: DiveShopFull;
  onPressContainer?: () => void;
}

const DiveShop: FunctionComponent<DiveShopProps> = props => {
  let content = (
    <View style={styles.container}>
      {props.shop.latitude && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            scrollEnabled={false}
            liteMode={true}
            initialRegion={{
              latitude: props.shop.latitude,
              longitude: props.shop.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.6922,
            }}
          />
        </View>
      )}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{props.shop.name}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{props.shop.address1}</Text>
          <Text style={styles.locationText}>{props.shop.city}</Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsText}>5.0</Text>
          <Icon name="star" size={20} color="#aa00ff" />
          {/* <Text style={styles.ratingsCount}>(0)</Text> */}
        </View>
      </View>
    </View>
  );

  if (props.onPressContainer) {
    return (
      <TouchableWithoutFeedback onPress={props.onPressContainer}>
        {content}
      </TouchableWithoutFeedback>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  container: {
    width: 228,
    backgroundColor: '#FFF',
    marginRight: 15,
    borderRadius: 18,
  },
  mapContainer: {
    width: 208,
    height: 80,
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
  descriptionContainer: {
    padding: 16,
  },
  descriptionText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  locationContainer: {
    marginTop: 4,
  },
  locationText: {
    color: 'black',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingsText: {
    color: 'black',
    fontSize: 16,
    marginRight: 2,
  },
  ratingsCount: {
    color: 'black',
    marginLeft: 4,
    fontSize: 16,
  },
});

export default DiveShop;

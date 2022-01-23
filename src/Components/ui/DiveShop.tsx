import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';

import LocationImage from '_assets/Location.png';

const DiveShop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider="google"
          style={styles.map}
          scrollEnabled={false}
          liteMode={true}
          initialRegion={{
            latitude: -8.409518,
            longitude: 115.188919,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.6922,
          }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Dive Shop on the beach</Text>
        <View style={styles.locationContainer}>
          <Image source={LocationImage} />
          <Text style={styles.locationText}>East Bali, Indonesia</Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsText}>3.5</Text>
          <Icon name="star" size={20} color="#aa00ff" />
          <Text style={styles.ratingsCount}>(463)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 185,
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
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  descriptionText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locationText: {
    color: 'black',
    marginLeft: 10,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingsText: {
    color: 'black',
    marginHorizontal: 5,
    fontSize: 16,
  },
  ratingsCount: {
    color: 'black',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default DiveShop;

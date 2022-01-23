import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LocationImage from '_assets/Location.png';

const attachIcons = (count: number) => {
  const iconList: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    if (count > i && count >= i + 1) {
      iconList.push(<Icon key={i} name="star" size={15} color="#aa00ff" />);
    } else if (count > i && count < i + 1) {
      iconList.push(
        <Icon key={i} name="star-half-full" size={15} color="#aa00ff" />,
      );
    } else {
      iconList.push(
        <Icon key={i} name="star-outline" size={15} color="#aa00ff" />,
      );
    }
  }

  return iconList;
};

const DiveShop = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.map} />
        <View style={styles.imageCountContainer}>
          <Icon name="image-outline" size={18} color="#FFF" />
          <Text style={styles.imageCountText}>24</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Dive Shop on the beach</Text>
        <View style={styles.locationContainer}>
          <Image source={LocationImage} />
          <Text style={styles.locationText}>East Bali, Indonesia</Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsText}>3.5</Text>
          <View style={styles.ratingsIconsContainer}>{attachIcons(3.5)}</View>
          <Text style={styles.ratingsCount}>(463)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 185,
    width: 228,
    backgroundColor: '#FFF',
    marginRight: 15,
    borderRadius: 18,
  },
  map: {
    width: 196,
    height: 60,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  imageCountContainer: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(131,131,131,0.5)',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
    alignItems: 'center',
  },
  imageCountText: {
    marginLeft: 5,
    opacity: 1,
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
  },
  ratingsLevelText: {
    color: '#0b94ef',
  },
  ratingsIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 2,
  },
  ratingsText: {
    color: 'black',
    marginHorizontal: 5,
  },
  ratingsCount: {
    color: 'black',
    marginLeft: 5,
  },
});

export default DiveShop;

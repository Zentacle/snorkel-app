import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { FunctionComponent } from 'react';
import type { ViewStyle, ImageStyle } from 'react-native';

import DiveSiteImage from '_assets/DiveSite.jpg';
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

interface DiveSiteProps {
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

const DiveSite: FunctionComponent<DiveSiteProps> = props => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={[styles.imageContainer, props.imageContainerStyle]}>
        <Image
          style={[styles.image, props.imageStyle]}
          source={DiveSiteImage}
        />
        <View style={styles.imageCountContainer}>
          <Icon name="image-outline" size={18} color="#FFF" />
          <Text style={styles.imageCountText}>24</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Mala Wharf</Text>
        <View style={styles.locationContainer}>
          <Image source={LocationImage} />
          <Text style={styles.locationText}>Maui</Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsLevelText}>Beginner</Text>
          <View style={styles.dot} />
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
    height: 251,
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 18,
    marginBottom: 15,
  },
  imageContainer: {
    width: 300,
    height: 169,
  },
  image: {
    width: 300,
    height: 169,
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
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginLeft: 10,
    marginTop: 4,
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

export default DiveSite;

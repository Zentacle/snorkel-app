import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';
import type { ViewStyle, ImageStyle } from 'react-native';
import type { Spot } from '_utils/interfaces/data/spot';

import DiveSiteImage from '_assets/DiveSite.jpg';
import LocationImage from '_assets/Location.png';

import { attachIcons, capitalize } from '_utils/functions';

interface DiveSiteProps {
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  onPressContainer?: (diveSpot: Spot) => void;
  site: Spot;
}

const DiveSite: FunctionComponent<DiveSiteProps> = props => {
  const { t } = useTranslation();

  const content = (
    <View style={[styles.container, props.containerStyle]}>
      <View style={[styles.imageContainer, props.imageContainerStyle]}>
        {props.site.hero_img ? (
          <Image
            style={[styles.image, props.imageStyle]}
            source={{
              uri: props.site.hero_img,
            }}
          />
        ) : (
          <Image
            style={[styles.image, props.imageStyle]}
            source={DiveSiteImage}
          />
        )}
        <View style={styles.imageCountContainer}>
          <Icon name="image-outline" size={18} color="#FFF" />
          <Text style={styles.imageCountText}>24</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{props.site.name}</Text>
        <View style={styles.locationContainer}>
          <Image source={LocationImage} />
          <Text style={styles.locationText}>
            {props.site.location_city.split(',')[0]}
          </Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsLevelText}>
            {capitalize(props.site.difficulty) || t('BEGINNER')}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.ratingsText}>
            {Number(props.site.rating).toFixed(1)}
          </Text>
          <View style={styles.ratingsIconsContainer}>
            {attachIcons(Number(props.site.rating))}
          </View>
          <Text style={styles.ratingsCount}>({props.site.num_reviews})</Text>
        </View>
      </View>
    </View>
  );

  if (props.onPressContainer && typeof props.onPressContainer === 'function') {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          props.onPressContainer && props.onPressContainer(props.site)
        }>
        {content}
      </TouchableWithoutFeedback>
    );
  }
  return content;
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

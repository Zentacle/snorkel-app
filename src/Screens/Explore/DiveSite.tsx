import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FEIcon from 'react-native-vector-icons/Feather';

import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
} from 'react-native';

import DiveSite1 from '_assets/DiveSite.jpg';
import DiveSite2 from '_assets/DiveSite2.jpg';
import DiveSite3 from '_assets/DiveSite3.jpg';
import DiveSite4 from '_assets/DiveSite4.jpg';

import LocationImage from '_assets/Location.png';

const WIDTH = Dimensions.get('window').width;

enum Directions {
  initial = 'initial',
  right = 'right',
  left = 'left',
}

interface Images {
  source: ImageSourcePropType;
}

const images: Images[] = [
  {
    source: DiveSite1,
  },
  {
    source: DiveSite2,
  },
  {
    source: DiveSite3,
  },
  {
    source: DiveSite4,
  },
];

const DiveSite = () => {
  const [focusedImageIndex, setFocusedImageIndex] = React.useState(0);

  const handleScroll = ({
    nativeEvent: { layoutMeasurement, contentOffset },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const widthForFullSwipe = layoutMeasurement.width;
    let direction: Directions = Directions.initial;
    let focusedIndex = contentOffset.x / widthForFullSwipe;

    if (!Number.isInteger(focusedIndex)) {
      return;
    }

    if (focusedImageIndex < focusedIndex) {
      direction = Directions.right;
    } else if (focusedImageIndex > focusedIndex) {
      direction = Directions.left;
    }

    if (direction === Directions.initial) {
      // this means that a full swipe was not completed. Shouls not proceed
      return;
    }

    setFocusedImageIndex(focusedIndex);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}>
          <Image style={styles.headerImage} source={DiveSite1} />
          <Image style={styles.headerImage} source={DiveSite2} />
          <Image style={styles.headerImage} source={DiveSite3} />
          <Image style={styles.headerImage} source={DiveSite4} />
        </ScrollView>
        <View style={styles.headerIconsContainer}>
          <FEIcon
            style={styles.headerIcon}
            name="chevron-left"
            color="black"
            size={25}
          />
          <FEIcon
            style={styles.headerIcon}
            name="share"
            color="black"
            size={25}
          />
        </View>
        <View style={styles.headerBottomContainer}>
          <View style={styles.photoDots}>
            {images.map((_dot, index) => {
              return (
                <View
                  key={index}
                  style={
                    index === focusedImageIndex
                      ? styles.whitePhotoDot
                      : styles.blackPhotoDot
                  }
                />
              );
            })}
          </View>
          <View style={styles.imageCountContainer}>
            <Icon name="image-outline" size={18} color="#FFF" />
            <Text style={styles.imageCountText}>{`${focusedImageIndex + 1}/${
              images.length
            }`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.mainDescription}>
          USS Liberty Wreck on the Beach
        </Text>
        <View style={styles.locationContainer}>
          <Image source={LocationImage} />
          <Text style={styles.locationText}>East Bali, Indonesia</Text>
        </View>
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsLevelText}>Beginner</Text>
          <View style={styles.dot} />
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
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginTop: 25,
    marginHorizontal: 25,
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
  mainDescription: {
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
  },
  header: {},
  headerIconsContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  headerIcon: {
    backgroundColor: '#FFF',
    position: 'relative',
    marginHorizontal: 20,
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 5,
  },
  headerImage: {
    width: WIDTH,
    height: 300,
  },
  headerBottomContainer: {
    position: 'absolute',
    bottom: 20,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ratingsLevelText: {
    color: '#aa00ff',
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginLeft: 10,
    marginTop: 4,
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
  photoDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blackPhotoDot: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    position: 'relative',
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  whitePhotoDot: {
    width: 10,
    height: 10,
    backgroundColor: '#FFF',
    position: 'relative',
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  imageCountContainer: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(131,131,131,0.5)',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  imageCountText: {
    marginLeft: 5,
    opacity: 1,
    color: '#FFF',
  },
});

export default DiveSite;

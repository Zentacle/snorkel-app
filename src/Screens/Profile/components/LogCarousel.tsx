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

import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
} from 'react-native';
import type { FunctionComponent } from 'react';

import DivingPlaceholder from '_assets/diving-placeholder.jpeg';

const WIDTH = Dimensions.get('window').width;

enum Directions {
  initial = 'initial',
  right = 'right',
  left = 'left',
}

interface Images {
  source: ImageSourcePropType;
}

const defaultImages: Images[] = [
  {
    source: DivingPlaceholder,
  },
];

interface ImageCarouselProps {
  images?: {
    uri: string;
    type?: string;
    name: string;
  }[];
}

const LogCarousel: FunctionComponent<ImageCarouselProps> = ({ images }) => {
  const [isSwiping, setIsSwiping] = React.useState(false);
  const [focusedImageIndex, setFocusedImageIndex] = React.useState(0);

  const handleScroll = ({
    nativeEvent: { layoutMeasurement, contentOffset },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const widthForFullSwipe = layoutMeasurement.width;
    let focusedIndex = contentOffset.x / widthForFullSwipe;
    let direction: Directions = Directions.initial;

    setIsSwiping(true);

    if (!Number.isInteger(focusedIndex)) {
      return;
    }

    if (focusedImageIndex < focusedIndex) {
      direction = Directions.right;
    } else if (focusedImageIndex > focusedIndex) {
      direction = Directions.left;
    }

    if (direction === Directions.initial) {
      // this means that a full swipe was not completed. Should not proceed
      setIsSwiping(false);
      return;
    }

    setIsSwiping(false);
    setFocusedImageIndex(focusedIndex);
  };

  if (images && images.length) {
    return (
      <View style={styles.header}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => {
            return (
              <Image
                key={index}
                style={[
                  styles.headerImage,
                  { borderRadius: isSwiping ? 0 : 12 },
                ]}
                source={{ uri: image.uri }}
              />
            );
          })}
        </ScrollView>
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
    );
  }

  return (
    <View style={styles.header}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}>
        {defaultImages.map((image, index) => {
          return (
            <Image
              key={index}
              style={[styles.headerImage, { borderRadius: isSwiping ? 0 : 12 }]}
              source={image.source}
            />
          );
        })}
      </ScrollView>
      <View style={styles.headerBottomContainer}>
        <View style={styles.photoDots}>
          {defaultImages.map((_dot, index) => {
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
          <Text style={styles.imageCountText}>0/0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {},
  headerImage: {
    width: WIDTH - 50,
    height: 350,
    borderRadius: 12,
  },
  headerBottomContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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

export default LogCarousel;

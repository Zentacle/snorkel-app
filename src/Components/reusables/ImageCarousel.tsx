import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FEIcon from 'react-native-vector-icons/Feather';

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
  goBack: () => void;
  images?: {
    uri: string;
    type?: string;
    name: string;
  }[];
}

const ImageCarousel: FunctionComponent<ImageCarouselProps> = props => {
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
      // this means that a full swipe was not completed. Should not proceed
      return;
    }

    setFocusedImageIndex(focusedIndex);
  };

  const [focusedImageIndex, setFocusedImageIndex] = React.useState(0);
  if (props.images && props.images.length) {
    return (
      <View style={styles.header}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}>
          {props.images.map((image, index) => (
            <Image
              key={index}
              style={styles.headerImage}
              source={{ uri: image.uri }}
            />
          ))}
        </ScrollView>
        <View style={styles.headerIconsContainer}>
          <TouchableWithoutFeedback onPress={props.goBack}>
            <View style={styles.headerIcon}>
              <FEIcon name="chevron-left" color="black" size={25} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.headerIcon}>
              <FEIcon name="share" color="black" size={25} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.headerBottomContainer}>
          <View style={styles.photoDots}>
            {props.images.map((_dot, index) => {
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
              props.images.length
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
        {defaultImages.map((image, index) => (
          <Image key={index} style={styles.headerImage} source={image.source} />
        ))}
      </ScrollView>
      <View style={styles.headerIconsContainer}>
        <TouchableWithoutFeedback onPress={props.goBack}>
          <View style={styles.headerIcon}>
            <FEIcon name="chevron-left" color="black" size={25} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.headerIcon}>
            <FEIcon name="share" color="black" size={25} />
          </View>
        </TouchableWithoutFeedback>
      </View>
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
          <Text style={styles.imageCountText}>{`${focusedImageIndex + 1}/${
            defaultImages.length
          }`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ImageCarousel;

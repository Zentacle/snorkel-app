import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Share,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FEIcon from 'react-native-vector-icons/Feather';

import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import type { FunctionComponent } from 'react';

import { isBelowHeightThreshold, WIDTH } from '_utils/constants';

enum Directions {
  initial = 'initial',
  right = 'right',
  left = 'left',
}

interface ImageType {
  url: string;
  type?: string;
  name?: string;
}

const defaultImages: ImageType[] = [
  {
    url: 'https://snorkel.s3.amazonaws.com/default/default_hero_background.png',
  },
];

interface DiveLogImageCarouselProps {
  goBack: () => void;
  images?: ImageType[];
  shareUrl?: string;
}

const DiveLogImageCarousel: FunctionComponent<
  DiveLogImageCarouselProps
> = props => {
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: props.shareUrl as string,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of type result.activity type
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (err) {
      interface CaughtErr {
        message: string;
      }
      Alert.alert((err as CaughtErr).message);
    }
  };

  const [focusedImageIndex, setFocusedImageIndex] = React.useState(0);
  const images = (props.images && props.images.length)
    ? props.images
    : defaultImages
  return (
    <View style={styles.header}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <Image
            key={index}
            style={[
              styles.headerImage,
              !props.images ? {
                height: 130
              } : {}
            ]}
            source={{ uri: image.url }}
          />
        ))}
      </ScrollView>
      <View style={styles.headerIconsContainer}>
        <TouchableWithoutFeedback onPress={props.goBack}>
          <View style={styles.headerIcon}>
            <FEIcon name="chevron-left" color="black" size={25} />
          </View>
        </TouchableWithoutFeedback>
        {props.shareUrl ? (
          <TouchableWithoutFeedback onPress={onShare}>
            <View style={styles.headerIcon}>
              <FEIcon name="share" color="black" size={25} />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback>
            <View style={styles.headerIcon}>
              <FEIcon name="share" color="black" size={25} />
            </View>
          </TouchableWithoutFeedback>
        )}
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
          <Text style={styles.imageCountText}>
            {`${focusedImageIndex + 1}/${images.length}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {},
  headerIconsContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 67 : 45,
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
    height: isBelowHeightThreshold ? 260 : 300,
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

export default DiveLogImageCarousel;

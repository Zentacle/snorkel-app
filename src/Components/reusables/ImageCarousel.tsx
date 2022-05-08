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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FEIcon from 'react-native-vector-icons/Feather';

import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
} from 'react-native';
import type { FunctionComponent } from 'react';

import DiveSite1 from '_assets/DiveSite.jpg';
import DiveSite2 from '_assets/DiveSite2.jpg';
import DiveSite3 from '_assets/DiveSite3.jpg';
import DiveSite4 from '_assets/DiveSite4.jpg';
import { isBelowHeightThreshold, WIDTH } from '_utils/constants';

function makeActiveRange(arr: any[], curr: number) {
  const returnedRange = 5;
  const bandwidthRange = Math.floor(returnedRange / 2);

  //  length is less than 5
  if (arr.length < returnedRange) {
    return [0, arr.length];
  }

  // activeIndex less than 5
  if (curr < 5) {
    return [0, returnedRange];
  }

  // active index at the end of the array,
  if (curr === arr.length - 1) {
    return [curr - bandwidthRange - 2, arr.length];
  }

  return [curr - returnedRange + 1, curr + 1];
}

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

interface ImageCarouselProps {
  goBack: () => void;
  images?: {
    signedurl: string;
    type?: string;
    name?: string;
  }[];
  shareUrl?: string;
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
  let activeRange = makeActiveRange(
    props.images?.length ? props.images : defaultImages,
    focusedImageIndex,
  );

  if (props.images && props.images.length) {
    return (
      <View style={styles.header}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}>
          {props.images.length
            ? props.images.map((image, index) => (
                <Image
                  key={index}
                  style={styles.headerImage}
                  source={{ uri: image.signedurl }}
                />
              ))
            : defaultImages.map((image, index) => (
                <Image
                  key={index}
                  style={styles.headerImage}
                  source={image.source}
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
          <ScrollView contentContainerStyle={styles.photoDots}>
            {props.images
              .map((_dot, index) => {
                // const range =
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
              })
              .slice(...activeRange)}
          </ScrollView>
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
          {defaultImages
            .map((_dot, index) => {
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
            })
            .slice(...activeRange)}
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
    width: Dimensions.get('window').width,
  },
  photoDots: {
    flexDirection: 'row',
    // width: Dimensions.get('window').width * 0.6,
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

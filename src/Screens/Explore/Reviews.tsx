import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  ExploreStackParamList,
} from '_utils/interfaces';

import RatingsGradient from '_components/ui/RatingsGradient';
import { attachIcons } from '_utils/functions';
import ProfileImage from '_assets/Profile.jpg';

import { useAppSelector, useAppDispatch } from '_redux/hooks';
import {
  handleFetchReviews,
  isReviewInState,
  selectReviewById,
  selectLoadingState,
} from '_redux/slices/reviews';
import { selectDiveSiteById } from '_redux/slices/dive-sites';

function calculatePercentage(count: number, total: number): string {
  const percentage = (count / total) * 80; // factor width offset into calc
  return `${percentage}%`;
}

type ReviewNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ExploreStackParamList, 'Reviews'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type ReviewRouteProps = RouteProp<ExploreStackParamList, 'Reviews'>;

interface ReviewProps {
  navigation: ReviewNavigationProps;
  route: ReviewRouteProps;
}

const Reviews: FunctionComponent<ReviewProps> = ({ navigation, route }) => {
  const currentSpotId = route.params.id;
  const dispatch = useAppDispatch();
  const reviewInState = useAppSelector(isReviewInState(currentSpotId));
  const reviewObj = useAppSelector(selectReviewById(currentSpotId));
  const reviews = reviewInState ? Object.values(reviewObj) : [];
  const diveSite = useAppSelector(selectDiveSiteById(currentSpotId));
  const isLoading = useAppSelector(selectLoadingState);

  React.useEffect(() => {
    if (!reviewInState) {
      dispatch(handleFetchReviews(currentSpotId));
    }
  }, [currentSpotId, dispatch, reviewInState]);

  const goBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="grey" />;
  }

  if (!reviewInState) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <Icon name="chevron-left" color="black" size={25} onPress={goBack} />
      </View>
      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.reviewLabelContainer}>
          <MUIcon name="star" size={20} color="#aa00ff" />
          <Text style={styles.reviewRatingsLabelText}>
            {Number(diveSite.rating).toFixed(1)}
          </Text>
          <View style={styles.reviewDot} />
          <Text style={styles.reviewRatingsCount}>
            {diveSite.num_reviews} reviews
          </Text>
        </View>
        <View style={styles.ratingsContainer}>
          {diveSite.ratings &&
            Object.entries(diveSite.ratings).map(([level, count], index) => (
              <View key={index} style={styles.ratingItemContainer}>
                <View style={styles.ratingItemStarContainer}>
                  <Text style={styles.ratingItemStarLabel}>{level}</Text>
                  <MUIcon name="star" size={18} color="#aa00ff" />
                </View>
                <RatingsGradient
                  width={calculatePercentage(
                    count,
                    parseInt(diveSite.num_reviews),
                  )}
                />
                <Text style={styles.ratingItemCount}>{count}</Text>
              </View>
            ))}
        </View>
        <View style={styles.reviews}>
          {reviews.map((item, index) => (
            <View style={styles.review} key={index}>
              <View style={styles.reviewHeaderContainer}>
                <View style={styles.profile}>
                  {item.user.profile_pic ? (
                    <Image
                      source={{ uri: item.user.profile_pic }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Image source={ProfileImage} style={styles.profileImage} />
                  )}

                  <View style={styles.nameSourceContainer}>
                    <Text style={styles.profileName}>
                      {item.user.first_name}
                    </Text>
                    <Text style={styles.reviewSource}>
                      {item.shorediving_data ? 'Shore Diving' : 'Snorkel'}
                    </Text>
                  </View>
                </View>
                <View style={styles.ratingsIconsContainer}>
                  {attachIcons(item.rating, 20)}
                </View>
              </View>
              <View style={styles.reviewBodyContainer}>
                <Text style={styles.reviewBodyText}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  text: {
    color: 'black',
  },
  backButtonContainer: {
    marginHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
  },
  mainContent: {
    marginHorizontal: 20,
  },
  reviewLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingsCount: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  reviewRatingsLabelText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 5,
  },
  reviewDot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginHorizontal: 5,
    marginTop: 4,
  },
  ratingsContainer: {
    marginTop: 20,
  },
  ratingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1.5,
  },
  ratingItemStarContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  ratingItemStarLabel: {
    color: 'grey',
    marginRight: 5,
  },
  ratingItemCount: {
    color: 'black',
    marginLeft: 5,
  },
  reviews: {
    marginTop: 30,
  },
  review: {
    width: '100%',
    minHeight: 150,
    borderRadius: 24,
    padding: 20,
    marginVertical: 1.5,
    borderColor: '#e9e9e9',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  reviewHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewBodyContainer: {
    marginTop: 10,
  },
  reviewBodyText: {
    color: 'black',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  profileName: {
    color: 'black',
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '700',
  },
  nameSourceContainer: {
    marginLeft: 15,
  },
  reviewSource: {
    color: '#FFF',
    backgroundColor: '#0B94EF',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  ratingsIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 2,
  },
});

export default Reviews;

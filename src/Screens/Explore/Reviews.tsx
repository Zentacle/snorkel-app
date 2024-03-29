import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

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
import ProfileImage from '_assets/profile-placeholder.png';

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
  const { t } = useTranslation();
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
            {diveSite.num_reviews} {t('REVIEWS')}
          </Text>
        </View>
        <View style={styles.ratingsContainer}>
          {diveSite.ratings &&
            Object.entries(diveSite.ratings)
              .map(([level, count], index) => (
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
              ))
              .reverse()}
        </View>
        <View style={styles.reviews}>
          {reviews.map(item => (
            <View style={styles.review} key={item.id}>
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
                  <View style={styles.nameContainer}>
                    <Text style={styles.profileName}>
                      {item.user.display_name}
                    </Text>
                    <Text style={styles.separator}>·</Text>
                    <Text style={styles.date}>
                      {new Date(
                        item.date_dived || item.date_posted!,
                      ).toLocaleDateString([], {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View style={styles.activityRatingContainer}>
                    <View style={styles.activityTypeContainer}>
                      <Text style={styles.activityType}>
                        {item.activity_type}
                      </Text>
                    </View>
                    <View style={styles.ratingsIconsContainer}>
                      {attachIcons(item.rating, 20)}
                    </View>
                  </View>
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
  activityRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  text: {
    color: 'black',
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    paddingBottom: 15,
    borderBottomColor: '#CECECE',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  date: {
    color: '#828993',
  },
  mainContent: {
    marginHorizontal: 25,
    paddingTop: 30,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  reviewLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
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
    marginHorizontal: 4,
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
    minHeight: 100,
    borderRadius: 24,
    marginHorizontal: 5,
    // padding: 20,
    marginVertical: 10,
    // borderColor: '#e9e9e9',
    // borderWidth: StyleSheet.hairlineWidth,
    // borderStyle: 'solid',
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
  separator: {
    marginHorizontal: 4,
  },
  nameSourceContainer: {
    marginLeft: 15,
  },
  activityType: {
    color: '#FFF',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  activityTypeContainer: {
    backgroundColor: '#0B94EF',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginRight: 4,
  },
  ratingsIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 2,
  },
});

export default Reviews;

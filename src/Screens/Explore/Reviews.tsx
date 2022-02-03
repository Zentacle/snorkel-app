import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
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
import { attachIcons } from './utils/utils';
import ProfileImage from '_assets/Profile.jpg';

const ratings: { level: number; count: number }[] = [
  {
    level: 5,
    count: 7,
  },
  {
    level: 4,
    count: 6,
  },
  {
    level: 3,
    count: 3,
  },
  {
    level: 2,
    count: 12,
  },
  {
    level: 1,
    count: 4,
  },
];

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

const Reviews: FunctionComponent<ReviewProps> = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <Icon name="chevron-left" color="black" size={25} onPress={goBack} />
      </View>
      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.reviewLabelContainer}>
          <MUIcon name="star" size={20} color="#aa00ff" />
          <Text style={styles.reviewRatingsLabelText}>3.5</Text>
          <View style={styles.reviewDot} />
          <Text style={styles.reviewRatingsCount}>32 reviews</Text>
        </View>
        <View style={styles.ratingsContainer}>
          {ratings.map((rating, index) => (
            <View key={index} style={styles.ratingItemContainer}>
              <View style={styles.ratingItemStarContainer}>
                <Text style={styles.ratingItemStarLabel}>{rating.level}</Text>
                <MUIcon name="star" size={18} color="#aa00ff" />
              </View>
              <RatingsGradient width={calculatePercentage(rating.count, 32)} />
              <Text style={styles.ratingItemCount}>{rating.count}</Text>
            </View>
          ))}
        </View>
        <View style={styles.reviews}>
          {[1, 2, 3, 4, 5].map((_item, index) => (
            <View style={styles.review} key={index}>
              <View style={styles.reviewHeaderContainer}>
                <View style={styles.profile}>
                  <Image source={ProfileImage} style={styles.profileImage} />
                  <View style={styles.nameSourceContainer}>
                    <Text style={styles.profileName}>Akari</Text>
                    <Text style={styles.reviewSource}>Snorkel</Text>
                  </View>
                </View>
                <View style={styles.ratingsIconsContainer}>
                  {attachIcons(4, 20)}
                </View>
              </View>
              <View style={styles.reviewBodyContainer}>
                <Text style={styles.reviewBodyText}>
                  Love this site! There are plenty to see and too much of then
                  to fill in one dives so everyoneLove this site! There are
                  plenty to see and too much of then to fill in one much of then
                  to fill in one. There are plenty to see and too much of then
                  to fill in one. There are plenty to see and too much of then
                  to fill in one.
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 20,
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

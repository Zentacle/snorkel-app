import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';

import Button from '_components/ui/Buttons/Button';

import ProfileImage from '_assets/Profile.jpg';
import { attachIcons } from '_utils/functions';

interface DiveSiteReviewsProps {
  navigateToReviews: () => void;
}

const DiveSiteReviews: FunctionComponent<DiveSiteReviewsProps> = (
  {
    // navigateToReviews,
  },
) => {
  const { t } = useTranslation();
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewLabelContainer}>
        <Icon name="star" size={20} color="#aa00ff" />
        <Text style={styles.reviewRatingsLabelText}>3.5</Text>
        <View style={styles.reviewDot} />
        <Text style={styles.reviewRatingsCount}>52 {t('REVIEWS')}</Text>
      </View>
      <View style={styles.reviewCardsContainer}>
        <View style={styles.review}>
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
              Love this site! There are plenty to see and too much of then to
              fill in one dives so everyoneLove this site! There are plenty to
              see and too much of then to fill in one much of then to fill in
              one. There are plenty to see and too much of then to fill in one.
              There are plenty to see and too much of then to fill in one.
            </Text>
          </View>
        </View>
        <View style={styles.reviewCardShadow1} />
        <View style={styles.reviewCardShadow2} />
      </View>

      <Button
        // onPress={navigateToReviews}
        textGradient
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 0.65,
          y: 7.4,
        }}
        gradientColors={['#AA00FF', '#00E0FF']}
        style={{
          container: styles.showReviewsButtonContainer,
          text: styles.showReviewsButtonText,
        }}>
        {t('SHOW_ALL_REVIEWS')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    marginVertical: 20,
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
  reviewCardsContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  review: {
    width: '100%',
    minHeight: 150,
    // height: 235,
    backgroundColor: '#FFF',
    borderRadius: 24,
    elevation: 1.5,
    padding: 20,
    zIndex: 5,
  },
  reviewCardShadow1: {
    width: '97%',
    height: '91%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    position: 'absolute',
    top: 27,
    left: 4,
    elevation: 1.2,
    opacity: 0.9,
    zIndex: 3,
  },
  reviewCardShadow2: {
    width: '93%',
    height: '83%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    position: 'absolute',
    top: 51,
    left: 11,
    elevation: 1,
    opacity: 0.7,
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
  showReviewsButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    padding: 16,
    marginHorizontal: 0,
    elevation: 0.5,
  },
  showReviewsButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
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

export default DiveSiteReviews;

import React, { Fragment } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { SharedElement } from 'react-navigation-shared-element';

import ImageCarousel from '_components/reusables/ImageCarousel';
import DiveLocation from './DiveLocation';
import DiveSiteReviews from './DiveSiteReviews';
import DiveSiteComp from './DiveSite';
import Footer from './DiveSiteFooter';
import FullSiteSkeleton from '_components/reusables/Placeholders/DiveSiteLoading/FullSiteSkeleton';

import { capitalize } from '_utils/functions';
import { isBelowHeightThreshold, WIDTH } from '_utils/constants';
import { Spot } from '_utils/interfaces/data/spot';
import UnavailableLocationBox from '_screens/Logs/components/UnavailabbleLocationDetailBox';
import Location from '_assets/scuba_icons/Location.svg';
import type { Activity } from '../DiveSite';
import { Review } from '_utils/interfaces/data/review';

interface DiveSiteWithNavObjectProps {
  diveSite: Spot;
  navigateBack: () => void;
  seeFullDesc: boolean;
  setFullDesc: React.Dispatch<React.SetStateAction<boolean>>;
  navigateToMap: () => void;
  navigateToReviews: () => void;
  navigateToAuth: () => void;
  navigateToDiveLogForm: () => void;
  navigateToDiveSite: (diveSpotId: number, diveSpot: Spot) => void;
  activities: Activity[];
  reviews: Review[];
  nearby: Spot[];
  navObjectSpot: Spot;
  diveSiteInState: boolean;
}

const DiveSiteWithtNavObject: React.FunctionComponent<
  DiveSiteWithNavObjectProps
> = ({
  diveSite,
  navigateBack,
  seeFullDesc,
  setFullDesc,
  navigateToMap,
  activities,
  reviews,
  navigateToReviews,
  nearby,
  navigateToDiveSite,
  navigateToAuth,
  navigateToDiveLogForm,
  navObjectSpot,
  diveSiteInState,
}) => {
  const { t } = useTranslation();

  const siteHasCoordinates = !!(
    diveSite &&
    diveSite.longitude &&
    diveSite.latitude
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <SharedElement id={`item.${navObjectSpot.id}.image`}>
          <ImageCarousel
            goBack={navigateBack}
            shareUrl={`https://zentacle.com${navObjectSpot.url}`}
            images={
              diveSiteInState
                ? diveSite.images
                : navObjectSpot.hero_img
                ? [
                    {
                      signedurl: navObjectSpot.hero_img,
                    },
                  ]
                : []
            }
          />
        </SharedElement>

        <View style={styles.contentContainer}>
          <SharedElement id={`item.${navObjectSpot.id}.name`}>
            <Text style={styles.mainDescription}>{navObjectSpot.name}</Text>
          </SharedElement>

          <SharedElement id={`item.${navObjectSpot.id}.location`}>
            <View style={styles.locationContainer}>
              <Location width={15} />
              <Text style={styles.locationText}>
                {navObjectSpot.location_city}
              </Text>
            </View>
          </SharedElement>

          <SharedElement id={`item.${navObjectSpot.id}.review`}>
            <View style={styles.ratingsContainer}>
              <Text style={styles.ratingsLevelText}>
                {capitalize(navObjectSpot.difficulty) || t('BEGINNER')}
              </Text>
              <View style={styles.dot} />
              <Text style={styles.ratingsText}>
                {Number(navObjectSpot.rating).toFixed(1)}
              </Text>
              <Icon name="star" size={20} color="#aa00ff" />
              <Text style={styles.ratingsCount}>
                ({navObjectSpot.num_reviews})
              </Text>
            </View>
          </SharedElement>

          {seeFullDesc ? (
            <SharedElement id={`item.${navObjectSpot.id}.description`}>
              <View style={[styles.descriptionContainer]}>
                <Text style={styles.descriptionText}>
                  {navObjectSpot.description}
                </Text>
                <Pressable onPress={() => setFullDesc(false)}>
                  <Text style={styles.seeMoreText}>See less</Text>
                </Pressable>
              </View>
            </SharedElement>
          ) : (
            <SharedElement id={`item.${navObjectSpot.id}.description`}>
              <View style={[styles.descriptionContainer]}>
                <Text numberOfLines={4} style={styles.descriptionText}>
                  {navObjectSpot.description}
                </Text>
                <Pressable onPress={() => setFullDesc(true)}>
                  <Text style={styles.seeMoreText}>See more</Text>
                </Pressable>
              </View>
            </SharedElement>
          )}

          {diveSite && typeof diveSite.images === 'object' ? (
            <Fragment>
              {siteHasCoordinates ? (
                <DiveLocation
                  coordinates={{
                    latitude: diveSite.latitude,
                    longitude: diveSite.longitude,
                  }}
                  navigateToMap={navigateToMap}
                />
              ) : (
                <View style={{ marginVertical: 10 }}>
                  <UnavailableLocationBox desc={diveSite.location_city} />
                </View>
              )}

              {activities.map((activity, index) => (
                <View key={index} style={styles.activityContainer}>
                  <View style={styles.activity}>
                    <Text style={styles.activityLabel}>{activity.label}</Text>
                    <View style={styles.activityValueContainer}>
                      {activity.values.map(value => (
                        <Text key={value} style={styles.activityValue}>
                          {value}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              ))}

              {!!diveSite.num_reviews && (
                <DiveSiteReviews
                  diveSite={diveSite}
                  navigateToReviews={navigateToReviews}
                  reviews={reviews}
                />
              )}
            </Fragment>
          ) : (
            <FullSiteSkeleton />
          )}
        </View>

        {!!nearby.length && (
          <View style={styles.nearbySites}>
            <View style={styles.nearbySitesTextContainer}>
              <Text style={styles.nearbySitesMainText}>
                {t('NEARBY_LOCATIONS')}
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.nearbySitesCardsContainer}
              showsHorizontalScrollIndicator={false}>
              {nearby.map(item => (
                <DiveSiteComp
                  key={item.id}
                  site={item}
                  containerStyle={styles.nearbySiteItemContainer}
                  imageContainerStyle={styles.nearbySiteItemContainer}
                  imageStyle={styles.nearbySiteItemImage}
                  onPressContainer={navigateToDiveSite}
                />
              ))}
            </ScrollView>
          </View>
        )}
        {/* <View style={styles.diveShops}>
          <View style={styles.diveShopsTextContainer}>
            <Text style={styles.diveShopsMainText}>
              {t('CLOSEST_DIVE_SHOPS')}
            </Text>
            <TouchableWithoutFeedback>
              <GradientText
                gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 0.06,
                  y: 1.8,
                }}
                gradientLocations={[0.01, 1, 1]}
                style={styles.diveShopsMoreText}>
                {t('OPEN_MORE')}
              </GradientText>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.diveShopsCardsContainer}>
            {[1, 2, 3].map((item, index) => (
              <DiveShopComp key={index} onPressContainer={navigateToDiveShop} />
            ))}
          </ScrollView>
          <View style={styles.reportContainer}>
            <Ionicon name="flag-outline" color="black" size={22} />
            <Text style={styles.reportText}>{t('REPORT_THIS_LOCATION')}</Text>
          </View>
        </View> */}
      </ScrollView>
      {!!diveSite && (
        <Footer
          reviewCount={diveSite.num_reviews}
          navigateToAuth={navigateToAuth}
          navigateToDiveLogForm={navigateToDiveLogForm}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: isBelowHeightThreshold ? 120 : 115,
  },
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
  ratingsLevelText: {
    color: '#aa00ff',
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginLeft: 10,
    marginRight: 5,
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
  nearbySites: {
    marginTop: 20,
  },
  nearbySiteItemContainer: {
    width: WIDTH * 0.8,
    marginRight: 15,
  },
  nearbySiteItemImageContainer: {
    width: WIDTH * 0.8,
  },
  nearbySiteItemImage: {
    width: WIDTH * 0.8,
  },
  nearbySitesTextContainer: {
    marginHorizontal: 25,
  },
  nearbySitesMainText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  nearbySitesCardsContainer: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  diveShops: {
    marginTop: 15,
  },
  diveShopsCardsContainer: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  diveShopsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    alignItems: 'center',
  },
  diveShopsMainText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    width: '60%',
  },
  diveShopsMoreText: {
    fontSize: 18,
    fontWeight: '400',
  },
  reportContainer: {
    marginVertical: 20,
    marginHorizontal: 25,
    flexDirection: 'row',
  },
  reportText: {
    color: 'black',
    fontSize: 15,
    marginLeft: 5,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  activityContainer: {
    marginVertical: 5,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  activity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityLabel: {
    color: 'grey',
    fontSize: 15,
    width: '25%',
  },
  activityValueContainer: {
    flexDirection: 'row',
    width: '75%',
    flexWrap: 'wrap',
  },
  activityValue: {
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 5,
  },
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    color: 'black',
  },
  seeMoreText: {
    marginTop: 3,
    color: '#AA00FF',
    fontWeight: '500',
  },
});

//make this component available to the app
export default DiveSiteWithtNavObject;

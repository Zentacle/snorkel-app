import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import ImageCarousel from '_components/reusables/ImageCarousel';
import DiveLocation from './components/DiveLocation';
import DiveSiteReviews from './components/DiveSiteReviews';
import DiveSiteComp from './components/DiveSite';
import Footer from './components/DiveSiteFooter';
import { useAppSelector, useAppDispatch } from '_redux/hooks';
import {
  selectDiveSiteById,
  handleFetchDiveSite,
  isDiveSiteDetailinState,
  selectLoadingState,
} from '_redux/slices/dive-sites';
import { fetchNearby } from '_redux/slices/dive-sites/api';
import {
  handleFetchReviews,
  selectReviewById,
  isReviewInState,
} from '_redux/slices/reviews';

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
import type { Spot } from '_utils/interfaces/data/spot';

import { capitalize } from '_utils/functions';
import { isBelowHeightThreshold, WIDTH } from '_utils/constants';
import DiveSiteLoading from '_components/reusables/Placeholders/DiveSiteLoading';
import UnavailableLocationBox from '_screens/Logs/components/UnavailabbleLocationDetailBox';
import Location from '_assets/scuba_icons/Location.svg';

type DiveSiteNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ExploreStackParamList, 'DiveSite'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type DiveSiteRouteProps = RouteProp<ExploreStackParamList, 'DiveSite'>;

interface DiveSiteProps {
  navigation: DiveSiteNavigationProps;
  route: DiveSiteRouteProps;
}

interface Activity {
  label: string;
  values: string[];
}

const DiveSite: FunctionComponent<DiveSiteProps> = ({ navigation, route }) => {
  const currentSpotId = route.params.diveSpotId;
  const { t } = useTranslation();
  const [nearby, setNearby] = React.useState<Spot[]>([]);
  const [seeFullDesc, setFullDesc] = React.useState(false);

  const activities: Activity[] = [
    {
      label: t('ACTIVITY'),
      values: [t('SCUBA'), t('SNORKEL'), t('FREE')],
    },
    {
      label: t('ENTRY'),
      values: [t('SHORE'), t('WATER')],
    },
    {
      label: t('TAGS'),
      values: [t('BEACH'), t('CORAL'), t('DIVE_PARTY')],
    },
  ];

  const diveSiteInState = useAppSelector(
    isDiveSiteDetailinState(currentSpotId),
  );

  const reviewInState = useAppSelector(isReviewInState(currentSpotId));
  const isLoading = useAppSelector(selectLoadingState);

  const reviewObj = useAppSelector(selectReviewById(currentSpotId));
  const reviews = reviewInState ? Object.values(reviewObj) : [];
  const diveSite = useAppSelector(selectDiveSiteById(currentSpotId));

  // const diveSiteImages = [
  //   {
  //     uri: diveSite.hero_img,
  //   },
  // ];

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchNearby(currentSpotId).then(results => setNearby(results.data));
    // only fetch dive site and reviews if they don't already exist
    // in their respective redux slices.
    if (!reviewInState) {
      dispatch(handleFetchReviews(currentSpotId));
    }

    // because we need to fetch images as well, we're making calls to the api unless the
    // site we  want has had its images downloaded
    if (!diveSiteInState || (diveSiteInState && !diveSite.images)) {
      dispatch(handleFetchDiveSite(currentSpotId));
    }
  }, [currentSpotId, dispatch, reviewInState, diveSiteInState, diveSite]);

  const navigateToDiveSite = (diveSpotId: number) => {
    navigation.push('ExploreStack', {
      screen: 'DiveSite',
      params: {
        diveSpotId,
      },
    });
  };

  // const navigateToDiveShop = () => {
  //   navigation.navigate('ExploreStack', {
  //     screen: 'DiveShop',
  //   });
  // };

  const navigateToDiveLogForm = () => {
    navigation.navigate('App', {
      screen: 'LogsForm',
      params: {
        diveLogs: {
          location: {
            lat: diveSite.latitude,
            lng: diveSite.longitude,
            desc: diveSite.name,
            location_city: diveSite.location_city,
            beach_id: diveSite.id,
          },
        },
      },
    });
  };

  const navigateToMap = () => {
    diveSite &&
      navigation.navigate('ExploreStack', {
        screen: 'Map',
        params: {
          coords: {
            lat: diveSite.latitude,
            lng: diveSite.longitude,
          },
        },
      });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToReviews = () => {
    navigation.navigate('Reviews', {
      id: currentSpotId,
    });
  };

  const navigateToAuth = () => {
    navigation.navigate('Auth', {
      screen: 'Landing',
    });
  };

  if (isLoading) {
    return <DiveSiteLoading />;
    // return <ActivityIndicator style={{ flex: 1 }} size="large" color="grey" />;
  }

  if (!diveSiteInState) {
    return null;
  }

  const siteHasCoordinates = !!(diveSite.longitude && diveSite.latitude);

  return (
    <View style={styles.container}>
      {/* {Platform.OS === 'ios' && <StatusBar barStyle={'light-content'} />} */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <ImageCarousel
          goBack={navigateBack}
          shareUrl={`https://zentacle.com${diveSite.url}`}
          images={diveSite.images}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.mainDescription}>{diveSite.name}</Text>
          <View style={styles.locationContainer}>
            <Location width={15} />
            <Text style={styles.locationText}>{diveSite.location_city}</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsLevelText}>
              {capitalize(diveSite.difficulty) || t('BEGINNER')}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.ratingsText}>
              {Number(diveSite.rating).toFixed(1)}
            </Text>
            <Icon name="star" size={20} color="#aa00ff" />
            <Text style={styles.ratingsCount}>({diveSite.num_reviews})</Text>
          </View>

          {seeFullDesc ? (
            <View style={[styles.descriptionContainer]}>
              <Text style={styles.descriptionText}>{diveSite.description}</Text>
              <Pressable onPress={() => setFullDesc(false)}>
                <Text style={styles.seeMoreText}>See less</Text>
              </Pressable>
            </View>
          ) : (
            <View style={[styles.descriptionContainer]}>
              <Text numberOfLines={4} style={styles.descriptionText}>
                {diveSite.description}
              </Text>
              <Pressable onPress={() => setFullDesc(true)}>
                <Text style={styles.seeMoreText}>See more</Text>
              </Pressable>
            </View>
          )}

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
                  {activity.values.map((value, idx) => (
                    <Text key={idx} style={styles.activityValue}>
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
        </View>
        {!!nearby && (
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
              {nearby.map((item, index) => (
                <DiveSiteComp
                  key={index}
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
      <Footer
        reviewCount={diveSite.num_reviews}
        navigateToAuth={navigateToAuth}
        navigateToDiveLogForm={navigateToDiveLogForm}
      />
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

export default DiveSite;

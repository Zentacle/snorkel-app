import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import ImageCarousel from '_components/reusables/ImageCarousel';
import DiveLocation from './components/DiveLocation';
import DiveSiteReviews from './components/DiveSiteReviews';
import GradientText from '_components/ui/GradientText';
import DiveSiteComp from './components/DiveSite';
import DiveShopComp from './components/DiveShop';
import Footer from './components/DiveSiteFooter';
import { useAppSelector, useAppDispatch } from '_redux/hooks';
import {
  selectDiveSiteById,
  handleFetchNearby,
  handleFetchDiveSite,
  isDiveSiteDetailinState,
  selectLoadingState,
} from '_redux/slices/dive-sites';
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

import LocationImage from '_assets/Location.png';
import { capitalize } from '_utils/functions';

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

const activities: Activity[] = [
  {
    label: 'Activity',
    values: ['Scuba', 'Snorkel', 'Free'],
  },
  {
    label: 'Entry',
    values: ['Shore', 'Water'],
  },
  {
    label: 'Tags',
    values: ['Beach', 'Coral', 'Dive Party'],
  },
];

const WIDTH = Dimensions.get('window').width;

const DiveSite: FunctionComponent<DiveSiteProps> = ({ navigation, route }) => {
  const currentSpotId = route.params.diveSpotId;

  const [nearby, setNearby] = React.useState<Spot[]>([]);

  const diveSiteInState = useAppSelector(
    isDiveSiteDetailinState(currentSpotId),
  );

  const reviewInState = useAppSelector(isReviewInState(currentSpotId));
  const isLoading = useAppSelector(selectLoadingState);

  const reviewObj = useAppSelector(selectReviewById(currentSpotId));
  const reviews = reviewInState ? Object.values(reviewObj) : [];
  const diveSite = useAppSelector(selectDiveSiteById(currentSpotId));

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    handleFetchNearby(currentSpotId).then(results => setNearby(results));
    // only fetch dive site and reviews if they don't already exist
    // in their respective redux slices.
    if (!reviewInState) {
      dispatch(handleFetchReviews(currentSpotId));
    }
    if (!diveSiteInState) {
      dispatch(handleFetchDiveSite(currentSpotId));
    }
  }, [currentSpotId, dispatch, reviewInState, diveSiteInState]);

  const navigateToDiveSite = (diveSpot: Spot) => {
    navigation.push('ExploreStack', {
      screen: 'DiveSite',
      params: {
        diveSpotId: diveSpot.id,
      },
    });
  };

  const navigateToDiveShop = () => {
    navigation.navigate('ExploreStack', {
      screen: 'DiveShop',
    });
  };

  const navigateToDiveLogForm = () => {
    navigation.navigate('App', {
      screen: 'LogsForm',
      params: {
        diveLogs: {},
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
      diveSpotId: currentSpotId,
    });
  };

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="grey" />;
  }

  if (!diveSiteInState) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <ImageCarousel goBack={navigateBack} />

        <View style={styles.contentContainer}>
          <Text style={styles.mainDescription}>{diveSite.name}</Text>
          <View style={styles.locationContainer}>
            <Image source={LocationImage} />
            <Text style={styles.locationText}>{diveSite.location_city}</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsLevelText}>
              {capitalize(diveSite.difficulty) || 'Beginner'}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.ratingsText}>
              {Number(diveSite.rating).toFixed(1)}
            </Text>
            <Icon name="star" size={20} color="#aa00ff" />
            <Text style={styles.ratingsCount}>({diveSite.num_reviews})</Text>
          </View>

          <DiveLocation
            coordinates={{
              latitude: diveSite.latitude,
              longitude: diveSite.longitude,
            }}
            navigateToMap={navigateToMap}
          />

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
        <View style={styles.nearbySites}>
          <View style={styles.nearbySitesTextContainer}>
            <Text style={styles.nearbySitesMainText}>Nearby Locations</Text>
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
        <View style={styles.diveShops}>
          <View style={styles.diveShopsTextContainer}>
            <Text style={styles.diveShopsMainText}>Closest Dive Shops</Text>
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
                Open More
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
            <Text style={styles.reportText}>Report this location</Text>
          </View>
        </View>
      </ScrollView>
      <Footer navigateToDiveLogForm={navigateToDiveLogForm} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: Platform.OS === 'android' ? 114 : 80,
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
    marginTop: 5,
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
  },
  activityValue: {
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 5,
  },
});

export default DiveSite;

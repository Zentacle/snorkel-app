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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import ImageCarousel from './components/ImageCarousel';
import DiveLocation from './components/DiveLocation';
import DiveSiteReviews from './components/DiveSiteReviews';
import GradientText from '_components/ui/GradientText';
import DiveSiteComp from './components/DiveSite';
import DiveShopComp from './components/DiveShop';
import Footer from './components/DiveSiteFooter';

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

import LocationImage from '_assets/Location.png';
import { capitalize } from './utils/utils';

type DiveSiteNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ExploreStackParamList, 'DiveSite'>,
  NativeStackNavigationProp<RootStackParamList>
>;

// type DiveSiteRouteProps = CompositeNavigationProp<
//   RouteProp<ExploreStackParamList, 'DiveSite'>,
//   RouteProp<RootStackParamList>
// >;

type DiveSiteRouteProps = RouteProp<ExploreStackParamList, 'DiveSite'>;
// >;

interface DiveSiteProps {
  navigation: DiveSiteNavigationProps;
  route: DiveSiteRouteProps;
}

const WIDTH = Dimensions.get('window').width;

const DiveSite: FunctionComponent<DiveSiteProps> = ({ navigation, route }) => {
  const currentSpot = route.params.diveSpot;
  const navigateToDiveSite = () => {
    navigation.navigate('ExploreStack', {
      screen: 'DiveSite',
      params: {
        diveSpot: currentSpot,
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
    });
  };

  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <ImageCarousel goBack={navigateBack} />

        <View style={styles.contentContainer}>
          <Text style={styles.mainDescription}>{currentSpot.name}</Text>
          <View style={styles.locationContainer}>
            <Image source={LocationImage} />
            <Text style={styles.locationText}>{currentSpot.location_city}</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsLevelText}>
              {capitalize(currentSpot.difficulty) || 'Beginner'}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.ratingsText}>
              {Number(currentSpot.rating).toFixed(1)}
            </Text>
            <Icon name="star" size={20} color="#aa00ff" />
            <Text style={styles.ratingsCount}>({currentSpot.num_reviews})</Text>
          </View>

          <DiveLocation />

          <DiveSiteReviews />
        </View>
        <View style={styles.nearbySites}>
          <View style={styles.nearbySitesTextContainer}>
            <Text style={styles.nearbySitesMainText}>Nearby Locations</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.nearbySitesCardsContainer}
            showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item, index) => (
              <DiveSiteComp
                key={index}
                site={currentSpot}
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
  nearbySites: {},
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
});

export default DiveSite;

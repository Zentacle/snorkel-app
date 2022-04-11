import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import FEIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
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

import DiveLocation from './components/DiveLocation';
import DiveShopReviews from './components/DiveShopReviews';
import GradientText from '_components/ui/GradientText';
import DiveShopComp from './components/DiveShop';
import Footer from './components/DiveShopFooter';

import LocationImage from '_assets/Location.png';
import { isBelowHeightThreshold } from '_utils/constants';

type DiveShopNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ExploreStackParamList, 'DiveShop'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type DiveShopRouteProps = RouteProp<ExploreStackParamList, 'DiveShop'>;

interface DiveShopProps {
  navigation: DiveShopNavigationProps;
  route: DiveShopRouteProps;
}

interface Activity {
  label: string;
  values: string[];
}

const DiveShop: FunctionComponent<DiveShopProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const goBack = () => {
    navigation.goBack();
  };

  const activities: Activity[] = [
    {
      label: t('ITEMS'),
      values: [t('WEAR'), t('GEAR'), t('EQUIPMENT')],
    },
    {
      label: t('TAGS'),
      values: [t('BEACH'), t('CORAL'), t('DIVE_PARTY')],
    },
  ];

  const navigateToMap = () => {
    navigation.navigate('ExploreStack', {
      screen: 'Map',
      params: {
        coords: {
          lat: -8.409518,
          lng: 115.188919,
        },
      },
    });
  };

  const navigateToReviews = () => {
    // navigation.navigate('ExploreStack', {
    //   screen: 'Reviews',
    // });
  };

  const navigateToWebsite = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerIconsContainer}>
        <TouchableWithoutFeedback onPress={goBack}>
          <View style={styles.headerIcon}>
            <FEIcon name="chevron-left" color="black" size={25} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.headerIcon}>
            <FEIcon name="share" color="black" size={25} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.mainDescription}>Maui Dreams</Text>
            <View style={styles.locationContainer}>
              <Image source={LocationImage} />
              <Text style={styles.locationText}>East Bali, Indonesia</Text>
            </View>
            <View style={styles.ratingsContainer}>
              <Text style={styles.ratingsText}>4.3</Text>
              <Icon name="star" size={20} color="#aa00ff" />
              <Text style={styles.ratingsCount}>(463)</Text>
            </View>
          </View>

          <DiveLocation
            coordinates={{
              latitude: -8.409518,
              longitude: 115.188919,
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

          <DiveShopReviews navigateToReviews={navigateToReviews} />
        </View>

        <View style={styles.diveShops}>
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
              <DiveShopComp key={index} />
            ))}
          </ScrollView>
          <View style={styles.reportContainer}>
            <Ionicon name="flag-outline" color="black" size={22} />
            <Text style={styles.reportText}>{t('REPORT_THIS_POST')}</Text>
          </View>
        </View>
      </ScrollView>
      <Footer navigateToWebsite={navigateToWebsite} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  scrollContainer: {
    marginBottom: isBelowHeightThreshold ? 100 : 80,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerIcon: {
    marginHorizontal: 20,
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 20,
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
});

export default DiveShop;

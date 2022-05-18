import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import GradientText from '_components/ui/GradientText';
// import DiveShopImage from '_assets/EcoCenter.jpeg';
import LocationImage from '_assets/LocationLargish.png';
import DiveSiteImage from '_assets/DiveSite5.jpeg';

import { useAppSelector } from '_redux/hooks';
import { selectAllDiveSites } from '_redux/slices/dive-sites';

import { destinations } from '../utils';
import { Spot } from '_utils/interfaces/data/spot';

interface SearchMainViewProps {
  navigateToDiveSite: (id: number) => void;
}

const SearchMainView: React.FunctionComponent<SearchMainViewProps> = ({
  navigateToDiveSite,
}) => {
  const diveSites = Object.values(useAppSelector(selectAllDiveSites));
  const { t } = useTranslation();
  const recentSearches = [
    t('BEACH'),
    t('CORAL'),
    t('DIVE'),
    t('DIVE_PARTY'),
    t('PARTY'),
  ];

  return (
    <View style={styles.mainBody}>
      {/* <View style={styles.recentSearchesContainer}>
        <Text style={styles.headerLabel}>{t('RECENT_SEARCHES')}</Text>
        <ScrollView
          style={styles.recentSearches}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {recentSearches.map((item, index) => (
            <View style={styles.recentSearch} key={index}>
              <Text style={styles.recentSearchesText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View> */}

      {/* <View style={styles.destinationsContainer}>
        <View style={styles.destinationLabelContainer}>
          <Text style={styles.headerLabel}>{t('DESTINATION')}</Text>
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
            style={styles.headerLabelGradient}>
            {t('SEE_ALL')}
          </GradientText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinations}>
          {destinations.map((destination, index) => (
            <View style={styles.destination} key={index}>
              <Image
                source={destination.image}
                style={styles.destinationImage}
              />
              <View style={styles.destinationTextContainer}>
                <Text style={styles.destinationMainText}>
                  {destination.place}
                </Text>
                <Text style={styles.destinationSubtext}>
                  {destination.country}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View> */}

      {/* <View style={styles.diveShopsContainer}>
        <View style={styles.diveShopLabelContainer}>
          <Text style={styles.headerLabel}>{t('DIVE_SHOPS')}</Text>
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
            style={styles.headerLabelGradient}>
            {t('SEE_ALL')}
          </GradientText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.diveShops}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <View style={styles.diveShop} key={index}>
              <Image source={DiveShopImage} style={styles.diveShopImage} />
              <View style={styles.diveShopTextContainer}>
                <Text style={styles.diveShopMainText}>
                  Ecologic Divers Center
                </Text>
                <View style={styles.diveShopLocationContainer}>
                  <Image style={styles.locationImage} source={LocationImage} />
                  <Text style={styles.diveShopLocationText}>
                    East Bali Lighthouse
                  </Text>
                </View>
                <Text style={styles.diveShopSubtext}>
                  Diving Equipment Retail
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View> */}

      <View style={styles.diveSitesContainer}>
        <View style={styles.diveSiteLabelContainer}>
          <Text style={styles.headerLabel}>{t('POPULAR_DIVE_SITES')}</Text>
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
            style={styles.headerLabelGradient}>
            {t('SEE_ALL')}
          </GradientText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.diveSites}>
          {diveSites.map((diveSite: Spot) => (
            <Pressable
              key={diveSite.id}
              onPress={() => navigateToDiveSite(diveSite.id)}>
              <View style={styles.diveSite}>
                {diveSite.hero_img ? (
                  <Image
                    source={{ uri: diveSite.hero_img }}
                    style={styles.diveSiteImage}
                  />
                ) : (
                  <Image source={DiveSiteImage} style={styles.diveSiteImage} />
                )}
                <View style={styles.diveSiteTextContainer}>
                  <Text numberOfLines={1} style={styles.diveSiteMainText}>
                    {diveSite.name}
                  </Text>
                  <View style={styles.diveSiteSubtextContainer}>
                    <Image
                      style={styles.locationImage}
                      source={LocationImage}
                    />
                    <Text numberOfLines={1} style={styles.diveSiteSubtext}>
                      {diveSite.location_city}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 25,
  },
  mainBody: {},
  recentSearchesContainer: {
    marginTop: 30,
  },
  recentSearches: {
    flexDirection: 'row',
    paddingLeft: 25,
    marginTop: 15,
  },
  recentSearchesText: {
    color: 'black',
  },
  recentSearch: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 15,
    borderRadius: 10,
  },
  destinationsContainer: {
    marginTop: 40,
  },
  destinations: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  destinationLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerLabelGradient: {
    fontSize: 18,
    fontWeight: '400',
    marginRight: 25,
  },
  destination: {
    marginRight: 15,
  },
  destinationImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  destinationTextContainer: {
    marginTop: 10,
  },
  destinationMainText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  destinationSubtext: {
    fontSize: 14,
    color: 'grey',
  },
  diveShopsContainer: {
    marginTop: 40,
  },
  diveShops: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  diveShopLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  diveShop: {
    marginRight: 15,
    flexDirection: 'row',
  },
  diveShopImage: {
    width: 80,
    height: 85,
    borderRadius: 8,
  },
  diveShopTextContainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  diveShopMainText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  diveShopSubtext: {
    fontSize: 14,
    color: 'grey',
  },
  diveShopLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveShopLocationText: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 10,
  },
  locationImage: {
    width: 15,
    height: 18,
  },
  diveSitesContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
  diveSites: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  diveSiteLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  diveSite: {
    marginRight: 15,
  },
  diveSiteImage: {
    width: 150,
    height: 160,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E0E0E0',
  },
  diveSiteTextContainer: {
    marginTop: 10,
  },
  diveSiteMainText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
    width: 150,
  },
  diveSiteSubtext: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 10,
    flex: 1,
    width: 100,
  },
  diveSiteSubtextContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default SearchMainView;

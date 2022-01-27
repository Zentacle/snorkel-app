import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';

import SearchInput from '_components/ui/SearchInput';
import Tag from '_components/ui/Tag';
import GradientText from '_components/ui/GradientText';
import DiveSite from './components/DiveSite';
import DiveShop from './components/DiveShop';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import {
  handleFetchDiveSites,
  selectAllDiveSites,
} from '_redux/slices/dive-sites';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';
import type { ImageSourcePropType } from 'react-native';
// import type { Spot } from '_utils/interfaces/data/spot';

import Newest from '_assets/tags/newest.png';
import Popular from '_assets/tags/popular.png';
import TopRating from '_assets/tags/top-rating.png';

const WIDTH = Dimensions.get('window').width;

interface TagInterface {
  name: string;
  imageIcon: ImageSourcePropType;
}
const tags: TagInterface[] = [
  {
    name: 'Popular',
    imageIcon: Popular,
  },
  {
    name: 'Newest',
    imageIcon: Newest,
  },
  {
    name: 'Top Rating',
    imageIcon: TopRating,
  },
  {
    name: 'Popular',
    imageIcon: Popular,
  },
  {
    name: 'Newest',
    imageIcon: Newest,
  },
];

type ExploreNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'Explore'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ExploreProps {
  navigation: ExploreNavigationProps;
}

const Explore: FunctionComponent<ExploreProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const diveSites = useAppSelector(selectAllDiveSites);

  console.log('dive sites from store', diveSites);
  // const [diveSites, setDiveSites] = React.useState<Spot>([]);
  React.useEffect(() => {
    dispatch(handleFetchDiveSites());
  }, []);

  const navigateToDiveSite = () => {
    navigation.navigate('ExploreStack', {
      screen: 'DiveSite',
    });
  };

  const navigateToDiveShop = () => {
    navigation.navigate('ExploreStack', {
      screen: 'DiveShop',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome, David!</Text>
        <SearchInput />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.tagScrollContainer}>
          {tags.map((tag, index) => (
            <Tag key={index} imageSource={tag.imageIcon}>
              {tag.name}
            </Tag>
          ))}
        </ScrollView>
        <View style={styles.nearbySites}>
          <View style={styles.nearbySitesTextContainer}>
            <Text style={styles.nearbySitesMainText}>Dive Sites Nearby</Text>
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
                style={styles.nearbySitesMapText}>
                View Map
              </GradientText>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.nearbySitesCardsContainer}
            showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item, index) => (
              <DiveSite
                key={index}
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
            <Text style={styles.diveShopsMainText}>Dive Shops</Text>
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
              <DiveShop key={index} onPressContainer={navigateToDiveShop} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.diveSites}>
          <View style={styles.diveSitesTextContainer}>
            <Text style={styles.diveSitesMainText}>Dive Sites Nearby</Text>
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
                style={styles.diveSitesMapText}>
                View Map
              </GradientText>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            contentContainerStyle={styles.diveSitesCardsContainer}
            showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item, index) => (
              <DiveSite
                key={index}
                containerStyle={styles.diveSiteItemContainer}
                imageContainerStyle={styles.diveSiteItemContainer}
                imageStyle={styles.diveSiteItemImage}
                onPressContainer={navigateToDiveSite}
              />
            ))}
          </ScrollView>
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
  contentContainer: {
    marginBottom: Platform.OS === 'android' ? 100 : 65,
    paddingBottom: 50,
  },
  welcomeText: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    marginHorizontal: 25,
    marginTop: 30,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    alignItems: 'center',
  },
  nearbySitesMainText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  nearbySitesMapText: {
    fontSize: 18,
    fontWeight: '400',
  },
  nearbySitesCardsContainer: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  tagScrollContainer: {
    paddingLeft: 25,
    paddingRight: 10,
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
    fontWeight: '700',
  },
  diveShopsMoreText: {
    fontSize: 18,
    fontWeight: '400',
  },
  diveSites: {
    marginTop: 20,
  },
  diveSiteItemContainer: {
    width: WIDTH * 0.87,
  },
  diveSiteItemImageContainer: {
    width: WIDTH * 0.87,
  },
  diveSiteItemImage: {
    width: WIDTH * 0.87,
  },
  diveSitesTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    alignItems: 'center',
  },
  diveSitesMainText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  diveSitesMapText: {
    fontSize: 18,
    fontWeight: '400',
  },
  diveSitesCardsContainer: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
});

export default Explore;

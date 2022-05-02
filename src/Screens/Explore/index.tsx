import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Form, Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import SearchInput from '_components/ui/SearchInput';
import Tag from '_components/ui/Tag';
import GradientText from '_components/ui/GradientText';
import DiveSite from './components/DiveSite';
// import DiveShop from './components/DiveShop';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import {
  handleFetchDiveSites,
  selectAllDiveSites,
  selectLoadingState,
  handleFetchRecommended,
  selectRecommendedSites,
} from '_redux/slices/dive-sites';
import { selectUser, selectAuthToken } from '_redux/slices/user';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';
import type { ImageSourcePropType } from 'react-native';

import BeachLoading from '_components/reusables/Placeholders/BeachLoading/index';
import Newest from '_assets/tags/newest.png';
import Popular from '_assets/tags/popular.png';
import TopRating from '_assets/tags/top-rating.png';
import AutocompleteModal from './components/AutocompleteModal';

import { WIDTH, HEIGHT, isBelowWidthThreshold } from '_utils/constants';

interface TagInterface {
  name: string;
  imageIcon: ImageSourcePropType;
}

type ExploreNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'Explore'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ExploreProps {
  navigation: ExploreNavigationProps;
}

const Explore: FunctionComponent<ExploreProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const diveSites = Object.values(useAppSelector(selectAllDiveSites)) || [];
  const recommended =
    Object.values(useAppSelector(selectRecommendedSites)) || [];
  const diveSitesIsLoading = useAppSelector(selectLoadingState);
  const user = useAppSelector(selectUser);
  const [autocompleteModalOpen, toggleAutocompleteModal] =
    React.useState(false);
  const authToken = useAppSelector(selectAuthToken);

  const tags: TagInterface[] = [
    {
      name: t('POPULAR'),
      imageIcon: Popular,
    },
    {
      name: t('NEWEST'),
      imageIcon: Newest,
    },
    {
      name: t('TOP_RATING'),
      imageIcon: TopRating,
    },
  ];

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(handleFetchDiveSites());
      dispatch(handleFetchRecommended(authToken as string));
    });
  }, [navigation, dispatch, authToken]);

  const navigateToDiveSite = (diveSpotId: number) => {
    navigation.navigate('ExploreStack', {
      screen: 'DiveSite',
      params: {
        diveSpotId,
      },
    });
  };

  const handleInputFocus = () => {
    toggleAutocompleteModal(true);
  };

  // const navigateToDiveShop = () => {
  //   navigation.navigate('ExploreStack', {
  //     screen: 'DiveShop',
  //   });
  // };

  if (!diveSitesIsLoading && !diveSites.length) {
    return <BeachLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled">
        <Text style={styles.welcomeText}>
          {t('WELCOME')},&nbsp;{user?.first_name}!
        </Text>
        <Form
          onSubmit={() => {}}
          initialValues={{}}
          keepDirtyOnReinitialize
          render={() => {
            return (
              <View>
                <Field
                  name="search"
                  isVisible={autocompleteModalOpen}
                  component={AutocompleteModal}
                  closeModal={() => toggleAutocompleteModal(false)}
                  navigateToDiveSite={navigateToDiveSite}
                />
                <Field
                  name="search"
                  placeholder={t('explore.SEARCH_PLACEHOLDER')}
                  handleInputFocus={handleInputFocus}
                  placeholderTextColor="#BFBFBF"
                  component={SearchInput}
                  style={{ height: 50 }}
                />
              </View>
            );
          }}
        />
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
            <Text style={styles.nearbySitesMainText}>
              {t('explore.NEARBY_SITES_MAIN_TEXT')}
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
                style={styles.nearbySitesMapText}>
                {t('VIEW_MAP')}
              </GradientText>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.nearbySitesCardsContainer}
            showsHorizontalScrollIndicator={false}>
            {diveSites.map(item => (
              <DiveSite
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
        {/* <View style={styles.diveShops}>
          <View style={styles.diveShopsTextContainer}>
            <Text style={styles.diveShopsMainText}>{t('DIVE_SHOPS')}</Text>
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
              <DiveShop key={index} onPressContainer={navigateToDiveShop} />
            ))}
          </ScrollView>
        </View> */}

        <View style={styles.diveSites}>
          <View style={styles.diveSitesTextContainer}>
            <Text style={styles.diveSitesMainText}>{t('RECOMMENDED')}</Text>
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
                {t('VIEW_MAP')}
              </GradientText>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            contentContainerStyle={styles.diveSitesCardsContainer}
            showsHorizontalScrollIndicator={false}>
            {recommended.length
              ? recommended.map(item => (
                  <DiveSite
                    key={item.id}
                    site={item}
                    containerStyle={styles.diveSiteItemContainer}
                    imageContainerStyle={styles.diveSiteItemContainer}
                    imageStyle={styles.diveSiteItemImage}
                    onPressContainer={navigateToDiveSite}
                  />
                ))
              : diveSites
                  .slice(Math.floor(diveSites.length / 2))
                  .map(item => (
                    <DiveSite
                      key={item.id}
                      site={item}
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
    marginBottom: HEIGHT < 780 ? 80 : 65,
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
    width: isBelowWidthThreshold ? WIDTH * 0.75 : WIDTH * 0.8,
    marginRight: 15,
  },
  nearbySiteItemImageContainer: {
    width: isBelowWidthThreshold ? WIDTH * 0.75 : WIDTH * 0.8,
  },
  nearbySiteItemImage: {
    width: isBelowWidthThreshold ? WIDTH * 0.75 : WIDTH * 0.8,
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
    width: '70%',
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
    width: '70%',
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
    // height: '100%',
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

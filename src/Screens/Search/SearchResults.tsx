import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import get from 'lodash/get';
import { Form, Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SearchStackParamList,
} from '_utils/interfaces';
import type { FormApi } from 'final-form';

import type { InitialSearchValues } from '_utils/interfaces/data/search';
import SearchInput from '_components/ui/SearchInput';
import DiveSite from './components/DiveSite';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import {
  selectSearchResults,
  selectSearchResultsLength,
  search,
} from '_redux/slices/search';
import type { Spot } from '_utils/interfaces/data/spot';

import FiltersIcon from '_assets/FadersHorizontal.png';
import SortModal from './components/SortModal';

type SearchResultsNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SearchStackParamList, 'SearchResults'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type SearchResultsRouteProps = RouteProp<SearchStackParamList, 'SearchResults'>;

interface SearchResultsProps {
  navigation: SearchResultsNavigationProps;
  route: SearchResultsRouteProps;
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const diveSites = Object.values(useAppSelector(selectSearchResults));
  const resultsLength = useAppSelector(selectSearchResultsLength);
  const [sortModalIsOpen, toggleSortModal] = React.useState(false);
  let formRef = React.useRef<FormApi>();
  const searchValues: InitialSearchValues = get(route, 'params.search', {});
  const goBack = () => {
    navigation.navigate('App', {
      screen: 'Search',
    });
  };

  const initialValues: InitialSearchValues = {
    difficulty: searchValues.difficulty ?? '',
    preference: searchValues.preference ?? '',
    entry: searchValues.entry ?? '',
    sort: searchValues.sort ?? '',
    search_term: searchValues.search_term ?? '',
  };

  const handleToggleSortModal = () => {
    toggleSortModal(!sortModalIsOpen);
  };

  const submit = async (sort: string) => {
    await dispatch(
      search({
        ...searchValues,
        sort,
      }),
    );
  };

  /**
   * since initial state is passed in from navigation params,
   * resetting the form without modifying navigation params
   * will not change anything.
   * Besides, we only want to change one value instead of resetting
   * the entire form.
   */
  const resetLocationFromNav = () => {
    navigation.setParams({
      search: {
        search_term: '',
      },
    });
    formRef.current?.reset();
  };

  const navigateToFilters = (values: InitialSearchValues) => {
    navigation.push('SearchFilters', {
      search: values,
    });
  };

  const navigateToDiveSite = (diveSpot: Spot) => {
    navigation.navigate('ExploreStack', {
      screen: 'DiveSite',
      params: {
        diveSpotId: diveSpot.id,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SortModal
        modalIsVisible={sortModalIsOpen}
        closeModal={handleToggleSortModal}
        submit={submit}
      />
      <Form
        onSubmit={() => {}}
        initialValues={initialValues}
        render={({ form, values }) => {
          formRef.current = form;
          return (
            <View style={styles.headerContainer}>
              <Icon
                onPress={goBack}
                name="chevron-back-outline"
                color="black"
                size={30}
              />
              <Field
                name="search_term"
                component={SearchInput}
                style={styles.searchInput}
                containerStyle={styles.searchContainer}
                withFilterIcon
                filterIcon="close-outline"
                filterIconSize={30}
                onClickFilterIcon={resetLocationFromNav}
              />
              <TouchableWithoutFeedback
                onPress={() => navigateToFilters(values)}>
                <Image source={FiltersIcon} />
              </TouchableWithoutFeedback>
            </View>
          );
        }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.diveSitesHeaderContainer}>
          <Text style={styles.diveSitesHeaderCount}>
            {resultsLength} {t('SITES')}
          </Text>
          <View style={styles.diveSitesSortContainer}>
            <Text style={styles.diveSitesSortText}>{t('SORT_BY')}</Text>
            <Icon
              onPress={handleToggleSortModal}
              name="chevron-down-outline"
              color="black"
              size={23}
            />
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.diveSitesListContainer}>
            {diveSites.map(item => {
              return (
                <DiveSite
                  key={item.id}
                  site={item}
                  containerStyle={styles.diveSiteItemContainer}
                  imageContainerStyle={styles.diveSiteItemContainer}
                  imageStyle={styles.diveSiteItemImage}
                  onPressContainer={navigateToDiveSite}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 20,
    borderBottomColor: '#A9BEBF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    paddingBottom: 20,
  },
  headerMainText: {
    fontSize: 28,
    fontWeight: '800',
    color: 'black',
  },
  headerRightText: {
    fontSize: 18,
    color: 'black',
  },
  searchContainer: {
    marginTop: 0,
    width: '70%',
    paddingRight: 20,
    paddingVertical: 8,
    borderRadius: 15,
    // marginHorizontal: 10,
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
  diveSiteItemContainer: {
    width: '100%',
  },
  diveSiteItemImageContainer: {
    width: '100%',
  },
  diveSiteItemImage: {
    width: '100%',
    // height: '100%',
  },
  diveSitesCardsContainer: {
    marginTop: 30,
  },
  diveSitesHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: 25,
    marginBottom: 20,
    marginTop: 20,
  },
  diveSitesListContainer: {
    alignItems: 'center',
    marginBottom: 130,
  },
  diveSitesHeaderCount: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  diveSitesSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveSitesSortText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
    color: 'black',
  },
});

export default SearchResults;

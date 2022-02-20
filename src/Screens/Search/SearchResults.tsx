import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import get from 'lodash/get';
import { Form, Field } from 'react-final-form';

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
  handleFetchDiveSites,
  selectAllDiveSites,
} from '_redux/slices/dive-sites';
import type { Spot } from '_utils/interfaces/data/spot';

import FiltersIcon from '_assets/FadersHorizontal.png';

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
  const diveSites = useAppSelector(selectAllDiveSites);
  let formRef = React.useRef<FormApi>();
  const searchValues: InitialSearchValues = get(route, 'params.search', {});
  const goBack = () => {
    navigation.navigate('App', {
      screen: 'Search',
    });
  };

  React.useEffect(() => {
    dispatch(handleFetchDiveSites());
  }, [dispatch]);

  const initialValues: InitialSearchValues = {
    ...searchValues,
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
        location: '',
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
        diveSpot,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
                name="location"
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
        <ScrollView
          contentContainerStyle={styles.diveSitesCardsContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.diveSitesHeaderContainer}>
            <Text style={styles.diveSitesHeaderCount}>58 Sites</Text>
            <View style={styles.diveSitesSortContainer}>
              <Text style={styles.diveSitesSortText}>Sort by</Text>
              <Icon
                // onPress={goBack}
                name="chevron-down-outline"
                color="black"
                size={23}
              />
            </View>
          </View>
          <View style={styles.diveSitesListContainer}>
            {diveSites.slice(5).map(item => (
              <DiveSite
                key={item.id}
                site={item}
                containerStyle={styles.diveSiteItemContainer}
                imageContainerStyle={styles.diveSiteItemContainer}
                imageStyle={styles.diveSiteItemImage}
                onPressContainer={navigateToDiveSite}
              />
            ))}
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
  },
  headerRightText: {
    fontSize: 18,
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
  },
  diveSitesListContainer: {
    alignItems: 'center',
  },
  diveSitesHeaderCount: {
    fontWeight: '600',
    fontSize: 20,
  },
  diveSitesSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveSitesSortText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
  },
});

export default SearchResults;

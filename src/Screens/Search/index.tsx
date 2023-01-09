import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Form, Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';
import type { LocationSearchInitialValues } from '_utils/interfaces/data/search';

import SearchInput from '_components/ui/SearchInput';
import AutocompleteModal from '_components/ui/AutocompleteModal';
import SearchMainView from './components/SearchMainView';
import { isBelowHeightThreshold } from '_utils/constants';

type SearchNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AppTabsParamList, 'Search'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface SearchProps {
  navigation: SearchNavigationProps;
}

const Search: FunctionComponent<SearchProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [autocompleteModalOpen, toggleAutocompleteModal] =
    React.useState(false);

  const handleInputFocus = () => {
    toggleAutocompleteModal(true);
  };

  const [initialSearchTerm, setInitialSearchTerm] = React.useState('');

  const navigateToFilters = (values: LocationSearchInitialValues) => {
    navigation.navigate('SearchStack', {
      screen: 'SearchFilters',
      params: {
        search: values,
      },
    });
  };

  const openAutocompleteForDestination = (value: string) => {
    setInitialSearchTerm(value);
    toggleAutocompleteModal(true);
  };

  const navigateToSearchResults = (values: LocationSearchInitialValues) => {
    navigation.navigate('SearchStack', {
      screen: 'SearchResults',
      params: {
        search: values,
      },
    });
  };

  const navigateToDiveSite = (id: number) => {
    navigation.navigate('ExploreStack', {
      screen: 'DiveSite',
      params: {
        diveSpotId: id,
      },
    });
  };

  const initialValues: LocationSearchInitialValues = {
    search_term: '',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{t('SEARCH')}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        style={styles.contentContainer}>
        <Form
          onSubmit={() => {}}
          initialValues={initialValues}
          keepDirtyOnReinitialize
          render={({ values }) => {
            return (
              <View>
                {autocompleteModalOpen && (
                  <Field
                    name="search_term"
                    isVisible={autocompleteModalOpen}
                    component={AutocompleteModal}
                    closeModal={() => toggleAutocompleteModal(false)}
                    navigateToDiveSite={navigateToDiveSite}
                    navigateToSearchResults={navigateToSearchResults}
                    initialSearchTerm={initialSearchTerm}
                  />
                )}
                <Field
                  name="search_term"
                  component={SearchInput}
                  containerStyle={styles.searchInputContainer}
                  handleInputFocus={handleInputFocus}
                  placeholder={t('explore.SEARCH_PLACEHOLDER')}
                />
              </View>
            );
          }}
        />

        <SearchMainView
          navigateToDiveSite={navigateToDiveSite}
          openAutocompleteForDestination={openAutocompleteForDestination}
        />
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
    marginBottom: isBelowHeightThreshold ? 80 : 65,
    paddingBottom: 50,
  },
  headerText: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    marginHorizontal: 25,
    marginTop: isBelowHeightThreshold ? 15 : 30,
  },
  headerContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: isBelowHeightThreshold ? 10 : 20,
  },
  searchInputContainer: {
    paddingVertical: 5,
  },
});

export default Search;

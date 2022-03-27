import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Form, Field } from 'react-final-form';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';
import type { LocationSearchInitialValues } from '_utils/interfaces/data/search';

import SearchInput from '_components/ui/SearchInput';
import AutocompleteModal from './components/AutocompleteModal';
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
  const [autocompleteModalOpen, toggleAutocompleteModal] =
    React.useState(false);

  const handleInputFocus = () => {
    toggleAutocompleteModal(true);
  };

  const navigateToFilters = (values: LocationSearchInitialValues) => {
    navigation.navigate('SearchStack', {
      screen: 'SearchFilters',
      params: {
        search: values,
      },
    });
  };

  const initialValues: LocationSearchInitialValues = {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Search</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <Form
          onSubmit={() => {}}
          initialValues={initialValues}
          keepDirtyOnReinitialize
          render={({ values }) => {
            return (
              <View>
                <Field
                  name="location"
                  isVisible={autocompleteModalOpen}
                  component={AutocompleteModal}
                  closeModal={() => toggleAutocompleteModal(false)}
                />
                <Field
                  name="location"
                  component={SearchInput}
                  containerStyle={styles.searchInputContainer}
                  withFilterIcon
                  handleInputFocus={handleInputFocus}
                  onClickFilterIcon={() => navigateToFilters(values)}
                />
              </View>
            );
          }}
        />

        <SearchMainView />
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

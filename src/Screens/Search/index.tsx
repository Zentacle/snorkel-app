import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { Form, Field } from 'react-final-form';

import SearchInput from '_components/ui/SearchInput';
import AutocompleteModal from './components/AutocompleteModal';
import SearchFiltersModal from './components/SearchFiltersModal';
import SearchMainView from './components/SearchMainView';

interface InitialValues {
  difficulty: string;
  preference: string;
  entry: string;
  maxDepth: number;
}

const Search = () => {
  const [autocompleteModalOpen, toggleAutocompleteModal] =
    React.useState(false);
  const [filtersModalopen, toggleFiltersModal] = React.useState(false);

  const handleInputFocus = () => {
    toggleAutocompleteModal(true);
  };

  const handleToggleFiltersModal = () => {
    toggleFiltersModal(!filtersModalopen);
  };

  const initialValues: InitialValues = {
    difficulty: 'Beginner',
    preference: 'Scuba',
    entry: 'Shore',
    maxDepth: 18,
  };

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
          render={({ values, form }) => {
            return (
              <View>
                <Field
                  name="search"
                  isVisible={autocompleteModalOpen}
                  component={AutocompleteModal}
                  closeModal={() => toggleAutocompleteModal(false)}
                />
                <Field
                  name="search"
                  component={SearchInput}
                  containerStyle={styles.searchInputContainer}
                  withFilterIcon
                  handleInputFocus={handleInputFocus}
                  onClickFilterIcon={handleToggleFiltersModal}
                />
                <SearchFiltersModal
                  isVisible={filtersModalopen}
                  closeModal={handleToggleFiltersModal}
                  reset={form.reset}
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
    marginBottom: Platform.OS === 'android' ? 100 : 65,
    paddingBottom: 50,
  },
  headerText: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    marginHorizontal: 25,
    marginTop: 30,
  },
  headerContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20,
  },
  searchInputContainer: {
    paddingVertical: 5,
  },
});

export default Search;

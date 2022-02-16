import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Dimensions,
  Platform,
} from 'react-native';
import { Form, Field } from 'react-final-form';

import SearchInput from '_components/ui/SearchInput';
import AutocompleteModal from './components/AutocompleteModal';
import SearchFiltersModal from './components/SearchFiltersModal';

// const WIDTH = Dimensions.get('window').width;

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
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Search</Text>
        </View>
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
});

export default Search;

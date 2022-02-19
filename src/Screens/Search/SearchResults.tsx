import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import get from 'lodash/get';

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

import type { InitialSearchValues } from '_utils/interfaces/data/search';

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
  const searchValues: InitialSearchValues = get(route, 'params.search', {});
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon
          // onPress={navigatebackToSearch}
          name="chevron-back-outline"
          color="black"
          size={30}
        />
        <Text style={styles.headerMainText}>Filter</Text>
        <TouchableWithoutFeedback>
          <Text style={styles.headerRightText}>Reset</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerMainText: {
    fontSize: 28,
    fontWeight: '800',
  },
  headerRightText: {
    fontSize: 18,
  },
});

export default SearchResults;

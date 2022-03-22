import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SearchStackParamList } from '_utils/interfaces';

import SearchResults from '_screens/Search/SearchResults';
import SearchFilters from '_screens/Search/SearchFilters';

const SearchNavigator: React.FC = () => {
  const SearchStack = createNativeStackNavigator<SearchStackParamList>();

  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen name="SearchResults" component={SearchResults} />
      <SearchStack.Screen name="SearchFilters" component={SearchFilters} />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;

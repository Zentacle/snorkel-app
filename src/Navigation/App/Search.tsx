import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SearchStackParamList } from '_utils/interfaces';
import Search from '_screens/Search';
import SearchResults from '_screens/Search/SearchResults';

const SearchNavigator: React.FC = () => {
  const SearchStack = createNativeStackNavigator<SearchStackParamList>();

  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SearchMain">
      <SearchStack.Screen options={{}} name="SearchMain" component={Search} />
      <SearchStack.Screen name="SearchResults" component={SearchResults} />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;

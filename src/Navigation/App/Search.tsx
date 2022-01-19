import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SearchStackParamList } from '_utils/interfaces';

import Search from '_screens/Search';

const SearchNavigator: React.FC = () => {
  const SearchStack = createNativeStackNavigator<SearchStackParamList>();

  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen options={{}} name="Search" component={Search} />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;

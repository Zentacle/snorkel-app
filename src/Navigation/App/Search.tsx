import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SearchStackParamList } from '_utils/interfaces';

const SearchNavigator: React.FC = () => {
  const SearchStack = createNativeStackNavigator<SearchStackParamList>();

  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <SearchStack.Screen options={{}} name="Search" component={Search} /> */}
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;

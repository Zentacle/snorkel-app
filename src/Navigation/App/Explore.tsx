import * as React from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import type { ExploreStackParamList } from '_utils/interfaces';

import DiveSite from '_screens/Explore/DiveSite';
import DiveShop from '_screens/Explore/DiveShop';
import Map from '_screens/Explore/Map';
import Reviews from '_screens/Explore/Reviews';
import Search from '_screens/Explore/Search';

import { StackNavigationOptions } from '@react-navigation/stack';

const options: StackNavigationOptions = {
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const ExploreNavigator: React.FC = () => {
  // const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
  const ExploreStack =
    createSharedElementStackNavigator<ExploreStackParamList>();

  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ExploreStack.Screen
        name="DiveSite"
        component={DiveSite}
        options={() => options}
      />
      <ExploreStack.Screen name="DiveShop" component={DiveShop} />
      <ExploreStack.Screen name="Map" component={Map} />
      <ExploreStack.Screen name="Reviews" component={Reviews} />
      <ExploreStack.Screen name="Search" component={Search} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;

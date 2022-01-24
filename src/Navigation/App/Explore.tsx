import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ExploreStackParamList } from '_utils/interfaces';

import DiveSite from '_screens/Explore/DiveSite';
import DiveShop from '_screens/Explore/DiveShop';

const ExploreNavigator: React.FC = () => {
  const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ExploreStack.Screen name="DiveSite" component={DiveSite} />
      <ExploreStack.Screen name="DiveShop" component={DiveShop} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;

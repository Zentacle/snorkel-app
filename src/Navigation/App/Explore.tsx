import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ExploreStackParamList } from '_utils/interfaces';

import Explore from '_screens/Explore';

const ExploreNavigator: React.FC = () => {
  const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

  return (
    <ExploreStack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}>
      <ExploreStack.Screen name="Explore" component={Explore} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '_utils/interfaces';

import AuthNavigator from './Auth';
import OnboardingNavigator from './Onboarding';

const Navigator: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="OnBoarding" component={OnboardingNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

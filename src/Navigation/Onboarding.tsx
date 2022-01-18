import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { OnboardingStackParamList } from '_utils/interfaces';

import ChooseUserName from '_screens/Onboarding/ChooseUserName';

const OnboardingNavigator: React.FC = () => {
  const OnboardingStack =
    createNativeStackNavigator<OnboardingStackParamList>();
  return (
    <OnboardingStack.Navigator
      initialRouteName="ChooseUserName"
      screenOptions={{
        headerShown: false,
      }}>
      <OnboardingStack.Screen
        name="ChooseUserName"
        component={ChooseUserName}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigator;

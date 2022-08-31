import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { OnboardingStackParamList } from '_utils/interfaces';

import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

import ChooseAvatar from '_screens/Onboarding/ChooseAvatar';
import LocationPermissions from '_screens/Onboarding/LocationPermissions';
import AddRecentDiveLog from '_screens/Onboarding/AddRecentDiveLog';
import ProUpsellFirst from '_screens/Onboarding/ProUpsellFirst';
import ProUpsellLast from '_screens/Onboarding/ProUpsellLast';

const OnboardingNavigator: React.FC = () => {
  const user = useAppSelector(selectUser);

  const OnboardingStack =
    createNativeStackNavigator<OnboardingStackParamList>();
  return (
    <OnboardingStack.Navigator
      initialRouteName={user?.has_pro ? 'ChooseAvatar' : 'ProUpsellFirst'}
      screenOptions={{
        headerShown: false,
      }}>
      <OnboardingStack.Screen
        name="ProUpsellFirst"
        component={ProUpsellFirst}
      />
      <OnboardingStack.Screen name="ChooseAvatar" component={ChooseAvatar} />
      <OnboardingStack.Screen
        name="LocationPermissions"
        component={LocationPermissions}
      />
      <OnboardingStack.Screen
        name="AddRecentDiveLog"
        component={AddRecentDiveLog}
      />
      <OnboardingStack.Screen name="ProUpsellLast" component={ProUpsellLast} />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigator;

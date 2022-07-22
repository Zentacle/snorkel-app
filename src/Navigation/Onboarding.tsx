import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { OnboardingStackParamList } from '_utils/interfaces';

import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

import ChooseUserName from '_screens/Onboarding/ChooseUserName';
import ChooseAvatar from '_screens/Onboarding/ChooseAvatar';
import CameraPermissions from '_screens/Onboarding/CameraPermissions';
import LocationPermissions from '_screens/Onboarding/LocationPermissions';
import MeasurementType from '_screens/Onboarding/MeasurementType';
import ActivityType from '_screens/Onboarding/ActivityType';
import AddRecentDiveLog from '_screens/Onboarding/AddRecentDiveLog';

const OnboardingNavigator: React.FC = () => {
  const user = useAppSelector(selectUser);
  const userHasUsername = user && user.username;
  const userHasProfilePic = user && user.profile_pic;

  const OnboardingStack =
    createNativeStackNavigator<OnboardingStackParamList>();
  return (
    <OnboardingStack.Navigator
      initialRouteName={
        userHasUsername ? 'CameraPermissions' : 'ChooseUserName'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <OnboardingStack.Screen
        name="ChooseUserName"
        component={ChooseUserName}
      />
      <OnboardingStack.Screen name="ChooseAvatar" component={ChooseAvatar} />
      <OnboardingStack.Screen
        name="CameraPermissions"
        component={CameraPermissions}
      />
      <OnboardingStack.Screen
        name="LocationPermissions"
        component={LocationPermissions}
      />
      <OnboardingStack.Screen
        name="MeasurementType"
        component={MeasurementType}
      />
      <OnboardingStack.Screen name="ActivityType" component={ActivityType} />
      <OnboardingStack.Screen
        name="AddRecentDiveLog"
        component={AddRecentDiveLog}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigator;

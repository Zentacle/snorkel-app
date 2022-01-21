import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ProfileStackParamList } from '_utils/interfaces';

import Profile from '_screens/Profile';

const ProfileNavigator: React.FC = () => {
  const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;

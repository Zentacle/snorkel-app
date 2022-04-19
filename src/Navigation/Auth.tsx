import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthtackParamList } from '_utils/interfaces';

import Landing from '_screens/Auth/Landing';
import SignIn from '_screens/Auth/SignIn';
import EmailSignUp from '_screens/Auth/EmailSignUp';
import { useAppSelector } from '_redux/hooks';

import { selectExistingUser } from '_redux/slices/user';

const AuthNavigator: React.FC = () => {
  const existingUser = useAppSelector(selectExistingUser);

  const AuthStack = createNativeStackNavigator<AuthtackParamList>();
  return (
    <AuthStack.Navigator
      initialRouteName={existingUser ? 'SignIn' : 'Landing'}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Landing" component={Landing} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="EmailSignUp" component={EmailSignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

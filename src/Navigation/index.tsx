import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '_utils/interfaces';

import AuthNavigator from './Auth';
import OnboardingNavigator from './Onboarding';
import AppTabsNavigator from './App';
import ExploreNavigator from './App/Explore';
import SearchNavigator from './App/Search';
import LogsNavigator from './App/Logs';
import ProfileNavigator from './App/Profile';
import LogsFormNavigator from './App/DiveLogsForm';

import { useAppDispatch } from '_redux/hooks';
import { handleFetchDiveSites } from '_redux/slices/dive-sites';

const Navigator: React.FC = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    // handle fetching of dive sites and logs here
    // to improve user experience
    dispatch(handleFetchDiveSites());
  }, [dispatch]);

  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="OnBoarding" component={OnboardingNavigator} />
        <Stack.Screen name="App" component={AppTabsNavigator} />
        <Stack.Screen name="ExploreStack" component={ExploreNavigator} />
        <Stack.Screen name="ProfileStack" component={ProfileNavigator} />
        <Stack.Screen name="SearchStack" component={SearchNavigator} />
        <Stack.Screen name="LogsStack" component={LogsNavigator} />
        <Stack.Screen name="LogsFormStack" component={LogsFormNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

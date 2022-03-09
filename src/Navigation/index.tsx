import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
// import { ImageBackground, StyleSheet } from 'react-native';

import type { RootStackParamList } from '_utils/interfaces';

import AuthNavigator from './Auth';
import OnboardingNavigator from './Onboarding';
import AppTabsNavigator from './App';
import ExploreNavigator from './App/Explore';
import SearchNavigator from './App/Search';
import LogsNavigator from './App/Logs';
import ProfileNavigator from './App/Profile';
import LogsFormNavigator from './App/DiveLogsForm';

import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { handleFetchDiveSites } from '_redux/slices/dive-sites';
import {
  autoAuth,
  selectLoggedInState,
  selectUser,
  logoutUser,
  selectAutoAuthLoadingState,
} from '_redux/slices/user';
// import { User } from '_utils/interfaces/data/user';
// import CoverImage from '_assets/main-screen.png';

const Navigator: React.FC = () => {
  // const [loaded, setLoaded] = React.useState(false);
  // const [userObj, setUserObj] = React.useState<User>();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    // handle fetching of dive sites and logs here
    // to improve user experience
    dispatch(handleFetchDiveSites());
    dispatch(autoAuth()).then(() => {
      SplashScreen.hide();
    });
    dispatch(logoutUser());
  }, [dispatch]);

  const loadingState = useAppSelector(selectAutoAuthLoadingState);
  const loggedInState = useAppSelector(selectLoggedInState);
  const user = useAppSelector(selectUser);
  const userHasUsername = user && user.username;
  const userHasProfilePic = user && user.profile_pic;

  // assume user has filled onBoarding if username and profile_pic exist
  const userPreviouslyFilledOnBoardingData = !!(
    userHasUsername && userHasProfilePic
  );

  // if (!loadingState)
  //   return (
  //     <ImageBackground style={styles.backgroundImage} source={CoverImage} />
  //   );

  if (loadingState) {
    return null;
  }

  // if (loaded) {
  //   // SplashScreen.hide();
  // }

  const Stack = createNativeStackNavigator<RootStackParamList>();

  if (!loggedInState) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={
          //   loggedInState
          //     ? userPreviouslyFilledOnBoardingData
          //       ? 'App'
          //       : 'OnBoarding'
          //     : 'Auth'
          // }
          initialRouteName="Auth"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Auth" component={AuthNavigator} />
          {/* <Stack.Screen name="OnBoarding" component={OnboardingNavigator} />
          <Stack.Screen name="App" component={AppTabsNavigator} />
          <Stack.Screen name="ExploreStack" component={ExploreNavigator} />
          <Stack.Screen name="ProfileStack" component={ProfileNavigator} />
          <Stack.Screen name="SearchStack" component={SearchNavigator} />
          <Stack.Screen name="LogsStack" component={LogsNavigator} />
          <Stack.Screen name="LogsFormStack" component={LogsFormNavigator} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={
        //   loggedInState
        //     ? userPreviouslyFilledOnBoardingData
        //       ? 'App'
        //       : 'OnBoarding'
        //     : 'Auth'
        // }
        initialRouteName={
          userPreviouslyFilledOnBoardingData ? 'App' : 'OnBoarding'
        }
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Auth" component={AuthNavigator} /> */}
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

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     opacity: 1,
//     zIndex: 0,
//   },
// });

export default Navigator;

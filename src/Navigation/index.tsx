import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { AppState } from 'react-native';
import {
  requestTrackingPermission,
  getTrackingStatus,
} from 'react-native-tracking-transparency';
import { Amplitude } from '@amplitude/react-native';
import config from 'react-native-config';

import type { RootStackParamList } from '_utils/interfaces';

import AuthNavigator from './Auth';
import OnboardingNavigator from './Onboarding';
import AppTabsNavigator from './App';
import ExploreNavigator from './App/Explore';
import SearchNavigator from './App/Search';
import LogsNavigator from './App/Logs';
import LogsFormNavigator from './App/DiveLogsForm';
import SettingsNavigator from './Settings';
import NotFound from '_screens/NotFound';
import HelpWebview from '_screens/HelpWebsite';

import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { handleFetchDiveSites } from '_redux/slices/dive-sites';
import {
  autoAuth,
  selectLoggedInState,
  // selectUser,
  selectAutoAuthLoadingState,
  getCurrentUser,
  handleCheckExistingUser,
} from '_redux/slices/user';
import { autoHydrateSettings } from '_redux/slices/settings';
import { linking } from '_utils/functions/linking';

const Navigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = React.useRef(AppState.currentState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );

  React.useEffect(() => {
    const ampInstance = Amplitude.getInstance();
    ampInstance.init(config.AMPLITUDE_KEY);
    ampInstance.logEvent('view_app');
  }, []);

  React.useEffect(() => {
    // handle fetching of dive sites and logs here
    // to improve user experience
    dispatch(handleCheckExistingUser());
    dispatch(handleFetchDiveSites({}));
    dispatch(autoAuth()).then(() => {
      SplashScreen.hide();
    });
    dispatch(autoHydrateSettings());
    dispatch(getCurrentUser());
  }, [dispatch]);

  const loadingState = useAppSelector(selectAutoAuthLoadingState);
  const loggedInState = useAppSelector(selectLoggedInState);
  // const user = useAppSelector(selectUser);
  // const userHasUsername = user && user.username;
  // const userHasProfilePic = user && user.profile_pic;

  // assume user has filled onBoarding if username and profile_pic exist
  // const userPreviouslyFilledOnBoardingData = !!(
  //   userHasUsername && userHasProfilePic
  // );

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(getCurrentUser());
      }

      // just need to be active, no need to track state change
      if (nextAppState === 'active') {
        (async () => {
          const trackingStatus = await getTrackingStatus();
          if (trackingStatus === 'not-determined') {
            requestTrackingPermission();
          }
        })();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  });

  if (loadingState) {
    return null;
  }

  const Stack = createNativeStackNavigator<RootStackParamList>();

  // if (!loggedInState) {
  //   return (
  //     <NavigationContainer linking={linking}>
  //       <Stack.Navigator
  //         initialRouteName="Auth"
  //         screenOptions={{
  //           headerShown: false,
  //         }}>
  //         <Stack.Screen name="NotFound" component={NotFound} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={loggedInState ? 'App' : 'Auth'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="OnBoarding" component={OnboardingNavigator} />
        <Stack.Screen name="App" component={AppTabsNavigator} />
        <Stack.Screen name="ExploreStack" component={ExploreNavigator} />
        <Stack.Screen name="SearchStack" component={SearchNavigator} />
        <Stack.Screen name="LogsStack" component={LogsNavigator} />
        <Stack.Screen name="LogsFormStack" component={LogsFormNavigator} />
        <Stack.Screen name="SettingsStack" component={SettingsNavigator} />
        <Stack.Screen name="NotFound" component={NotFound} />
        <Stack.Screen name="HelpWebview" component={HelpWebview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

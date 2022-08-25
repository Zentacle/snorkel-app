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
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

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
import AppWebview from '_screens/AppWebview';

import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { handleFetchDiveSites } from '_redux/slices/dive-sites';
import {
  autoAuth,
  selectLoggedInState,
  // selectUser,
  selectAutoAuthLoadingState,
  getCurrentUser,
  handleCheckExistingUser,
  selectAuthToken,
} from '_redux/slices/user';
import { autoHydrateSettings } from '_redux/slices/settings';
import { linking } from '_utils/functions/linking';
import offlineManager from '_utils/functions/offline-manager';
import {
  handleCreateDiveLog,
  handleUploadDiveLogImages,
  handleUpdateDiveLog,
} from '_redux/slices/dive-logs/api';
import {
  AdvancedFormInitialValues,
  SimpleFormInitialValues,
} from '_utils/interfaces/data/logs';

const Navigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = React.useRef(AppState.currentState);
  const authToken = useAppSelector(selectAuthToken);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );

  const [networkIsConnected, setNetworkIsConnected] = React.useState(true);

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

  const syncCreateDiveLog = async () => {
    offlineManager.syncItems<SimpleFormInitialValues>('create-dive-log', item =>
      createDiveLog(item),
    );
  };

  const createDiveLog = async (values: SimpleFormInitialValues) => {
    try {
      if (values.images) {
        const images = await handleUploadDiveLogImages(
          values.images,
          authToken as string,
        );
        const response = await handleCreateDiveLog(
          {
            ...values,
            images,
          },
          authToken as string,
        );
        if (response.msg) {
          throw new Error(response.msg);
        }
      } else {
        const response = await handleCreateDiveLog(values, authToken as string);
        if (response.msg) {
          throw new Error(response.msg);
        }
      }

      Toast.show({
        type: 'info',
        text1: 'Offline logs synced',
      });
    } catch (err) {
      throw err;
    }
  };

  const updateDiveLog = async (values: AdvancedFormInitialValues) => {
    try {
      const response = await handleUpdateDiveLog(values, authToken as string);
      if (response.msg) {
        throw new Error(response.msg);
      }
      Toast.show({
        type: 'info',
        text1: 'Offline logs synced',
      });
    } catch (err) {
      throw err;
    }
  };

  const syncUpdateDiveLog = async () => {
    offlineManager.syncItems<SimpleFormInitialValues>('update-dive-log', item =>
      updateDiveLog(item),
    );
  };

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // mimic a change event from connected to disconnected
      if (!state.isConnected && networkIsConnected) {
        setNetworkIsConnected(false);
      }
      // mimic a change event from disconnected to connected and trigger remote sync
      if (state.isConnected && !networkIsConnected) {
        syncCreateDiveLog();
        syncUpdateDiveLog();
      }
    });

    return () => {
      unsubscribe();
    };
  });

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
        <Stack.Screen name="AppWebview" component={AppWebview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

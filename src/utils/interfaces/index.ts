import { NavigatorScreenParams } from '@react-navigation/native';

import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import type { AdvancedFormInitialValues as DiveLog } from './data/logs';
import type { InitialSearchValues as FullInitialValues } from './data/search';

export type AuthtackParamList = {
  Landing: undefined;
  SignIn: undefined;
  EmailSignUp: undefined;
};

export type OnboardingStackParamList = {
  ChooseUserName: undefined;
  ChooseAvatar: undefined;
  CameraPermissions: undefined;
  LocationPermissions: undefined;
  MeasurementType: undefined;
  ActivityType: undefined;
};

export type ExploreStackParamList = {
  DiveSite: {
    diveSpotId: number;
  };
  // DiveShop: {
  //   diveShopId: number;
  // };
  DiveShop: undefined;
  Map: {
    coords: {
      lat: number;
      lng: number;
    };
  };
  Reviews: {
    id: number;
  };
};

export type ProfileStackParamList = {
  // Profile: undefined;
};

export type SettingStackParamList = {
  Settings: undefined;
  ProfileSettings: undefined;
  ChangePassword: undefined;
  TypeUnits: undefined;
  DiveActivities: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  HelpCenter: undefined;
  Language: undefined;
};

export type SearchStackParamList = {
  SearchResults: {
    search: FullInitialValues;
  };
  SearchFilters: {
    search: FullInitialValues;
  };
};

export type LogsStackParamList = {
  LogDetail: {
    diveLogId: number;
  };
};

export type LogsFormStackParamList = {
  AdvancedDiveLogsForm: {
    simpleDiveLog: DiveLog;
  };
};

export type AppTabsParamList = {
  Explore: undefined;
  Profile: undefined;
  Search: undefined;
  Logs: undefined;
  LogsForm: {
    diveLogs: DiveLog | {};
  };
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthtackParamList>;
  OnBoarding: NavigatorScreenParams<OnboardingStackParamList>;
  App: NavigatorScreenParams<AppTabsParamList>;
  ExploreStack: NavigatorScreenParams<ExploreStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  SearchStack: NavigatorScreenParams<SearchStackParamList>;
  LogsStack: NavigatorScreenParams<LogsStackParamList>;
  LogsFormStack: NavigatorScreenParams<LogsFormStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingStackParamList>;
  NotFound: undefined;
};

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;

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
  ProUpsellFirst: undefined;
  ChooseUserName: undefined;
  ChooseAvatar: undefined;
  LocationPermissions: undefined;
  AddRecentDiveLog: undefined;
  ProUpsellLast: undefined;
};

export type ExploreStackParamList = {
  DiveSite: {
    diveSpotId: number | string;
    wildcard?: string;
    reset?: boolean;
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
  DiveShopForm: undefined;
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
    diveLog: DiveLog;
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
  AppWebview: {
    source: string;
  };
};

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;

import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';

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
  Explore: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
};

export type LogsStackParamList = {
  Logs: undefined;
};

export type LogsFormStackParamList = {
  SimpleLogsForm: undefined;
};

export type AppTabsParamList = {
  ExploreStack: NavigatorScreenParams<ExploreStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  SearchStack: NavigatorScreenParams<SearchStackParamList>;
  LogsStack: NavigatorScreenParams<LogsStackParamList>;
  LogsFormStack: NavigatorScreenParams<LogsFormStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthtackParamList>;
  OnBoarding: NavigatorScreenParams<OnboardingStackParamList>;
  App: NavigatorScreenParams<AppTabsParamList>;
};

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;

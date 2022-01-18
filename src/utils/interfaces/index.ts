import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type AuthtackParamList = {
  Landing: undefined;
  SignIn: undefined;
  EmailSignUp: undefined;
};

export type OnboardingStackParamList = {
  ChooseUserName: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  OnBoarding: undefined;
};

export interface Page {
  name: string;
  componentName: keyof RootStackParamList;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;

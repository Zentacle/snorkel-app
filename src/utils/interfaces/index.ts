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
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthtackParamList>;
  OnBoarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export interface Page {
  name: string;
  componentName: keyof RootStackParamList;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;

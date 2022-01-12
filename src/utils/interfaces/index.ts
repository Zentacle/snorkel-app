import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
};

export interface Page {
  name: string;
  componentName: keyof RootStackParamList;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;

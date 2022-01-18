import type { ImageSourcePropType } from 'react-native';

export interface ActionButtons {
  name: string;
  icon: string;
  action: () => void;
  imageSource: ImageSourcePropType;
}

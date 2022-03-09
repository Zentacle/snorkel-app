import type { ImageSourcePropType } from 'react-native';

export interface ActionButtons {
  name: string;
  icon: string;
  action: () => Promise<AuthReturn | undefined | void>;
  imageSource: ImageSourcePropType;
}

interface AuthReturn {
  credential?: string | null;
}

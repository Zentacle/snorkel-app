import type { ImageSourcePropType } from 'react-native';
import type { AppleCredentialState } from '@invertase/react-native-apple-authentication';

export interface ActionButtons {
  name: string;
  icon: string;
  action: () => Promise<
    GoogleAuthReturn | AppleAuthReturn | undefined | void | null
  >;
  imageSource: ImageSourcePropType;
}

export interface GoogleAuthReturn {
  credential?: string | null;
}

export interface AppleAuthReturn {
  code: string | null;
  id_token: string | null;
  state: AppleCredentialState;
  user: {
    email: string | null;
    name: {
      firstName: string | undefined | null;
      lastName: string | undefined | null;
    };
  };
}

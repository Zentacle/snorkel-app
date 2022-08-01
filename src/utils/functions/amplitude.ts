import { Amplitude } from '@amplitude/react-native';
import config from 'react-native-config';

export const sendEvent = (event: string, obj?: any) => {
  const ampInstance = Amplitude.getInstance();
  ampInstance.init(config.AMPLITUDE_KEY);
  ampInstance.logEvent(event, obj);
}

export const setAmplitudeUserId = (userId: number) => {
  const ampInstance = Amplitude.getInstance();
  ampInstance.init(config.AMPLITUDE_KEY);
  ampInstance.setUserId(`${userId}`);
}

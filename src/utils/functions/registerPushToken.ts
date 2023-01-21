import {
  Notifications,
  Registered,
  RegistrationError,
} from 'react-native-notifications';
import {
  handleRegisterPushToken
} from '_redux/slices/user/api';

const registerPushToken = (authToken: string) => {
  Notifications.registerRemoteNotifications();
  Notifications.events().registerRemoteNotificationsRegistered(
    async (event: Registered) => {
      await handleRegisterPushToken(event.deviceToken, authToken!);
    },
  );
  Notifications.events().registerRemoteNotificationsRegistrationFailed(
    (event: RegistrationError) => {
      console.log(event);
    },
  );
  Notifications.events().registerRemoteNotificationsRegistrationDenied(() => {
    console.log('testing');
  });
}

export default registerPushToken;

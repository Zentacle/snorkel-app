import { Platform } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import {
//   LoginManager,
//   AccessToken,
//   AuthenticationToken,
// } from 'react-native-fbsdk-next';

import AppleLogo from '_assets/logos/apple-logo/AppleLogo.png';
// import FacebookLogo from '_assets/logos/facebook-logo/FacebookLogo.png';
import GoogleLogo from '_assets/logos/google-logo/GoogleLogo.png';
import type { ActionButtons } from './interfaces';

async function appleSignIn() {
  try {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    console.log('apple auth response', appleAuthRequestResponse);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      return {
        code: appleAuthRequestResponse.authorizationCode,
        id_token: appleAuthRequestResponse.identityToken,
        state: credentialState,
        user: {
          email: appleAuthRequestResponse.email,
          name: {
            firstName: appleAuthRequestResponse.fullName?.givenName,
            lastName: appleAuthRequestResponse.fullName?.familyName,
          },
        },
      };
    }

    return null;
  } catch (err) {
    console.log('error', err);
  }
}

async function googleSignIn() {
  try {
    const isExisting = await GoogleSignin.hasPlayServices();
    if (isExisting) {
      const userInfo = await GoogleSignin.signIn();
      return {
        credential: userInfo.idToken,
      };
    }
  } catch (err: any) {
    console.log(err);
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (err.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
}

// function facebookAuth() {
//   // Attempt a login using the Facebook login dialog asking for default permissions.
//   return LoginManager.logInWithPermissions(['public_profile']).then(
//     async function (result) {
//       if (result.isCancelled) {
//         return;
//       } else {
//       }

//       let fbAuthToken;
//       if (Platform.OS === 'ios') {
//         const response = await AuthenticationToken.getAuthenticationTokenIOS();
//         fbAuthToken = response?.authenticationToken;
//       } else {
//         const response = await AccessToken.getCurrentAccessToken();
//         fbAuthToken = response?.accessToken;
//       }
//       return {
//         credential: fbAuthToken,
//       };
//     },
//     function (error) {
//       console.log('Login fail with error: ' + error);
//     },
//   );
// }

const androidActionButtons: ActionButtons[] = [
  {
    name: 'Google',
    icon: '',
    action: () => googleSignIn(),
    imageSource: GoogleLogo,
  },
  // {
  //   name: 'Facebook',
  //   icon: '',
  //   action: () => facebookAuth(),
  //   imageSource: FacebookLogo,
  // },
];

const iOSActionButtons: ActionButtons[] = [
  {
    name: 'Apple',
    icon: '',
    action: () => appleSignIn(),
    imageSource: AppleLogo,
  },
  {
    name: 'Google',
    icon: '',
    action: () => googleSignIn(),
    imageSource: GoogleLogo,
  },
  // {
  //   name: 'Facebook',
  //   icon: '',
  //   action: () => facebookAuth(),
  //   imageSource: FacebookLogo,
  // },
];

export const actionButtons =
  Platform.OS === 'ios' ? iOSActionButtons : androidActionButtons;

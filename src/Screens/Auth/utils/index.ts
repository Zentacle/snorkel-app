import { Platform } from 'react-native';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';

import AppleLogo from '_assets/logos/apple-logo/AppleLogo.png';
import FacebookLogo from '_assets/logos/facebook-logo/FacebookLogo.png';
import GoogleLogo from '_assets/logos/google-logo/GoogleLogo.png';
import type { ActionButtons } from './interfaces';

async function onAppleButtonPressIOS() {
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

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  } catch (err) {
    console.log('error', err);
  }
}

async function onAppleButtonPressAndroid() {
  try {
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'com.example.client-android',

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: 'https://example.com/auth/callback',

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();

    // Send the authorization code to your backend for verification
  } catch (err) {
    console.log('error', err);
  }
}

async function googleSignIn() {
  try {
    const isExisting = await GoogleSignin.hasPlayServices();
    console.log('running and in func', isExisting);

    const userInfo = await GoogleSignin.signIn();
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

function facebookAuth() {
  // Attempt a login using the Facebook login dialog asking for default permissions.
  LoginManager.logInWithPermissions(['public_profile']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(
          'Login success with permissions: ' +
            (result.grantedPermissions as string[]).toString(),
        );
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
}

export const actionButtons: ActionButtons[] = [
  {
    name: 'Apple',
    icon: '',
    action: () =>
      Platform.OS === 'android'
        ? onAppleButtonPressAndroid()
        : onAppleButtonPressIOS(),
    imageSource: AppleLogo,
  },
  {
    name: 'Google',
    icon: '',
    action: () => googleSignIn(),
    imageSource: GoogleLogo,
  },
  {
    name: 'Facebook',
    icon: '',
    action: () => facebookAuth(),
    imageSource: FacebookLogo,
  },
];

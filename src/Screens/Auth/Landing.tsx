import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Purchases from 'react-native-purchases';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AuthtackParamList } from '_utils/interfaces';

import SMButton from '_components/ui/Buttons/SM-Logins';
import Button from '_components/ui/Buttons/Button';
import CoverImage from '_assets/main-screen.png';
import { actionButtons } from './utils';
import type {
  ActionButtons,
  AppleAuthReturn,
  GoogleAuthReturn,
} from './utils/interfaces';
import navigatePostSignup from './utils/navigatePostSignup';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import {
  googleRegister,
  selectLoadingState,
  appleRegister,
} from '_redux/slices/user';

import { isBelowHeightThreshold, HEIGHT } from '_utils/constants';
import { sendEvent } from '_utils/functions/amplitude';
import { checkLocationPermissions } from '_utils/functions/permissions';

type LandingScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthtackParamList, 'Landing'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface LandingProps {
  navigation: LandingScreenNavigationProps;
}

const Landing: FunctionComponent<LandingProps> = props => {
  const { t } = useTranslation();
  type SelectedLogin = 'Google' | 'Apple' | '';
  const [selectedLogin, setSelectedLogin] = React.useState<SelectedLogin>('');
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(selectLoadingState);

  const navigateToSignIn = () => {
    props.navigation.navigate('SignIn');
  };

  const navigateToTerms = () => {
    props.navigation.navigate('SettingsStack', {
      screen: 'TermsAndConditions',
    });
  };

  const navigateToPrivacy = () => {
    props.navigation.navigate('SettingsStack', {
      screen: 'PrivacyPolicy',
    });
  };

  const navigateToEmailRegister = () => {
    sendEvent('email_register_begin');
    props.navigation.navigate('EmailSignUp');
  };

  const navigateToApp = () => {
    props.navigation.navigate('App', {
      screen: 'Explore',
    });
  };

  const navigateToLocationPermissions = () => {
    props.navigation.navigate('OnBoarding', {
      screen: 'LocationPermissions',
    });
  };

  const handleSkip = async () => {
    sendEvent('skip_onboarding', {
      screen: 'landing',
    });

    const locationPermissions = await checkLocationPermissions();
    if (!locationPermissions) {
      navigateToLocationPermissions();
    } else {
      navigateToApp();
    }
  };

  const handleSocialAuth = async (actionButton: ActionButtons) => {
    setSelectedLogin(actionButton.name as SelectedLogin);
    switch (actionButton.name) {
      case 'Google':
        {
          sendEvent('google_register_begin');
          const credentialObj = await actionButton.action();
          if ((credentialObj as GoogleAuthReturn)?.credential) {
            const response = await dispatch(
              googleRegister(credentialObj as { credential: string }),
            );

            if (googleRegister.fulfilled.match(response)) {
              sendEvent('login_success', {
                method: 'google',
              });
              navigatePostSignup(response.payload, props.navigation);
            }
          }
        }
        break;
      case 'Apple':
        {
          sendEvent('apple_register_begin');
          const credentialObj = await actionButton.action();
          if (credentialObj as AppleAuthReturn) {
            const response = await dispatch(
              appleRegister(credentialObj as AppleAuthReturn),
            );

            if (appleRegister.fulfilled.match(response)) {
              sendEvent('login_success', {
                method: 'apple',
              });
              navigatePostSignup(response.payload, props.navigation);
            }
          }
        }
        break;
      default:
        return;
    }
  };

  React.useEffect(() => {
    Purchases.getOfferings();
    sendEvent('page_view', {
      type: 'landing',
    });
  }, []);

  return (
    <ImageBackground style={styles.backgroundImage} source={CoverImage}>
      <View>
        <View style={styles.introTextContainer}>
          <Text style={styles.introText}>{t('landing.INTRO')}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {actionButtons.map((actionButton, index) => {
            const buttonIsLoading =
              loadingState && actionButton.name === selectedLogin;
            return (
              <SMButton
                loading={buttonIsLoading}
                key={index}
                onPress={() => handleSocialAuth(actionButton)}
                imageSource={actionButton.imageSource}
                style={{
                  container: {
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginVertical: isBelowHeightThreshold ? 5 : 10,
                    padding: isBelowHeightThreshold ? 12 : 16,
                  },
                  text: {
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '800',
                  },
                }}>
                {`${t('CONTINUE_WITH')} ${actionButton.name}`}
              </SMButton>
            );
          })}
          <View style={styles.altDirContainer}>
            <Text style={styles.altDirText}>{t('OR')}</Text>
          </View>
          <Button
            onPress={navigateToEmailRegister}
            gradient
            gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
            gradientLocations={[0.0, 1, 1]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 0.06,
              y: 2.3,
            }}
            style={{
              container: {
                backgroundColor: 'white',
                borderRadius: 12,
                padding: isBelowHeightThreshold ? 12 : 16,
                marginVertical: isBelowHeightThreshold ? 10 : 20,
              },
              text: {
                color: '#FFF',
                fontSize: 16,
                fontWeight: '800',
              },
            }}>
            {t('EMAIL')}
          </Button>
        </View>
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            {t('landing.privacy._1')}&nbsp;
            <TouchableWithoutFeedback onPress={navigateToTerms}>
              <Text style={styles.privacyLink}>
                {t('landing.privacy._2')}&nbsp;
              </Text>
            </TouchableWithoutFeedback>
            {t('landing.privacy._3')}&nbsp;
            <TouchableWithoutFeedback onPress={navigateToPrivacy}>
              <Text style={styles.privacyLink}>{t('landing.privacy._4')}.</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            {t('HAVE_ACCOUNT')} &nbsp;
            <TouchableWithoutFeedback onPress={navigateToSignIn}>
              <Text style={styles.signInHighlight}>{t('SIGN_IN')}</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>

        <View style={styles.skipContainer}>
          <Text style={styles.skipAltText}>{t('OR')}</Text>
          <Pressable onPress={handleSkip}>
            <Text style={styles.skipButtonText}>{t('SKIP')}</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    opacity: 1,
    zIndex: 0,
  },
  introTextContainer: {
    marginHorizontal: 25,
    marginTop: isBelowHeightThreshold ? HEIGHT * 0.18 : HEIGHT * 0.22,
  },
  introText: {
    fontFamily: 'SFRounded-Ultralight',
    fontSize: 32,
    fontWeight: '600',
    color: '#FFF',
  },
  buttonsContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  altDirContainer: {
    alignItems: 'center',
    marginVertical: 4,
    marginTop: 10,
  },
  altDirText: {
    color: '#FFF',
    fontWeight: '600',
  },
  privacyContainer: {
    marginHorizontal: 10,
    marginTop: isBelowHeightThreshold ? 5 : 15,
  },
  privacyText: {
    textAlign: 'center',
    color: '#FFF',
  },
  privacyLink: {
    textDecorationStyle: 'dotted',
    textDecorationLine: 'underline',
  },
  signInContainer: {
    marginTop: isBelowHeightThreshold ? 10 : 20,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    color: '#FFF',
  },
  signInHighlight: {
    color: '#AA00FF',
    fontWeight: '700',
  },
  skipContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  skipAltText: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 15,
    color: 'white',
  },
});

export default Landing;

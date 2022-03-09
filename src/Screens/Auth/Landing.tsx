import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AuthtackParamList } from '_utils/interfaces';

import SMButton from '_components/ui/Buttons/SM-Logins';
import Button from '_components/ui/Buttons/Button';
import CoverImage from '_assets/main-screen.png';
import { actionButtons } from './utils';
import type { ActionButtons } from './utils/interfaces';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { googleRegister, selectLoadingState } from '_redux/slices/user';
import { GoogleLoginResponse } from '_utils/interfaces/data/user';

const HEIGHT = Dimensions.get('window').width;

type LandingScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthtackParamList, 'Landing'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface LandingProps {
  navigation: LandingScreenNavigationProps;
}

const Landing: FunctionComponent<LandingProps> = props => {
  type SelectedLogin = 'Facebook' | 'Google' | 'Apple' | '';
  const [selectedLogin, setSelectedLogin] = React.useState<SelectedLogin>('');
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(selectLoadingState);

  const navigateToSignIn = () => {
    props.navigation.navigate('SignIn');
  };

  const navigateToEmailRegister = () => {
    props.navigation.navigate('EmailSignUp');
  };

  const navigateToOnBoarding = () => {
    props.navigation.navigate('OnBoarding', {
      screen: 'ChooseUserName',
    });
  };

  const navigateToApp = () => {
    props.navigation.navigate('App', {
      screen: 'Explore',
    });
  };

  const handleSocialAuth = async (actionButton: ActionButtons) => {
    setSelectedLogin(actionButton.name as SelectedLogin);
    switch (actionButton.name) {
      case 'Google':
        {
          const credentialObj = await actionButton.action();
          if (credentialObj?.credential) {
            const response = await dispatch(
              googleRegister(credentialObj as { credential: string }),
            );

            // assume user has filled onBoarding if username and profile_pic exist
            const userPreviouslyFilledOnBoardingData = !!(
              (response.payload as GoogleLoginResponse).user.username &&
              (response.payload as GoogleLoginResponse).user.profile_pic
            );

            if (googleRegister.fulfilled.match(response)) {
              if (userPreviouslyFilledOnBoardingData) {
                navigateToApp();
              } else {
                navigateToOnBoarding();
              }
            }
          }
        }
        break;
      case 'Facebook':
        {
          const credentialObj = await actionButton.action();
          console.log('credentials facebook', credentialObj);
        }
        break;
      case 'Apple':
        {
          // not yet implemented. Need to test on real device and fix android
        }
        break;
      default:
        return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={CoverImage}>
        <View>
          <View style={styles.introTextContainer}>
            <Text style={styles.introText}>
              View dive locations and reviews all over the world
            </Text>
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
                      marginVertical: HEIGHT < 400 ? 5 : 10,
                      padding: HEIGHT < 400 ? 12 : 16,
                    },
                    text: {
                      color: 'black',
                      fontSize: 16,
                      fontWeight: '800',
                    },
                  }}>
                  Continue with {actionButton.name}
                </SMButton>
              );
            })}
            <View style={styles.altDirContainer}>
              <Text style={styles.altDirText}>OR</Text>
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
                  padding: HEIGHT < 400 ? 12 : 16,
                  marginVertical: HEIGHT < 400 ? 10 : 20,
                },
                text: {
                  color: '#FFF',
                  fontSize: 16,
                  fontWeight: '800',
                },
              }}>
              Email
            </Button>
          </View>
          <View style={styles.privacyContainer}>
            <Text style={styles.privacyText}>
              By proceeding, you agree to our&nbsp;
              <TouchableWithoutFeedback>
                <Text style={styles.privacyLink}>Terms of Use </Text>
              </TouchableWithoutFeedback>
              and confirm that you have read our&nbsp;
              <TouchableWithoutFeedback>
                <Text style={styles.privacyLink}>
                  Privacy and Cookie Statement.
                </Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>
              Have an Account? &nbsp;
              <TouchableWithoutFeedback onPress={navigateToSignIn}>
                <Text style={styles.signInHighlight}>Sign In</Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 1,
  },
  backgroundImage: {
    flex: 1,
    opacity: 1,
    zIndex: 0,
  },
  introTextContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
    marginTop: HEIGHT < 400 ? HEIGHT * 0.38 : HEIGHT * 0.44,
  },
  introText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFF',
  },
  buttonsContainer: {
    marginTop: HEIGHT < 400 ? HEIGHT * 0.06 : HEIGHT * 0.15,
    marginHorizontal: 15,
  },
  altDirContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  altDirText: {
    color: '#FFF',
    fontWeight: '600',
  },
  privacyContainer: {
    marginHorizontal: 10,
    marginTop: HEIGHT < 400 ? 5 : 15,
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
    marginTop: HEIGHT < 400 ? 10 : 20,
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
});

export default Landing;

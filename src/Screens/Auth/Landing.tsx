import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  // useColorScheme,
  View,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import type { ImageSourcePropType } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { FunctionComponent } from 'react';
import type { RootStackParamList } from '_utils/interfaces';

import SMButton from './components/SM-Logins';
import Button from '_components/ui/Buttons/Button';
import CoverImage from '_assets/main-screen.png';
import AppleLogo from '_assets/logos/apple-logo/AppleLogo.png';
import FacebookLogo from '_assets/logos/facebook-logo/FacebookLogo.png';
import GoogleLogo from '_assets/logos/google-logo/GoogleLogo.png';

const HEIGHT = Dimensions.get('window').width;

interface ActionButtons {
  name: string;
  icon: string;
  action: () => void;
  imageSource: ImageSourcePropType;
}
type LandingScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Landing'
>;

interface LandingProps {
  navigation: LandingScreenNavigationProps;
}

const Landing: FunctionComponent<LandingProps> = props => {
  const actionButtons: ActionButtons[] = [
    {
      name: 'Apple',
      icon: '',
      action: () => {},
      imageSource: AppleLogo,
    },
    {
      name: 'Google',
      icon: '',
      action: () => {},
      imageSource: GoogleLogo,
    },
    {
      name: 'Facebook',
      icon: '',
      action: () => {},
      imageSource: FacebookLogo,
    },
  ];

  const navigateToSignIn = () => {
    props.navigation.navigate('SignIn');
  };

  const navigateToEmailRegister = () => {
    props.navigation.navigate('EmailSignUp');
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
            {actionButtons.map((actionButton, index) => (
              <SMButton
                key={index}
                imageSource={actionButton.imageSource}
                style={{
                  container: {
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginVertical: HEIGHT < 400 ? 5 : 10,
                  },
                  text: {
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '800',
                  },
                }}>
                Continue with {actionButton.name}
              </SMButton>
            ))}
            <View style={styles.altDirContainer}>
              <Text style={styles.altDirText}>OR</Text>
            </View>
            <Button
              onPress={navigateToEmailRegister}
              gradient
              gradientColors={['#AA00FF', '#00E0FF']}
              gradientLocations={[0.0332, 1]}
              start={{
                x: 0.003,
                y: 3.75,
              }}
              end={{
                x: 1.5,
                y: 0.08,
              }}
              style={{
                container: {
                  backgroundColor: 'white',
                  borderRadius: 12,
                  padding: 12,
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

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import type { ImageSourcePropType } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { FunctionComponent } from 'react';
import type { RootStackParamList } from '_utils/interfaces';

import SMButton from './components/SM-Logins';
import Button from '_components/ui/Buttons/Button';
import AppleLogo from '_assets/logos/apple-logo/AppleLogo.png';
import FacebookLogo from '_assets/logos/facebook-logo/FacebookLogo.png';
import GoogleLogo from '_assets/logos/google-logo/GoogleLogo.png';
import Input from '_components/ui/Input';

const HEIGHT = Dimensions.get('window').width;

interface ActionButtons {
  name: string;
  icon: string;
  action: () => void;
  imageSource: ImageSourcePropType;
}

type LandingScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

interface SignInProps {
  navigation: LandingScreenNavigationProps;
}

const SignIn: FunctionComponent<SignInProps> = props => {
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

  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateToEmailRegister = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <Icon
            onPress={navigateBack}
            name="chevron-back"
            color="black"
            size={25}
          />
        </View>
        <View style={styles.introTextContainer}>
          <Text style={styles.introText}>Welcome Back</Text>
        </View>
        <View>
          <Input
            placeholder="Email"
            placeholderTextColor="#BFBFBF"
            // style={{ color: 'black' }}
            containerStyle={styles.inputContainer}
          />
          <Input
            placeholder="Password"
            placeholderTextColor="#BFBFBF"
            // style={{ color: 'black' }}
            containerStyle={styles.inputContainer}
            passwordType
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={navigateToEmailRegister}
            gradient
            gradientColors={['#AA00FF', '#00E0FF']}
            gradientLocations={[-0.0332, 1.1906]}
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
            Log in
          </Button>
          <View style={styles.altDirContainer}>
            <Text style={styles.altDirText}>OR</Text>
          </View>
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
            Don't have an Account, &nbsp;
            <TouchableWithoutFeedback onPress={navigateBack}>
              <Text style={styles.signInHighlight}>Sign Up</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
    opacity: 1,
  },
  backgroundImage: {
    flex: 1,
    opacity: 1,
    zIndex: 0,
  },
  introTextContainer: {
    marginHorizontal: 25,
    marginTop: HEIGHT < 400 ? HEIGHT * 0.07 : HEIGHT * 0.12,
    marginBottom: HEIGHT < 400 ? HEIGHT * 0.07 : HEIGHT * 0.12,
  },
  introText: {
    fontSize: 32,
    fontWeight: '800',
    color: 'black',
    textAlign: 'left',
  },
  buttonsContainer: {
    marginTop: HEIGHT * 0.05,
    marginHorizontal: 15,
  },
  altDirContainer: {
    alignItems: 'center',
    marginVertical: 3,
  },
  altDirText: {
    color: 'black',
    fontWeight: '600',
  },
  privacyContainer: {
    marginHorizontal: 10,
    marginTop: HEIGHT < 400 ? 5 : 15,
  },
  privacyText: {
    textAlign: 'center',
    color: 'black',
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
    color: '#000',
  },
  signInHighlight: {
    color: '#AA00FF',
    fontWeight: '700',
  },
  inputContainer: {
    marginHorizontal: 25,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default SignIn;

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

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AuthtackParamList } from '_utils/interfaces';

import SMButton from './components/SM-Logins';
import Button from '_components/ui/Buttons/Button';
import Input from '_components/ui/Input';
import { actionButtons } from './utils';

const HEIGHT = Dimensions.get('window').width;

type EmailSignUpScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthtackParamList, 'EmailSignUp'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface EmailSignUpProps {
  navigation: EmailSignUpScreenNavigationProps;
}

const EmailSignUp: FunctionComponent<EmailSignUpProps> = props => {
  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateToSignIn = () => {
    props.navigation.navigate('SignIn');
  };

  const navigateToOnboarding = () => {
    props.navigation.navigate('OnBoarding', {
      screen: 'ChooseUserName',
    });
  };

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
          <Text style={styles.introText}>Become a Zentacle member.</Text>
        </View>
        <View>
          <Input
            placeholder="Email"
            placeholderTextColor="#BFBFBF"
            containerStyle={styles.inputContainer}
          />
          <Input
            placeholder="Password"
            placeholderTextColor="#BFBFBF"
            containerStyle={styles.inputContainer}
            passwordType
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={navigateToOnboarding}
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
                padding: HEIGHT < 400 ? 12 : 16,
                marginVertical: HEIGHT < 400 ? 10 : 20,
              },
              text: {
                color: '#FFF',
                fontSize: 16,
                fontWeight: '800',
              },
            }}>
            Sign Up
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
            Have an Account? &nbsp;
            <TouchableWithoutFeedback onPress={navigateToSignIn}>
              <Text style={styles.signInHighlight}>Sign in</Text>
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

export default EmailSignUp;

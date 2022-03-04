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
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import { FORM_ERROR } from 'final-form';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AuthtackParamList } from '_utils/interfaces';
import type { User } from '_utils/interfaces/data/user';

import SMButton from '_components/ui/Buttons/SM-Logins';
import Button from '_components/ui/Buttons/Button';
import Input from '_components/ui/FormManagementInput';
import { actionButtons } from './utils';
import { useAppDispatch } from '_redux/hooks';
import { registerUser } from '_redux/slices/user';

const HEIGHT = Dimensions.get('window').height;

type EmailSignUpScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthtackParamList, 'EmailSignUp'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface EmailSignUpProps {
  navigation: EmailSignUpScreenNavigationProps;
}

interface InitialValues {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

const EmailSignUp: FunctionComponent<EmailSignUpProps> = props => {
  const dispatch = useAppDispatch();

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

  const submitForm = async (values: User) => {
    const response = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(response)) {
      navigateToOnboarding();
    } else {
      return {
        [FORM_ERROR]:
          typeof response.payload === 'string'
            ? response.payload
            : 'There was an error logginng in, please try again.',
      };
    }
  };

  const constraints = {
    email: {
      email: true,
      presence: true,
    },
    password: {
      presence: true,
    },
    first_name: {
      presence: true,
    },
    last_name: {
      presence: true,
    },
  };
  const initialValues: InitialValues = {};

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

        <Form
          validate={values => validate(values, constraints)}
          onSubmit={submitForm}
          initialValues={initialValues}
          // keepDirtyOnReinitialize
          render={({
            handleSubmit,
            submitError,
            submitFailed,
            submitting,
            invalid,
            dirtySinceLastSubmit,
          }) => {
            return (
              <>
                <View>
                  <Field
                    name="first_name"
                    component={Input}
                    placeholder="First Name"
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.inputContainer}
                  />
                  <Field
                    name="last_name"
                    component={Input}
                    placeholder="Last Name"
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.inputContainer}
                  />
                  <Field
                    name="email"
                    component={Input}
                    placeholder="Email"
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.inputContainer}
                  />
                  <Field
                    name="password"
                    component={Input}
                    placeholder="Password"
                    placeholderTextColor="#BFBFBF"
                    containerStyle={styles.inputContainer}
                    passwordType
                  />
                </View>
                <View style={styles.buttonsContainer}>
                  <Button
                    loading={submitting}
                    disabled={invalid && !dirtySinceLastSubmit}
                    onPress={handleSubmit}
                    gradient
                    gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
                    gradientLocations={[0.01, 1, 1]}
                    start={{
                      x: 0,
                      y: 0,
                    }}
                    end={{
                      x: 0.06,
                      y: 2.2,
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
                  {submitFailed && !!submitError && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{submitError}</Text>
                    </View>
                  )}
                  <View style={styles.altDirContainer}>
                    <Text style={styles.altDirText}>OR</Text>
                  </View>
                  {actionButtons.map((actionButton, index) => (
                    <SMButton
                      key={index}
                      onPress={actionButton.action}
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
              </>
            );
          }}
        />

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
    marginTop: HEIGHT < 750 ? HEIGHT * 0.02 : HEIGHT * 0.035,
    marginBottom: HEIGHT < 750 ? HEIGHT * 0.02 : HEIGHT * 0.035,
  },
  introText: {
    fontSize: 32,
    fontWeight: '800',
    color: 'black',
    textAlign: 'left',
  },
  buttonsContainer: {
    marginTop: HEIGHT * 0.015,
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
    marginTop: HEIGHT < 750 ? 10 : 20,
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
  errorContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});

export default EmailSignUp;

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import { FORM_ERROR } from 'final-form';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AuthtackParamList } from '_utils/interfaces';
import type { User } from '_utils/interfaces/data/user';

import SMButton from '_components/ui/Buttons/SM-Logins';
import Button from '_components/ui/Buttons/Button';
import Input from '_components/ui/FormManagementInput';
import { actionButtons } from './utils';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import {
  registerUser,
  googleRegister,
  selectLoadingState,
} from '_redux/slices/user';
import { isBelowHeightThreshold, HEIGHT } from '_utils/constants';
import { GoogleLoginResponse } from '_utils/interfaces/data/user';
import type { ActionButtons } from './utils/interfaces';

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
  const { t } = useTranslation();
  type SelectedLogin = 'Facebook' | 'Google' | 'Apple' | '';
  const [selectedLogin, setSelectedLogin] = React.useState<SelectedLogin>('');
  const loadingState = useAppSelector(selectLoadingState);

  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateToSignIn = () => {
    props.navigation.navigate('SignIn');
  };

  const navigateToApp = () => {
    props.navigation.navigate('App', {
      screen: 'Explore',
    });
  };

  const navigateToCameraPermissions = () => {
    props.navigation.navigate('OnBoarding', {
      screen: 'CameraPermissions',
    });
  };

  const navigateToOnboarding = () => {
    props.navigation.navigate('OnBoarding', {
      screen: 'ChooseUserName',
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
              } else if (
                (response.payload as GoogleLoginResponse).user.username
              ) {
                navigateToCameraPermissions();
              } else {
                navigateToOnboarding();
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

  const submitForm = async (values: User) => {
    const response = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(response)) {
      navigateToOnboarding();
    } else {
      return {
        [FORM_ERROR]:
          typeof response.payload === 'string'
            ? response.payload
            : t('SIGN_UP_ERROR'),
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
          <Text style={styles.introText}>
            {t('email_signup.INTRO_TEXT', { name: 'Zentacle' })}
          </Text>
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
                    placeholder={t('FIRST_NAME')}
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.inputContainer}
                  />
                  <Field
                    name="last_name"
                    component={Input}
                    placeholder={t('LAST_NAME')}
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.inputContainer}
                  />
                  <Field
                    name="email"
                    component={Input}
                    placeholder={t('EMAIL')}
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.inputContainer}
                    keyboardType="email-address"
                  />
                  <Field
                    name="password"
                    component={Input}
                    placeholder={t('PASSWORD')}
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
                        padding: isBelowHeightThreshold ? 12 : 16,
                        marginVertical: isBelowHeightThreshold ? 10 : 20,
                      },
                      text: {
                        color: '#FFF',
                        fontSize: 16,
                        fontWeight: '800',
                      },
                    }}>
                    {t('SIGN_UP')}
                  </Button>
                  {submitFailed && !!submitError && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{submitError}</Text>
                    </View>
                  )}
                  <View style={styles.altDirContainer}>
                    <Text style={styles.altDirText}>{t('OR')}</Text>
                  </View>
                  {actionButtons.map((actionButton, index) => {
                    const buttonIsLoading =
                      loadingState && actionButton.name === selectedLogin;
                    return (
                      <SMButton
                        key={index}
                        loading={buttonIsLoading}
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
                </View>
              </>
            );
          }}
        />

        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            {t('landing.privacy._1')}&nbsp;
            <TouchableWithoutFeedback>
              <Text style={styles.privacyLink}>
                {t('landing.privacy._2')}&nbsp;
              </Text>
            </TouchableWithoutFeedback>
            {t('landing.privacy._3')}&nbsp;
            <TouchableWithoutFeedback>
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
    marginTop: isBelowHeightThreshold ? HEIGHT * 0.02 : HEIGHT * 0.035,
    marginBottom: isBelowHeightThreshold ? HEIGHT * 0.02 : HEIGHT * 0.035,
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
    marginTop: isBelowHeightThreshold ? 10 : 15,
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
    marginTop: isBelowHeightThreshold ? 10 : 20,
    marginBottom: 20,
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

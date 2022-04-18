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
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AuthtackParamList } from '_utils/interfaces';

import SMButton from '_components/ui/Buttons/SM-Logins';
import Button from '_components/ui/Buttons/Button';
import Input from '_components/ui/FormManagementInput';
import { actionButtons } from './utils';
import { useAppDispatch } from '_redux/hooks';
import { loginUser } from '_redux/slices/user';
import type { User } from '_utils/interfaces/data/user';

import { isBelowHeightThreshold, HEIGHT } from '_utils/constants';

type LandingScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthtackParamList, 'SignIn'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface SignInProps {
  navigation: LandingScreenNavigationProps;
}

interface InitialValues {
  email?: string;
  password?: string;
}

const SignIn: FunctionComponent<SignInProps> = props => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const navigateBack = () => {
    if (props.navigation.canGoBack()) {
      props.navigation.goBack();
    }
  };

  const navigateToSignUp = () => {
    props.navigation.navigate('EmailSignUp');
  };

  const navigateToOnboarding = () => {
    props.navigation.navigate('OnBoarding', {
      screen: 'ChooseUserName',
    });
  };

  const navigateToCameraPermissions = () => {
    props.navigation.navigate('OnBoarding', {
      screen: 'CameraPermissions',
    });
  };

  const navigateToApp = () => {
    props.navigation.navigate('App', {
      screen: 'Explore',
    });
  };

  const constraints = {
    email: {
      email: true,
      presence: true,
    },
    password: {
      presence: true,
    },
  };
  const initialValues: InitialValues = {};

  const submitForm = async (values: User) => {
    const response = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(response)) {
      // assume user has filled onBoarding if username and profile_pic exist
      const userPreviouslyFilledOnBoardingData = !!(
        response.payload.user.username && response.payload.user.profile_pic
      );
      if (userPreviouslyFilledOnBoardingData) {
        navigateToApp();
      } else if (
        response.payload.user.username &&
        !response.payload.user.profile_pic
      ) {
        navigateToCameraPermissions();
      } else {
        navigateToOnboarding();
      }
    } else {
      return {
        [FORM_ERROR]:
          typeof response.payload === 'string'
            ? response.payload
            : t('LOG_IN_ERROR'),
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        {props.navigation.canGoBack() && (
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Icon
              onPress={navigateBack}
              name="chevron-back"
              color="black"
              size={25}
            />
          </View>
        )}
        <View style={styles.introTextContainer}>
          <Text style={styles.introText}>{t('sign_in.INTRO_TEXT')}</Text>
        </View>

        <Form
          validate={values => validate(values, constraints)}
          onSubmit={submitForm}
          initialValues={initialValues}
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
                    {t('LOG_IN')}
                  </Button>
                  {submitFailed && !!submitError && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{submitError}</Text>
                    </View>
                  )}
                  <View style={styles.altDirContainer}>
                    <Text style={styles.altDirText}>{t('OR')}</Text>
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
                  ))}
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
            {t('DONT_HAVE_ACCOUNT')} &nbsp;
            <TouchableWithoutFeedback onPress={navigateToSignUp}>
              <Text style={styles.signInHighlight}>{t('SIGN_UP')}</Text>
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
    marginTop: isBelowHeightThreshold ? HEIGHT * 0.03 : HEIGHT * 0.05,
    marginBottom: isBelowHeightThreshold ? HEIGHT * 0.03 : HEIGHT * 0.05,
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
    marginTop: isBelowHeightThreshold ? 5 : 15,
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

export default SignIn;

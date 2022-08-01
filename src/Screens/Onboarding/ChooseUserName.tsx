import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import { FORM_ERROR } from 'final-form';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  OnboardingStackParamList,
} from '_utils/interfaces';
import type { User } from '_utils/interfaces/data/user';
import { sendEvent } from '_utils/functions/amplitude';

import Input from '_components/ui/FormManagementInput';
import Button from '_components/ui/Buttons/Button';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { updateUser, selectUser, selectAuthType } from '_redux/slices/user';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const HEIGHT = Dimensions.get('window').width;

type ChooseUserNameScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'ChooseUserName'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ChooseUserNameProps {
  navigation: ChooseUserNameScreenNavigationProps;
}

interface InitialValues {
  username?: string;
}

const ChooseUserName: FunctionComponent<ChooseUserNameProps> = props => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const authType = useAppSelector(selectAuthType);

  const navigateToCameraPermissions = () => {
    props.navigation.navigate('CameraPermissions');
  };

  const navigateToChooseAvatar = () => {
    props.navigation.navigate('ChooseAvatar');
  };

  const navigateToApp = () => {
    props.navigation.navigate('App', {
      screen: 'Explore',
    });
  };

  const submitForm = async (values: User) => {
    const response = await dispatch(updateUser(values));
    if (updateUser.fulfilled.match(response)) {
      if (Platform.OS === 'ios') {
        const camera_permissions = await check(PERMISSIONS.IOS.CAMERA);
        if (authType === 'register') {
          navigateToCameraPermissions();
        } else if (!user?.profile_pic) {
          if (camera_permissions === RESULTS.GRANTED) {
            navigateToChooseAvatar();
          } else {
            navigateToCameraPermissions();
          }
        } else {
          navigateToApp();
        }
      } else {
        const camera_permissions = await check(PERMISSIONS.ANDROID.CAMERA);
        if (authType === 'register') {
          navigateToCameraPermissions();
        } else if (!user?.profile_pic) {
          if (camera_permissions === RESULTS.GRANTED) {
            navigateToChooseAvatar();
          } else {
            navigateToCameraPermissions();
          }
        } else {
          navigateToApp();
        }
      }
    } else {
      return {
        [FORM_ERROR]:
          typeof response.payload === 'string'
            ? response.payload
            : t('USER_UPDATE_ERROR'),
      };
    }
  };

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'onboarding__username',
    })
  }, []);

  const constraints = {
    username: {
      presence: true,
    },
  };
  const initialValues: InitialValues = {
    username: user?.username || '',
  };

  return (
    <SafeAreaView style={styles.container}>
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
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.contentContainer}>
                <View style={styles.headerAndInput}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                      {t('choose_username.DESCRIPTION_MAIN_TEXT')}
                    </Text>
                    <Text style={styles.headerSubtext}>
                      {t('choose_username.DESCRIPTION_SUB_TEXT', {
                        name: 'Zentacle',
                      })}
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>{t('ENTER_USERNAME')}</Text>
                    <Field
                      name="username"
                      component={Input}
                      placeholder={t('USERNAME')}
                      placeholderTextColor="#BFBFBF"
                      // style={styles.input}
                      containerStyle={styles.input}
                    />
                  </View>
                </View>

                <View style={styles.footer}>
                  <Button
                    onPress={handleSubmit}
                    loading={submitting}
                    disabled={invalid && !dirtySinceLastSubmit}
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
                        marginHorizontal: 0,
                      },
                      text: {
                        color: '#FFF',
                        fontSize: 16,
                        fontWeight: '800',
                      },
                    }}>
                    Continue
                  </Button>
                  {submitFailed && !!submitError && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{submitError}</Text>
                    </View>
                  )}
                </View>
              </KeyboardAvoidingView>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  headerContainer: {
    marginTop: HEIGHT < 400 ? HEIGHT * 0.2 : HEIGHT * 0.3,
    marginBottom: HEIGHT < 400 ? HEIGHT * 0.08 : HEIGHT * 0.12,
  },
  headerText: {
    color: 'black',
    fontSize: 35,
    fontWeight: '700',
  },
  headerSubtext: {
    color: 'black',
    marginTop: 8,
  },
  headerAndInput: {
    marginHorizontal: 25,
  },
  inputContainer: {},
  input: {
    marginHorizontal: 0,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
  },
  inputLabel: {
    color: 'black',
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {
    marginHorizontal: 25,
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

export default ChooseUserName;

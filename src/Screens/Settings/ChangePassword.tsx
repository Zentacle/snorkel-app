import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import { FORM_ERROR } from 'final-form';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';

import Button from '_components/ui/Buttons/Button';
import Input from '_components/ui/FormManagementInput';

type ChangePasswordTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'ChangePassword'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ChangePasswordTypeProps {
  navigation: ChangePasswordTypeNavigationProps;
}

const ChangePassword: FunctionComponent<ChangePasswordTypeProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const navigateBack = () => {
    navigation.goBack();
  };

  const submitForm = async (values: User) => {
    // const response = await dispatch(loginUser(values));
    // if (loginUser.fulfilled.match(response)) {
    //   // assume user has filled onBoarding if username and profile_pic exist
    //   const userPreviouslyFilledOnBoardingData = !!(
    //     response.payload.user.username && response.payload.user.profile_pic
    //   );
    //   if (userPreviouslyFilledOnBoardingData) {
    //     navigateToApp();
    //   } else if (
    //     response.payload.user.username &&
    //     !response.payload.user.profile_pic
    //   ) {
    //     navigateToCameraPermissions();
    //   } else {
    //     navigateToOnboarding();
    //   }
    // } else {
    //   console.log(response);
    //   return {
    //     [FORM_ERROR]:
    //       typeof response.payload === 'string'
    //         ? response.payload
    //         : 'There was an error logging in, please try again.',
    //   };
    // }
  };

  const constraints = {
    password: {
      presence: true,
    },
    confirmPassword: {
      presence: true,
      equality: 'password',
    },
  };
  const initialValues = {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Icon
            name="chevron-back-outline"
            size={30}
            color="black"
            onPress={navigateBack}
          />
          <Text style={styles.headerText}>{t('CHANGE_PASSWORD')}</Text>
          <View />
        </View>
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
          valid,
        }) => {
          return (
            <>
              <View style={styles.form}>
                <Field
                  name="password"
                  component={Input}
                  placeholder={t('PASSWORD')}
                  placeholderTextColor="#BFBFBF"
                  containerStyle={styles.inputContainer}
                  passwordType
                />
                <Field
                  name="confirmPassword"
                  component={Input}
                  placeholder={t('CONFIRM_PASSWORD')}
                  placeholderTextColor="#BFBFBF"
                  // style={styles.input}
                  passwordType
                  containerStyle={styles.inputContainer}
                />

                {submitFailed && !!submitError && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{submitError}</Text>
                  </View>
                )}

                {valid && (
                  <View style={styles.validContainer}>
                    <Icon name="checkmark-outline" size={20} color="#1693D3" />
                    <Text style={styles.validText}>
                      {t('PASSWORD_MATCHES')}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.footer}>
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
                      padding: 16,
                      marginVertical: 20,
                    },
                    text: {
                      color: '#FFF',
                      fontSize: 16,
                      fontWeight: '800',
                    },
                  }}>
                  {t('CONTINUE')}
                </Button>
              </View>
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
  contentContainer: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  inputContainer: {
    marginHorizontal: 25,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 30,
  },
  footer: {
    marginHorizontal: 15,
  },
  errorContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  form: {
    marginTop: 30,
    flex: 1,
  },
  validContainer: {
    marginHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  validText: {
    color: '#1693D3',
    fontSize: 11,
    marginLeft: 5,
  },
});

export default ChangePassword;

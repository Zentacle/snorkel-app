import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  OnboardingStackParamList,
} from '_utils/interfaces';

import { useAppSelector } from '_redux/hooks';

import Button from '_components/ui/Buttons/Button';
import {
  selectUser,
  selectAuthToken,
  selectAuthType,
} from '_redux/slices/user';
import ImageFormComponent from '_components/ui/ImageFormComponent';
import { handleUploadProfilePic } from '_redux/slices/user/api';
import { FormImages } from '_utils/interfaces/data/logs';
import { sendEvent } from '_utils/functions/amplitude';

const HEIGHT = Dimensions.get('window').width;

type ChooseAvatarScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'ChooseAvatar'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ChooseAvatarProps {
  navigation: ChooseAvatarScreenNavigationProps;
}

interface InitialValues {
  profile_pic: string;
  profileObj?: FormImages;
}

const ChooseAvatar: FunctionComponent<ChooseAvatarProps> = props => {
  const user = useAppSelector(selectUser);
  const authToken = useAppSelector(selectAuthToken);
  const authType = useAppSelector(selectAuthType);
  const { t } = useTranslation();
  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateToLocationPermissions = () => {
    props.navigation.push('LocationPermissions');
  };

  const navigateToAddRecentDiveLog = () => {
    props.navigation.push('AddRecentDiveLog');
  };

  const handleContinuePress = async () => {
    if (authType === 'register') {
      navigateToLocationPermissions();
    } else {
      const perms = await checkMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]);
      const locationAlways = perms[PERMISSIONS.IOS.LOCATION_ALWAYS];
      const locationWhenInUse = perms[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
      const fineLocation = perms[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
      const coarseLocation = perms[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];
      if (
        locationAlways === RESULTS.GRANTED ||
        locationWhenInUse === RESULTS.GRANTED ||
        fineLocation === RESULTS.GRANTED ||
        coarseLocation === RESULTS.GRANTED
      ) {
        navigateToAddRecentDiveLog();
      } else {
        navigateToLocationPermissions();
      }
    }
  };

  const submitForm = async (values: InitialValues) => {
    await handleUploadProfilePic(
      values.profileObj as FormImages,
      authToken as string,
    );

    await handleContinuePress();
  };

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'onboarding__avatar',
    });
  }, []);

  const initialValues: InitialValues = {
    profile_pic: user?.profile_pic || '',
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        validate={values => validate(values, {})}
        onSubmit={submitForm}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, values }) => {
          return (
            <>
              <View style={styles.contentContainer}>
                <View style={styles.iconBackContainer}>
                  <Icon
                    onPress={navigateBack}
                    name="chevron-back"
                    color="black"
                    size={25}
                  />
                </View>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>
                    {t('choose_avatar.DESCRIPTION_MAIN_TEXT')}
                  </Text>
                  <Text style={styles.headerSubtext}>
                    {t('choose_avatar.DESCRIPTION_SUB_TEXT')}
                  </Text>
                </View>

                <Field
                  name="profile_pic"
                  iconContainerStyle={styles.iconContainer}
                  component={ImageFormComponent}
                />
              </View>

              <View style={styles.footer}>
                <Button
                  onPress={
                    values.profileObj ? handleSubmit : handleContinuePress
                  }
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
                  {submitting ? t('SUBMITTING') : t('CONTINUE')}
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
  headerContainer: {
    marginTop: HEIGHT < 400 ? HEIGHT * 0.1 : HEIGHT * 0.12,
    marginBottom: HEIGHT < 400 ? HEIGHT * 0.08 : HEIGHT * 0.09,
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
  contentContainer: {
    flex: 1,
    marginHorizontal: 25,
  },
  footer: {
    marginHorizontal: 25,
  },
  iconBackContainer: {
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: '#FFF',
    width: 168,
    height: 168,
    borderRadius: 84,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageStyling: {},
});

export default ChooseAvatar;

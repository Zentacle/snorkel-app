import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';

import {
  useAppDispatch,
  useAppSelector,
} from '_redux/hooks';
import {
  selectUser,
  updateUser,
} from '_redux/slices/user';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';
import { User } from '_utils/interfaces/data/user';

import Button from '_components/ui/Buttons/Button';
import Input from '_components/ui/FormManagementInput';
import DeleteModal from './components/DeleteModal';

import ProfileDefault from '_assets/profile-placeholder.png';

type ProfileSettingsTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'ProfileSettings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ProfileSettingsTypeProps {
  navigation: ProfileSettingsTypeNavigationProps;
}

const ProfileSettings: FunctionComponent<ProfileSettingsTypeProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const [modalIsOpen, toggleModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const navigateBack = () => {
    navigation.goBack();
  };

  const openModal = () => {
    toggleModal(true);
  };

  const modalAction = () => {
    toggleModal(false);
    // act
  };

  const modalCancelAction = () => {
    toggleModal(false);
  };

  const submitForm = async (values: User) => {
    dispatch(
      updateUser(values),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DeleteModal
        subtext={t('deleteModal.SUB_TEXT')}
        isVisible={modalIsOpen}
        modalAction={modalAction}
        modalCancelAction={modalCancelAction}
        actionText={t('deleteModal.ACTION_TEXT')}
        cancelActionText={t('CANCEL')}
      />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Icon
            name="chevron-back-outline"
            size={30}
            color="black"
            onPress={navigateBack}
          />
          <Text style={styles.headerText}>{t('PROFILE_SETTINGS')}</Text>
          <View />
        </View>

        <View style={styles.profileImageContainer}>
          {user?.profile_pic ? (
            <Image
              style={styles.profileImage}
              source={{ uri: user.profile_pic }}
            />
          ) : (
            <Image style={styles.profileImage} source={ProfileDefault} />
          )}
        </View>
      </View>
      <Form
        onSubmit={submitForm}
        initialValues={{
          'display_name': user?.display_name,
          'email': user?.email,
          'bio': user?.bio,
        }}
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
                <Text style={styles.nameLabel}>{t('FULL_NAME')}</Text>
                <Field
                  name="display_name"
                  component={Input}
                  placeholder={t('FULL_NAME')}
                  placeholderTextColor="#BFBFBF"
                  containerStyle={styles.inputContainer}
                />

                <Text style={styles.nameLabel}>{t('EMAIL')}</Text>
                <Field
                  name="email"
                  component={Input}
                  placeholder={t('EMAIL')}
                  placeholderTextColor="#BFBFBF"
                  // style={styles.input}
                  containerStyle={styles.inputContainer}
                />

                <Text style={styles.nameLabel}>{t('BIO')}</Text>
                <Field
                  name="bio"
                  component={Input}
                  placeholder={t('BIO')}
                  placeholderTextColor="#BFBFBF"
                  // style={styles.input}
                  containerStyle={styles.inputContainer}
                />
                <Button
                  // loading={submitting}
                  // disabled={invalid && !dirtySinceLastSubmit}
                  onPress={openModal}
                  textGradient
                  gradientColors={['#FA0E0E', '#FF9900', '#FF9900']}
                  gradientLocations={[1, 1, 1]}
                  start={{
                    x: 0,
                    y: 0,
                  }}
                  end={{
                    x: 0.06,
                    y: 6,
                  }}
                  style={{
                    container: {
                      backgroundColor: 'white',
                      borderRadius: 12,
                      padding: 16,
                      marginVertical: 20,
                      marginHorizontal: 0,
                    },
                    text: {
                      color: '#FFF',
                      fontSize: 17,
                      fontWeight: '800',
                    },
                  }}>
                  {t('deleteModal.ACTION_TEXT')}
                </Button>
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
                  {t('UPDATE')}
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
  contentContainer: {
    marginHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameLabel: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  footer: {
    marginHorizontal: 10,
  },
  inputContainer: {
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
  }
});

export default ProfileSettings;

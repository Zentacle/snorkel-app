import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { selectUser, updateUser } from '_redux/slices/user';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';
import { User } from '_utils/interfaces/data/user';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';

import Button from '_components/ui/Buttons/Button';
import Input from '_components/ui/FormManagementInput';
import SelectWGradientBorder from '_components/ui/SelectWGradientBorderV2';
import DeleteModal from './components/DeleteModal';
import FMInput from '_components/ui/FormManagementInput';
import ImageFormComponent from '_components/ui/ImageFormComponent';

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

  const submitForm = async (values: User, form: any) => {
    const dirtyValues = Object.keys(form.getState().dirtyFields).reduce(
      (result: Record<string, any>, key: string) => {
        result[key] = (values as any)[key];
        return result;
      },
      {},
    );
    dispatch(updateUser(dirtyValues));
    navigateBack();
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
      <View style={styles.headerContainer}>
        <Icon
          name="chevron-back-outline"
          size={30}
          color="black"
          onPress={navigateBack}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>{t('PROFILE_SETTINGS')}</Text>
        <View style={styles.headerIcon} />
      </View>
      <Form
        onSubmit={submitForm}
        initialValues={{
          ...user,
        }}
        render={({
          handleSubmit,
          submitting,
          invalid,
          dirtySinceLastSubmit,
        }) => {
          return (
            <>
              <KeyboardAwareScrollView>
                <View style={styles.contentContainer}>
                  <View style={styles.profileImageContainer}>
                    <Field name="profile_pic" component={ImageFormComponent} />
                  </View>
                </View>
                <View style={styles.form}>
                  <Text style={styles.nameLabel}>{t('FULL_NAME')}</Text>
                  <Field
                    name="display_name"
                    component={Input}
                    placeholder={t('FULL_NAME')}
                    placeholderTextColor="#BFBFBF"
                    containerStyle={styles.inputContainer}
                  />

                  <Text style={styles.nameLabel}>Hometown</Text>
                  <Field
                    name="hometown"
                    component={Input}
                    placeholder="Hometown"
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.inputContainer}
                  />

                  <Text style={styles.nameLabel}>
                    Highest Certification
                  </Text>
                  <Field
                    name="certification"
                    component={SelectWGradientBorder}
                    options={['Open Water', 'Advanced Open Water', 'Rescue Diver', 'Divemaster', 'Instructor']}
                    activeComponent={ActiveComponent}
                    inactiveComponent={InactiveComponent}
                    containerStyle={styles.inputContainer}
                  />

                  <Text style={styles.nameLabel}>{t('BIO')}</Text>
                  <Field
                    name="bio"
                    component={FMInput}
                    placeholder={t('BIO')}
                    placeholderTextColor="#BFBFBF"
                    style={styles.input}
                    containerStyle={styles.inputContainer}
                    multiline
                  />
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
                        marginVertical: 8,
                      },
                      text: {
                        color: '#FFF',
                        fontSize: 16,
                        fontWeight: '800',
                      },
                    }}>
                    {t('UPDATE')}
                  </Button>
                  <Button
                    // loading={submitting}
                    // disabled={invalid && !dirtySinceLastSubmit}
                    onPress={openModal}
                    style={{
                      container: {
                        backgroundColor: 'white',
                        borderRadius: 12,
                        padding: 16,
                        marginVertical: 8,
                      },
                      text: {
                        color: '#AA00FF',
                        fontSize: 17,
                        fontWeight: '800',
                      },
                    }}>
                    {t('deleteModal.ACTION_TEXT')}
                  </Button>
                </View>
              </KeyboardAwareScrollView>
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
    marginTop: 10,
    marginHorizontal: 25,
  },
  headerIcon: {
    flexGrow: 0,
    flexBasis: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
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
    marginBottom: 15,
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    minHeight: 120,
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 5,
    color: 'black',
    justifyContent: 'flex-start',
  },
});

export default ProfileSettings;

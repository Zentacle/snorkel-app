import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAppSelector } from '_redux/hooks';
import { selectAuthToken } from '_redux/slices/user';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  LogsFormStackParamList,
} from '_utils/interfaces';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';

import Button from '_components/ui/Buttons/Button';
import Input from '_components/ui/FormManagementInput';
import SelectWGradientBorder from '_components/ui/SelectWGradientBorderV2';
import FMInput from '_components/ui/FormManagementInput';
import MapInput from '_components/ui/MapInput';
import { fetchCreateDiveSite } from '_redux/slices/dive-sites/api';
import { NewDiveSiteForm } from '_utils/interfaces/data/logs';

type NewDiveSiteTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<LogsFormStackParamList, 'NewDiveSite'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface NewDiveSiteTypeProps {
  navigation: NewDiveSiteTypeNavigationProps;
}

const NewDiveSite: FunctionComponent<NewDiveSiteTypeProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const authToken = useAppSelector(selectAuthToken);

  const navigateBack = () => {
    navigation.goBack();
  };

  const submitForm = async (values: NewDiveSiteForm, form: any) => {
    const dirtyValues = Object.keys(form.getState().dirtyFields).reduce(
      (result: Record<string, any>, key: string) => {
        result[key] = (values as any)[key];
        return result;
      },
      {},
    );
    await fetchCreateDiveSite(dirtyValues as NewDiveSiteForm, authToken!);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon
          name="chevron-back-outline"
          size={30}
          color="black"
          onPress={navigateBack}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Add New Site</Text>
        <View style={styles.headerIcon} />
      </View>
      <Form
        onSubmit={submitForm}
        initialValues={{}}
        render={({
          handleSubmit,
          submitting,
          invalid,
          dirtySinceLastSubmit,
        }) => {
          return (
            <>
              <KeyboardAwareScrollView>
                <View style={styles.form}>
                  <Text style={styles.nameLabel}>Name</Text>
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Name"
                    placeholderTextColor="#BFBFBF"
                    containerStyle={styles.inputContainer}
                  />

                  <Text style={styles.nameLabel}>Location</Text>
                  <Field
                    name="location"
                    component={MapInput}
                    value={{
                      latitude: 20.87117588224815,
                      longitude: -156.31847660817508,
                    }}
                    placeholder="Location"
                    placeholderTextColor="#BFBFBF"
                    containerStyle={styles.inputContainer}
                  />

                  <Field
                    name="location_city"
                    component={Input}
                    placeholder="City, State, Country"
                    placeholderTextColor="#BFBFBF"
                    containerStyle={styles.inputContainer}
                  />

                  <Text style={styles.nameLabel}>Difficulty</Text>
                  <Field
                    name="difficulty"
                    component={SelectWGradientBorder}
                    options={['Beginner', 'Intermediate', 'Advanced']}
                    activeComponent={ActiveComponent}
                    inactiveComponent={InactiveComponent}
                    containerStyle={styles.inputContainer}
                  />

                  <Text style={styles.nameLabel}>Description</Text>
                  <Field
                    name="description"
                    component={FMInput}
                    placeholder="Description"
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
                    {t('SUBMIT')}
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

export default NewDiveSite;

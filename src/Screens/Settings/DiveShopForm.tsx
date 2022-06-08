import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import ImageFormComponent from '_components/ui/ImageFormComponent';
import StampImageComponent from '_components/ui/StampImageComponent';
import Input from '_components/ui/FormManagementInput';
import Button from '_components/ui/Buttons/Button';
import { useAppSelector } from '_redux/hooks';
import { selectAuthToken } from '_redux/slices/user';

import { HEIGHT } from '_utils/constants';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';
import type { DiveShopInitialValues } from '_utils/interfaces/data/shops';
import {
  handleCreateDiveShop,
  handleUploadDiveShopImage,
  handleUploadStampImage,
} from '_redux/slices/dive-shops/api';
import { FormImages } from '_utils/interfaces/data/logs';

type DiveShopFormTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'DiveShopForm'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface DiveShopFormTypeProps {
  navigation: DiveShopFormTypeNavigationProps;
}

const DiveShopForm: FunctionComponent<DiveShopFormTypeProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const authToken = useAppSelector(selectAuthToken);

  const navigateBack = () => {
    navigation.goBack();
  };

  const onSubmit = async (values: DiveShopInitialValues) => {
    try {
      const filteredValues: DiveShopInitialValues = {
        ...values,
      };

      delete filteredValues.stampImageObj;
      delete filteredValues.imageObj;

      const diveShop = await handleCreateDiveShop(values, authToken as string);

      if (values.imageObj) {
        const imageUrlResponse = await handleUploadDiveShopImage(
          values.imageObj as FormImages,
          authToken as string,
          diveShop.id,
        );

        values.logo_img = imageUrlResponse;
        delete values.imageObj;
      }

      if (values.stampImageObj) {
        const stampImageUrlResponse = await handleUploadStampImage(
          values.stampImageObj as FormImages,
          authToken as string,
          diveShop.id,
        );

        values.stamp_url = stampImageUrlResponse;
        delete values.stampImageObj;
      }

      navigateBack();
    } catch (err) {
      console.log('error in  creating shop', err);
    }
  };

  const initialValues: DiveShopInitialValues = {};
  const constraints = {
    name: true,
    city: true,
    state: true,
    address1: true,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        validate={values => validate(values, constraints)}
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({
          handleSubmit,
          invalid,
          dirtySinceLastSubmit,
          submitting,
        }) => {
          return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <KeyboardAvoidingView>
                <View style={styles.headerContainer}>
                  <Icon
                    name="chevron-back-outline"
                    size={30}
                    color="black"
                    onPress={navigateBack}
                  />
                  <Text style={styles.headerText}>{t('ADD_DIVE_SHOP')}</Text>
                  <View />
                </View>

                <Field
                  name="imageObj"
                  iconContaineStyle={styles.iconContainer}
                  component={ImageFormComponent}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyling={styles.imageStyling}
                />

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{t('SHOP_NAME')}</Text>
                  <Field
                    name="name"
                    component={Input}
                    placeholder={t('SHOP_NAME')}
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.input}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{t('SHOP_ADDRESS')}</Text>
                  <Field
                    name="address1"
                    component={Input}
                    placeholder={t('ADDRESS_LINE_1')}
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.input}
                  />
                  <Field
                    name="address2"
                    component={Input}
                    placeholder={t('ADDRESS_LINE_2')}
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.input}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Field
                      name="city"
                      component={Input}
                      placeholder={t('CITY')}
                      placeholderTextColor="#BFBFBF"
                      // style={styles.input}
                      containerStyle={[styles.input, { width: '75%' }]}
                    />
                    <Field
                      name="state"
                      component={Input}
                      placeholder={t('STATE')}
                      placeholderTextColor="#BFBFBF"
                      // style={styles.input}
                      containerStyle={[styles.input, { width: '23%' }]}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.stampContainer}>
                      <Text style={styles.inputLabel}>{t('STAMP')}</Text>
                      <Text style={styles.optionaltext}>{t('OPTIONAL')}</Text>
                    </View>
                    <Field
                      name="stampImageObj"
                      // iconContaineStyle={styles.iconContainer}
                      component={StampImageComponent}
                      // placeholderStyle={styles.placeholderStyle}
                      imageStyling={styles.imageStyling}
                    />
                  </View>
                </View>
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
                      padding: HEIGHT < 400 ? 12 : 14,
                      marginTop: 30,
                      marginHorizontal: 0,
                    },
                    text: {
                      color: '#FFF',
                      fontSize: 14,
                      fontWeight: '800',
                    },
                  }}>
                  {submitting ? 'Submitting' : t('CONFIRM')}
                </Button>
              </KeyboardAvoidingView>
            </ScrollView>
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
  iconContainer: {
    width: 220,
    height: 130,
    borderRadius: 18,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageStyling: {
    width: 220,
    height: 130,
    borderRadius: 18,
  },
  placeholderStyle: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    marginHorizontal: 0,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
  },
  inputLabel: {
    color: 'black',
    fontWeight: '500',
  },
  optionaltext: {
    color: '#aa00ff',
  },
  stampContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DiveShopForm;

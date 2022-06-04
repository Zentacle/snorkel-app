import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import ImageFormComponent from '_components/ui/ImageFormComponent';
import Input from '_components/ui/FormManagementInput';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';

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
  const navigateBack = () => {
    navigation.goBack();
  };

  const initialValues = {};

  return (
    <SafeAreaView style={styles.container}>
      <Form
        validate={values => validate(values, {})}
        onSubmit={() => {}}
        initialValues={initialValues}
        render={({}) => {
          return (
            <View style={styles.contentContainer}>
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
                name="logo_img"
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
                    name="name"
                    component={Input}
                    placeholder={t('SHOP_NAME')}
                    placeholderTextColor="#BFBFBF"
                    // style={styles.input}
                    containerStyle={styles.input}
                  />
                </View>
              </View>
            </View>
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
    backgroundColor: '#FFF',
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

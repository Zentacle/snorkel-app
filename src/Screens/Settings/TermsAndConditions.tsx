import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';

type TermsAndConditionsTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'TermsAndConditions'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface TermsAndConditionsTypeProps {
  navigation: TermsAndConditionsTypeNavigationProps;
}

const TermsAndConditions: FunctionComponent<TermsAndConditionsTypeProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const navigateBack = () => {
    navigation.goBack();
  };

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
          <Text style={styles.headerText}>{t('TERMS_AND_CONDITIONS')}</Text>
          <View />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.terms}>
            <Text style={styles.termsHeader}>
              {t('terms_and_conditions._0')}
            </Text>
            <Text style={styles.textBody}>{t('terms_and_conditions._1')}</Text>
            <Text style={styles.textBody}>{t('terms_and_conditions._2')}</Text>
            <Text style={styles.textBody}>{t('terms_and_conditions._3')}</Text>
          </View>
          <View style={styles.terms}>
            <Text style={styles.termsHeader}>
              {t('terms_and_conditions._4')}
            </Text>
            <Text style={styles.textBody}>{t('terms_and_conditions._5')}</Text>
            <Text style={styles.textBody}>{t('terms_and_conditions._6')}</Text>
            <Text style={styles.textBody}>{t('terms_and_conditions._7')}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
    paddingBottom: 20,
  },
  contentContainer: {
    marginHorizontal: 25,
    marginBottom: 30,
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
  terms: {
    marginTop: 30,
  },
  termsHeader: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 17,
    color: 'black',
  },
  textBody: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'justify',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
});

export default TermsAndConditions;

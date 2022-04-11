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

type PrivacyPolicyTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'PrivacyPolicy'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface PrivacyPolicyTypeProps {
  navigation: PrivacyPolicyTypeNavigationProps;
}

const PrivacyPolicy: FunctionComponent<PrivacyPolicyTypeProps> = ({
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
          <Text style={styles.headerText}>{t('PRIVACY_POLICY')}</Text>
          <View />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.privacy}>
            <Text style={styles.textBody}>{t('privacy_policy._0')}</Text>
          </View>
          <View style={styles.privacy}>
            <Text style={styles.privacyHeader}>{t('privacy_policy._1')}</Text>
            <Text style={styles.textBody}>{t('privacy_policy._2')}</Text>
          </View>
          <View style={styles.privacy}>
            <Text style={styles.privacyHeader}>{t('privacy_policy._3')}</Text>
            <Text style={styles.textBody}>{t('privacy_policy._4')}</Text>
            <Text style={styles.text}>{t('privacy_policy._5')}</Text>
            <Text style={styles.text}>{t('privacy_policy._6')}</Text>
            <Text style={styles.text}>{t('privacy_policy._7')}</Text>
            <Text style={styles.text}>{t('privacy_policy._8')}</Text>
            <Text style={styles.text}>{t('privacy_policy._9')}</Text>
            <Text style={styles.text}>{t('privacy_policy._10')}</Text>
            <Text style={styles.text}>{t('privacy_policy._11')}</Text>
            <Text style={styles.text}>{t('privacy_policy._12')}</Text>
            <Text style={styles.text}>{t('privacy_policy._13')}</Text>
            <Text style={styles.text}>{t('privacy_policy._14')}</Text>
            <Text style={styles.text}>{t('privacy_policy._15')}</Text>
            <Text style={styles.text}>{t('privacy_policy._16')}</Text>
            <Text style={styles.text}>{t('privacy_policy._17')}</Text>
            <Text style={styles.text}>{t('privacy_policy._18')}</Text>
            <Text style={styles.text}>{t('privacy_policy._19')}</Text>
            <Text style={styles.text}>{t('privacy_policy._20')}</Text>
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
  },
  contentContainer: {
    marginHorizontal: 25,
    marginBottom: 30,
  },
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
  privacy: {
    marginTop: 10,
    marginBottom: 10,
  },
  privacyHeader: {
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
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});

export default PrivacyPolicy;

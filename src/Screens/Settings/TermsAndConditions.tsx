import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <Text style={styles.headerText}>Terms &amp; Conditions</Text>
          <View />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.terms}>
            <Text style={styles.termsHeader}>Agreement To Terms</Text>
            <Text style={styles.textBody}>
              These Terms and Conditions constitute a legally binding agreement
              made between you, whether personally or on behalf of an entity
              (“you”) and [business entity name] (“we,” “us” or “our”),
              concerning your access to and use of the [website name.com]
              website as well as any other media form, media channel, mobile
              website or mobile application related, linked, or otherwise
              connected thereto (collectively, the “Site”).
            </Text>
            <Text style={styles.textBody}>
              You agree that by accessing the Site, you have read, understood,
              and agree to be bound by all of these Terms and Conditions. If you
              do not agree with all of these Terms and Conditions, then you are
              expressly prohibited from using the Site and you must discontinue
              use immediately.
            </Text>
            <Text style={styles.textBody}>
              Supplemental terms and conditions or documents that may be posted
              on the Site from time to time are hereby expressly incorporated
              herein by reference. We reserve the right, in our sole discretion,
              to make changes or modifications to these Terms and Conditions at
              any time and for any reason.
            </Text>
          </View>
          <View style={styles.terms}>
            <Text style={styles.termsHeader}>Intellectual Property Rights</Text>
            <Text style={styles.textBody}>
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics on the Site
              (collectively, the “Content”) and the trademarks, service marks,
              and logos contained therein (the “Marks”) are owned or controlled
              by us or licensed to us, and are protected by copyright and
              trademark laws and various other intellectual property rights and
              unfair competition laws of the United States, foreign
              jurisdictions, and international conventions.
            </Text>
            <Text style={styles.textBody}>
              The Content and the Marks are provided on the Site “AS IS” for
              your information and personal use only. Except as expressly
              provided in these Terms and Conditions, no part of the Site and no
              Content or Marks may be copied, reproduced, aggregated,
              republished, uploaded, posted, publicly displayed, encoded,
              translated, transmitted, distributed, sold, licensed, or otherwise
              exploited for any commercial purpose whatsoever, without our
              express prior written permission.
            </Text>
            <Text style={styles.textBody}>
              Provided that you are eligible to use the Site, you are granted a
              limited license to access and use the Site and to download or
              print a copy of any portion of the Content to which you have
              properly gained access solely for your personal, non-commercial
              use. We reserve all rights not expressly granted to you in and to
              the Site, the Content and the Marks.
            </Text>
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

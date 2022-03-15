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
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Icon name="chevron-back-outline" size={30} onPress={navigateBack} />
          <Text style={styles.headerText}>Privacy Policy</Text>
          <View />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.privacy}>
            <Text style={styles.textBody}>
              This privacy policy describes the personal data collected or
              generated (processed) when you use Nike&apos;s websites (“Sites”)
              and mobile applications (“Apps”). It also explains how your
              personal data is used, shared and protected, what choices you have
              relating to your personal data and how you can contact us.
            </Text>
          </View>
          <View style={styles.privacy}>
            <Text style={styles.privacyHeader}>
              WHO is Responsible for the Processing of Your Personal Data?
            </Text>
            <Text style={styles.textBody}>
              The GlobalDiary App entity responsible for the processing of your
              personal data will depend on how you interact with Appsand where
              you are located in the world. The relevant GlobalDiary entity are
              referred to as “GlobalDiary”, “our”, “we” or “us” in this privacy
              policy. Please review our List of Local Entities for the name of
              the App entity responsible and the appropriate contact
              information.
            </Text>
          </View>
          <View style={styles.privacy}>
            <Text style={styles.privacyHeader}>
              WHAT Personal Data Do We Collect and WHEN?
            </Text>
            <Text style={styles.textBody}>
              We ask you for certain personal data to provide you with the
              products or services you request. For example, when you make
              purchases, contact our consumer services, request to receive
              communications, create an account, participate in our events or
              contests, or use our Sites or Apps. This personal data includes
              your:
            </Text>
            <Text style={styles.text}>
              • contact details including name, email, telephone number and
              shipping, billing address;
            </Text>
            <Text style={styles.text}>
              • login and account information, including screen name, password
              and unique user ID;
            </Text>
            <Text style={styles.text}>
              • personal details including gender, hometown, date of birth and
              purchase history;
            </Text>
            <Text style={styles.text}>
              • payment or credit card information;
            </Text>
            <Text style={styles.text}> • images, photos and videos;</Text>
            <Text style={styles.text}>
              • data on physical characteristics, including weight, height, and
              body measurements (such as estimated stride and shoe/foot
              measurements or apparel size);
            </Text>
            <Text style={styles.text}>
              • fitness activity data provided by you or generated through our
              Sites or Apps (time, duration, distance, location, calorie count,
              pace/stride); or
            </Text>
            <Text style={styles.text}>
              • personal preferences including your wish list as well as
              marketing and cookie preferences.
            </Text>
            <Text style={styles.text}>
              We collect additional personal data from you to enable particular
              features within our Sites and Apps. For example, we request access
              to your phone&apos;s location data to log your run route, your
              contacts to allow you to interact with your friends, your calendar
              to schedule a training plan or your social network credentials to
              post content from an App to a social network. This personal data
              includes your:
            </Text>
            <Text style={styles.text}>
              • movement data from your device&apos;s accelerometer;
            </Text>
            <Text style={styles.text}>
              • photos, audio, contacts and calendar information;
            </Text>
            <Text style={styles.text}>
              • sensor data, including heart rate and (GPS) location data; or
            </Text>
            <Text style={styles.text}>
              • social network information, including credentials and any
              information from your public posts about Nike or your
              communications with us.
            </Text>
            <Text style={styles.text}>
              When interacting with our Sites and Apps, certain data is
              automatically collected from your device or web browser. More
              information about these practices is included in the “Cookies and
              Pixel Tags” section of this privacy policy below. This data
              includes:
            </Text>
            <Text style={styles.text}>
              • Device IDs, call state, network access, storage information and
              battery information; and
            </Text>
            <Text style={styles.text}>
              • Cookies, IP addresses, referrer headers, data identifying your
              web browser and version, and web beacons and tags.
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
  },
  privacy: {
    marginTop: 30,
  },
  privacyHeader: {
    fontWeight: '700',
    fontSize: 17,
  },
  textBody: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PrivacyPolicy;

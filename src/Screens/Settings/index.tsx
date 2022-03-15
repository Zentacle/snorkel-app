import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import GradientBox from '_components/ui/GradientBox';
import Button from '_components/ui/Buttons/Button';

import { accountPages, morePages } from './utils';

import { useAppDispatch } from '_redux/hooks';
import { logoutUser } from '_redux/slices/user';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';
import type { Page } from './utils';

type SettingsTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'Settings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface SettingsTypeProps {
  navigation: SettingsTypeNavigationProps;
}

const Settings: FunctionComponent<SettingsTypeProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navigateBack = () => {
    navigation.navigate('App', {
      screen: 'Profile',
    });
  };

  const navigateToPage = (page: Page) => {
    navigation.navigate(page.component);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="chevron-back-outline" size={30} onPress={navigateBack} />
        <Text style={styles.headerText}>Settings</Text>
        <View />
      </View>
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subscriptionContainer}>
          <GradientBox
            style={styles.subscriptionBox}
            gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
            gradientLocations={[0, 1, 1]}
            start={{
              x: 0,
              y: 0.9,
            }}
            end={{
              x: 1.06,
              y: 3.4,
            }}>
            <View style={styles.subscriptionTextContainer}>
              <Text style={styles.subscriptionMainText}>
                Premium Membership
              </Text>
              <Text style={styles.subscriptionSubtext}>
                Upgrade for more features
              </Text>
            </View>
          </GradientBox>
        </View>
        <View style={styles.pagesSectionContainer}>
          <Text style={styles.pagesLabel}>Account</Text>
          <View>
            {accountPages.map((account, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigateToPage(account)}>
                <View style={styles.pageContainer}>
                  <View style={styles.pageLabelContainer}>
                    <MUIcon name={account.icon} size={30} color="black" />
                    <Text style={styles.pageLabel}>{account.label}</Text>
                  </View>
                  <Icon name="chevron-forward-outline" size={30} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        <View style={styles.pagesSectionContainer}>
          <Text style={styles.pagesLabel}>More</Text>
          <View>
            {morePages.map((page, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigateToPage(page)}>
                <View style={styles.pageContainer}>
                  <View style={styles.pageLabelContainer}>
                    <MUIcon name={page.icon} size={30} color="black" />
                    <Text style={styles.pageLabel}>{page.label}</Text>
                  </View>
                  <Icon name="chevron-forward-outline" size={30} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        <Button
          onPress={handleLogout}
          textGradient
          start={{
            x: 0,
            y: 1,
          }}
          end={{
            x: 0.65,
            y: 0.4,
          }}
          gradientColors={['#AA00FF', '#AA00FF', '#00E0FF']}
          style={{
            container: styles.buttonContainer,
            text: styles.buttonText,
          }}>
          Log Out
        </Button>
      </ScrollView>
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
    marginTop: 20,
    marginBottom: 20,
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
    fontSize: 30,
    fontWeight: '700',
  },
  subscriptionContainer: {
    marginVertical: 20,
  },
  subscriptionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  subscriptionTextContainer: {},
  subscriptionMainText: {
    textAlign: 'left',
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 5,
  },
  subscriptionSubtext: {
    textAlign: 'left',
    color: 'white',
    fontSize: 15,
  },
  pagesSectionContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  pagesLabel: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 5,
  },
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  pageLabel: {
    fontSize: 17,
    marginLeft: 10,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default Settings;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import config from 'react-native-config';

import Button from '_components/ui/Buttons/Button';

import { usePages } from './utils';

import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { logoutUser, selectUser } from '_redux/slices/user';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';
import type { Page } from './utils';
import { isBelowHeightThreshold } from '_utils/constants';

type SettingsTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'Settings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface SettingsTypeProps {
  navigation: SettingsTypeNavigationProps;
}

const Settings: FunctionComponent<SettingsTypeProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { accountPages, morePages } = usePages();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigateToAuth();
  };

  const navigateToAuth = () => {
    navigation.navigate('Auth', {
      screen: 'SignIn',
    });
  };

  const navigateBack = () => {
    navigation.navigate('App', {
      screen: 'Profile',
    });
  };

  const openWebview = () => {
    const uri =
      config.ENVIRONMENT === 'development'
        ? `https://testnets.opensea.io/${user?.wallet_address}`
        : `https://opensea.io/${user?.wallet_address}`;
    navigation.navigate('AppWebview', {
      source: uri,
    });
  };

  const navigateToPage = (page: Page) => {
    navigation.navigate(page.component);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon
          name="chevron-back-outline"
          color="black"
          size={30}
          onPress={navigateBack}
        />
        <Text style={styles.headerText}>{t('SETTINGS')}</Text>
        <View style={{ width: 20 }} />
      </View>
      {!!user?.wallet_address && (
        <Button
          onPress={openWebview}
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
            container: styles.walletButtonContainer,
            text: styles.walletButtonText,
          }}>
          View wallet on OpenSea
        </Button>
      )}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {!!user && (
          <View style={styles.pagesSectionContainer}>
            <Text style={styles.pagesLabel}>{t('ACCOUNT')}</Text>
            <View>
              {accountPages.map((account, index) => {
                if (account.label === t('DIVE_SHOPS') && !user.admin) {
                  return null;
                }
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigateToPage(account)}>
                    <View style={styles.pageContainer}>
                      <View style={styles.pageLabelContainer}>
                        <MUIcon name={account.icon} size={30} color="black" />
                        <Text style={styles.pageLabel}>{account.label}</Text>
                      </View>
                      <Icon
                        name="chevron-forward-outline"
                        color="black"
                        size={30}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </View>
        )}

        <View style={[styles.pagesSectionContainer]}>
          <Text style={styles.pagesLabel}>{t('MORE')}</Text>
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
                  <Icon
                    name="chevron-forward-outline"
                    color="black"
                    size={30}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </ScrollView>
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
        {t('LOG_OUT')}
      </Button>
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
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 25,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
    alignSelf: 'center',
  },
  subscriptionContainer: {
    marginVertical: isBelowHeightThreshold ? 10 : 20,
  },
  pagesSectionContainer: {
    marginTop: isBelowHeightThreshold ? 10 : 15,
    marginBottom: isBelowHeightThreshold ? 8 : 10,
  },
  pagesLabel: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 5,
    color: 'black',
  },
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: isBelowHeightThreshold ? 10 : 15,
  },
  pageLabel: {
    fontSize: 17,
    marginLeft: 10,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 30,
    marginHorizontal: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  walletButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginTop: 30,
    marginBottom: -10,
    marginHorizontal: 25,
  },
  walletButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default Settings;

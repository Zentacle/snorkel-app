import * as React from 'react';
import { Image, StyleSheet, Platform, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import type { AppTabsParamList } from '_utils/interfaces';

import ExploreScreen from '_screens/Explore';
import LogsScreen from '_screens/Logs';
import SearchScreen from '_screens/Search';
import ProfileScreen from '_screens/Profile';
import DiveLogsFormScreen from '_screens/DiveLogsForms';

import GradientCircle from '_components/ui/GradientCircle';

import Home from '_assets/tab-icons/home.png';
import HomeActive from '_assets/tab-icons/home-active.png';
import Logs from '_assets/tab-icons/logs.png';
import LogsActive from '_assets/tab-icons/logs-active.png';
import Profile from '_assets/tab-icons/profile.png';
import ProfileActive from '_assets/tab-icons/profile-active.png';
import Search from '_assets/tab-icons/search.png';
import SearchActive from '_assets/tab-icons/search-active.png';
import { isBelowHeightThreshold } from '_utils/constants';
import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';
import AuthModal from '_components/ui/AuthModal';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '_utils/interfaces';

type AppTabsNavigatorNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'App'
>;

interface AppTabsNavigatorProps {
  navigation: AppTabsNavigatorNavigationProps;
}
const AppTabsNavigator: React.FC<AppTabsNavigatorProps> = ({ navigation }) => {
  const user = useAppSelector(selectUser);
  const protectedroutes = ['/Profile', '/LogsForm'];
  const [authmodalIsVisible, setAuthModalVisible] = React.useState(false);
  const { t } = useTranslation();
  const AppTabs = createBottomTabNavigator<AppTabsParamList>();

  return (
    <>
      {authmodalIsVisible && (
        <AuthModal
          isVisible={authmodalIsVisible}
          subtext={t('REQUIRE_ACCOUNT_SUBTEXT')}
          modalAction={() =>
            navigation.navigate('Auth', {
              screen: 'Landing',
            })
          }
          modalCancelAction={() => setAuthModalVisible(false)}
          cancelActionText={t('CANCEL')}
          actionText={t('LOGIN_OR_SIGNUP')}
        />
      )}
      <AppTabs.Navigator
        initialRouteName="Explore"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarButton: props => {
            // let searchedString = props.to.search
            const isProtectedRoute = protectedroutes.find(route =>
              props.to?.match(route),
            );

            if (isProtectedRoute && !user) {
              delete props.onPress;
              return (
                <Pressable
                  {...props}
                  onPress={() => setAuthModalVisible(true)}
                />
              );
            }
            return <Pressable {...props} />;
          },
        }}>
        <AppTabs.Screen
          options={{
            title: t('EXPLORE'),
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? HomeActive : Home} />
            ),
          }}
          name="Explore"
          component={ExploreScreen}
        />
        <AppTabs.Screen
          options={{
            title: t('SEARCH'),
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? SearchActive : Search} />
            ),
          }}
          name="Search"
          component={SearchScreen}
        />
        <AppTabs.Screen
          options={{
            tabBarStyle: { display: 'none' },
            title: '',
            tabBarIcon: () => (
              <GradientCircle
                style={styles.gradientCircleStyle}
                gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
                gradientLocations={[0.002, 1, 1]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1.06,
                  y: 1.2,
                }}>
                <Icon name="plus" color="#FFF" size={30} />
              </GradientCircle>
            ),
          }}
          name="LogsForm"
          component={DiveLogsFormScreen}
        />
        <AppTabs.Screen
          options={{
            title: t('LOGS'),
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? LogsActive : Logs} />
            ),
          }}
          name="Logs"
          component={LogsScreen}
        />
        <AppTabs.Screen
          options={{
            title: t('PROFILE'),
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? ProfileActive : Profile} />
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </AppTabs.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: isBelowHeightThreshold ? 80 : 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    paddingBottom: 10,
  },
  tabBarLabelStyle: {
    marginTop: Platform.OS === 'ios' ? -15 : -20,
    marginBottom: Platform.OS === 'ios' ? 25 : 10,
    fontSize: 12,
    fontWeight: '400',
  },
  gradientCircleStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginBottom: 5,
    marginTop: 10,
  },
});

export default AppTabsNavigator;

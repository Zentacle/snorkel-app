import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { AppTabsParamList } from '_utils/interfaces';

import ExploreNavigator from './Explore';
import LogsNavigator from './Logs';
import SearchNavigator from './Search';
import ProfileNavigator from './Profile';
import LogsFormNavigator from './DiveLogsForm';

import GradientCircle from '_components/ui/GradientCircle';

import Home from '_assets/tab-icons/home.png';
import HomeActive from '_assets/tab-icons/home-active.png';
import Logs from '_assets/tab-icons/logs.png';
import LogsActive from '_assets/tab-icons/logs-active.png';
import Profile from '_assets/tab-icons/profile.png';
import ProfileActive from '_assets/tab-icons/profile-active.png';
import Search from '_assets/tab-icons/search.png';
import SearchActive from '_assets/tab-icons/search-active.png';

const AppTabsNavigator: React.FC = () => {
  const AppTabs = createBottomTabNavigator<AppTabsParamList>();
  return (
    <AppTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}>
      <AppTabs.Screen
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? HomeActive : Home} />
          ),
        }}
        name="ExploreStack"
        component={ExploreNavigator}
      />
      <AppTabs.Screen
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? SearchActive : Search} />
          ),
        }}
        name="SearchStack"
        component={SearchNavigator}
      />
      <AppTabs.Screen
        options={{
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
        name="LogsFormStack"
        component={LogsFormNavigator}
      />
      <AppTabs.Screen
        options={{
          title: 'Logs',
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? LogsActive : Logs} />
          ),
        }}
        name="LogsStack"
        component={LogsNavigator}
      />
      <AppTabs.Screen
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? ProfileActive : Profile} />
          ),
        }}
        name="ProfileStack"
        component={ProfileNavigator}
      />
    </AppTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    paddingBottom: 10,
  },
  tabBarLabelStyle: {
    marginTop: -15,
    marginBottom: 20,
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
    marginTop: 5,
  },
});

export default AppTabsNavigator;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '_redux/hooks';
import { selectUser, selectAuthToken } from '_redux/slices/user';
import {
  selectOrderedDiveLogs,
  fetchOwnDiveLogs,
  loadOwnDiveLogs,
  selectDiveLogsLoadingState,
} from '_redux/slices/dive-logs';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';

import ProfileDefault from '_assets/profile-placeholder.png';

import LogsList from './components/List';
import EmptyList from '../Logs/components/EmptyList';
import DiveLogSummary from './components/DiveLogSummary';
import { isBelowHeightThreshold } from '_utils/constants';
import ProfileDiveLogs from '_components/reusables/Placeholders/DiveLogs/ProfileDiveLogs';
import MapView, { Marker } from 'react-native-maps';

type ProfileNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'Profile'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ProfileProps {
  navigation: ProfileNavigationProps;
}

const Profile: FunctionComponent<ProfileProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const diveLogs = useAppSelector(selectOrderedDiveLogs);
  const diveLogsIsLoading = useAppSelector(selectDiveLogsLoadingState);
  const authToken = useAppSelector(selectAuthToken);

  const navigateToSettings = () => {
    navigation.navigate('SettingsStack', {
      screen: 'Settings',
    });
  };

  const navigateToProfileSettings = () => {
    navigation.navigate('SettingsStack', {
      screen: 'ProfileSettings',
    });
  };

  React.useEffect(() => {
    dispatch(loadOwnDiveLogs());
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(
        fetchOwnDiveLogs({
          auth_token: authToken as string,
          username: user?.username as string,
        }),
      );
    });
    return unsubscribe;
  }, [navigation, authToken, dispatch, user]);

  const navigateToDiveLog = (diveLogId: number) => {
    navigation.navigate('LogsStack', {
      screen: 'LogDetail',
      params: {
        diveLogId,
      },
    });
  };

  const diveLogsWithLoc = diveLogs.filter(diveLog => diveLog.spot.latitude);

  return (
    <SafeAreaView style={styles.container}>
      <Icon
        style={styles.optionsIcon}
        onPress={navigateToSettings}
        name="options-outline"
        size={30}
        color="black"
      />
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.profileImageContainer}
          onPress={navigateToProfileSettings}>
          {user?.profile_pic ? (
            <Image
              style={styles.profileImage}
              source={{ uri: user.profile_pic }}
            />
          ) : (
            <Image style={styles.profileImage} source={ProfileDefault} />
          )}
          <View style={styles.editContainer}>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </Pressable>
        <Text style={styles.displayName}>{user?.display_name}</Text>

        <DiveLogSummary diveLogs={diveLogs} />
        {diveLogsWithLoc && diveLogsWithLoc.length ? (
          <MapView
            style={{
              height: 150,
              width: '100%',
              borderRadius: 16,
              marginVertical: 16,
            }}
            showsUserLocation={true}
            liteMode={true}
            initialRegion={{
              latitude: diveLogsWithLoc[0].spot.latitude,
              longitude: diveLogsWithLoc[0].spot.longitude,
              latitudeDelta: 100,
              longitudeDelta: 100,
            }}>
            {diveLogsWithLoc.map(diveLog => (
              <Marker
                key={diveLog.id}
                coordinate={{
                  latitude: diveLog.spot.latitude,
                  longitude: diveLog.spot.longitude,
                }}
              />
            ))}
          </MapView>
        ) : (
          <></>
        )}
        {/* <SubscriptionBox /> */}
        {diveLogsIsLoading && !diveLogs.length ? (
          <ProfileDiveLogs />
        ) : (
          <View>
            <Text style={styles.diveLogsLabel}>
              {!!diveLogs.length ? t('DIVE_LOG_PHOTOS') : t('NO_DIVE_LOGS')}
            </Text>
            <View style={styles.photosContainer}>
              {diveLogs.length ? (
                <LogsList
                  navigateToDetail={navigateToDiveLog}
                  diveLogs={diveLogs}
                />
              ) : (
                <EmptyList />
              )}
            </View>
          </View>
        )}
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
    marginTop: 10,
    marginBottom: isBelowHeightThreshold ? 80 : 65,
    paddingBottom: 50,
  },
  text: {
    color: 'black',
    fontSize: isBelowHeightThreshold ? 17 : 18,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  profileImage: {
    width: isBelowHeightThreshold ? 100 : 120,
    height: isBelowHeightThreshold ? 100 : 120,
    borderRadius: isBelowHeightThreshold ? 50 : 60,
  },
  optionsIcon: {
    alignSelf: 'flex-end',
    marginRight: 25,
    marginTop: isBelowHeightThreshold ? 10 : 5,
  },
  displayName: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 25,
    marginVertical: 15,
    color: 'black',
  },
  diveLogsLabel: {
    fontWeight: '500',
    fontSize: 18,
    marginTop: 10,
    color: 'black',
  },
  photosContainer: {
    marginBottom: 10,
  },
  editContainer: {
    alignSelf: 'center',
    backgroundColor: '#0B94EF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    position: 'absolute',
    bottom: -10,
  },
  editText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Profile;

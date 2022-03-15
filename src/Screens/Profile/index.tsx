import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppSelector, useAppDispatch } from '_redux/hooks';
import { selectUser, getCurrentUser } from '_redux/slices/user';
import { selectAllDiveLogs } from '_redux/slices/dive-logs';
import GradientBox from '_components/ui/GradientBox';
import GradientCircle from '_components/ui/GradientCircle';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';

import ProfileDefault from '_assets/profile-placeholder.png';
import LogColor from '_assets/log-color-lar.png';
import Location from '_assets/location-lar.png';
import Clock from '_assets/clock-lar.png';
import LogCarousel from './components/LogCarousel';

type ProfileNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'Profile'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ProfileProps {
  navigation: ProfileNavigationProps;
}

const Profile: FunctionComponent<ProfileProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const navigateToSettings = () => {
    navigation.navigate('SettingsStack', {
      screen: 'Settings',
    });
  };

  const user = useAppSelector(selectUser);
  const diveLogs = Object.values(useAppSelector(selectAllDiveLogs));

  return (
    <SafeAreaView style={styles.container}>
      <Icon
        style={styles.optionsIcon}
        onPress={navigateToSettings}
        name="options-outline"
        size={30}
      />
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          {user?.profile_pic ? (
            <Image
              style={styles.profileImage}
              source={{ uri: user.profile_pic }}
            />
          ) : (
            <Image style={styles.profileImage} source={ProfileDefault} />
          )}
        </View>
        <Text style={styles.displayName}>{user?.display_name}</Text>
        <View style={styles.diveLogSummaryContainer}>
          <GradientBox style={styles.diveLogSummaryGradient}>
            <View style={styles.diveLogSummaryBox}>
              <View style={styles.summary}>
                <View style={styles.summaryItem}>
                  <Image
                    style={{ width: 25, height: 25, marginBottom: 5 }}
                    source={Clock}
                  />
                  <Text style={styles.summaryValue}>1:33:00</Text>
                  <Text style={styles.summaryLabel}>Total Dive Time</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Image
                    style={{ width: 25, height: 25, marginBottom: 5 }}
                    source={LogColor}
                  />
                  <Text style={styles.summaryValue}>12</Text>
                  <Text style={styles.summaryLabel}>Dive Logs</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Image
                    style={{ width: 20, height: 25, marginBottom: 5 }}
                    source={Location}
                  />
                  <Text style={styles.summaryValue}>8</Text>
                  <Text style={styles.summaryLabel}>Visited Sites</Text>
                </View>
              </View>
            </View>
          </GradientBox>
        </View>
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
            <View style={styles.subscriptionIconsContainer}>
              <View style={styles.subscriptionIcon}>
                <GradientCircle
                  style={styles.subscriptionIconGradient}
                  gradientColors={['#622AD9', '#00E0FF', '#00E0FF']}
                  gradientLocations={[0.03, 1, 1]}
                  start={{
                    x: 0.02,
                    y: 0.02,
                  }}
                  end={{
                    x: 1.16,
                    y: 1.0,
                  }}>
                  <MUIcon name="map-legend" size={20} color="white" />
                </GradientCircle>
              </View>
              <View style={styles.subscriptionIcon}>
                <GradientCircle
                  style={styles.subscriptionIconGradient}
                  gradientColors={['#622AD9', '#00E0FF', '#00E0FF']}
                  gradientLocations={[0.02, 1, 1]}
                  start={{
                    x: 0.02,
                    y: 0.02,
                  }}
                  end={{
                    x: 1.16,
                    y: 1.0,
                  }}>
                  <MUIcon name="trending-up" size={20} color="white" />
                </GradientCircle>
              </View>
              <View style={styles.subscriptionIcon}>
                <GradientCircle
                  style={styles.subscriptionIconGradient}
                  gradientColors={['#622AD9', '#00E0FF', '#00E0FF']}
                  gradientLocations={[0.02, 1, 1]}
                  start={{
                    x: 0,
                    y: 0,
                  }}
                  end={{
                    x: 1,
                    y: 1.1,
                  }}>
                  <MUIcon name="watch" size={20} color="white" />
                </GradientCircle>
              </View>
            </View>
          </GradientBox>
        </View>
        <View>
          <Text style={styles.diveLogsLabel}>
            {!!diveLogs.length ? 'Dive Log Photos' : 'No Dive Logs'}
          </Text>
          <View style={styles.photosContainer}>
            <View style={styles.photoContainer}>
              <LogCarousel />
              <Text style={styles.diveLogLabel}>
                USS liberty Wreck on Coral Beach
              </Text>
              <View style={styles.diveLogLinkContainer}>
                <Text style={styles.diveLogLink}>View Dive Log</Text>
                <View style={styles.diveLogDot} />
                <Text style={styles.diveLogDate}>21 Nov 2021</Text>
              </View>
            </View>
            <View style={styles.photoContainer}>
              <LogCarousel />
              <Text style={styles.diveLogLabel}>
                USS liberty Wreck on Coral Beach
              </Text>
            </View>
            <View style={styles.photoContainer}>
              <LogCarousel />
              <Text style={styles.diveLogLabel}>
                USS liberty Wreck on Coral Beach
              </Text>
            </View>
            <View style={styles.photoContainer}>
              <LogCarousel />
              <Text style={styles.diveLogLabel}>
                USS liberty Wreck on Coral Beach
              </Text>
            </View>
          </View>
        </View>
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
    marginBottom: Platform.OS === 'android' ? 100 : 65,
    paddingBottom: 50,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  optionsIcon: {
    alignSelf: 'flex-end',
    marginRight: 25,
  },
  displayName: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 25,
    marginVertical: 15,
  },
  diveLogSummaryContainer: {
    // padding: 2,
    // width: '100%',
  },
  diveLogSummaryGradient: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
  },
  diveLogSummaryBox: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    // height: '100%',
  },
  summary: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 20,
  },
  summaryItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    marginVertical: 3,
  },
  summaryValue: {
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 3,
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
  subscriptionIconsContainer: {
    flexDirection: 'row',
  },
  subscriptionIcon: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionIconGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  diveLogsLabel: {
    fontWeight: '500',
    fontSize: 18,
    marginTop: 10,
  },
  photosContainer: {
    marginBottom: 10,
  },
  photoContainer: {
    marginVertical: 20,
  },
  diveLogLabel: {
    fontWeight: '800',
    fontSize: 17,
    marginTop: 15,
  },
  diveLogLinkContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveLogLink: {
    fontWeight: '700',
    fontSize: 15,
    marginRight: 5,
    color: '#1693D3',
  },
  diveLogDate: {
    marginLeft: 5,
    color: 'grey',
  },
  diveLogDot: {
    marginVertical: 2,
    backgroundColor: 'grey',
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
  },
});

export default Profile;

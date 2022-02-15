import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ImageCarousel from '_components/reusables/ImageCarousel';
import DiveLocation from './components/DiveLocation';
import { capitalize } from '_utils/functions';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, LogsStackParamList } from '_utils/interfaces';

import LocationImage from '_assets/Location.png';
import DescIcon from '_assets/DescIcon.png';
import RatingsGradient from '_components/ui/RatingsGradient';
import { attachIcons } from '_utils/functions';
import ProfileImage from '_assets/Profile.jpg';
import GradientBox from '_components/ui/GradientBox';

type LogNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<LogsStackParamList, 'LogDetail'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type LogRouteProps = RouteProp<LogsStackParamList, 'LogDetail'>;

interface LogProps {
  navigation: LogNavigationProps;
  route: LogRouteProps;
}

const Log: FunctionComponent<LogProps> = ({ navigation, route }) => {
  const diveLog = route.params.diveLog;
  const isAdvancedLog = !!(diveLog.timeInWater && diveLog.maxDepth);
  const coords = {
    latitude: -8.409518,
    longitude: 115.188919,
  };
  const navigateBack = () => {
    navigation.navigate('App', {
      screen: 'Logs',
    });
  };
  const navigateToMap = () => {
    navigation.navigate('ExploreStack', {
      screen: 'Map',
      params: {
        coords: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      },
    });
  };

  const navigateToSimpleLogsForm = () => {
    navigation.navigate('App', {
      screen: 'LogsForm',
      params: {
        diveLogs: diveLog,
      },
    });
  };

  const navigateToAdvancedLogsForm = () => {
    navigation.navigate('LogsFormStack', {
      screen: 'AdvancedDiveLogsForm',
      params: {
        simpleDiveLog: {
          ...diveLog,
          startDate:
            diveLog.startDate &&
            new Date(`${diveLog.startDate} ${diveLog.startTime}`),
          startTime:
            diveLog.startTime &&
            new Date(`${diveLog.startDate} ${diveLog.startTime}`),
        },
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageCarousel goBack={navigateBack} />

        <View style={styles.contentContainer}>
          <Text style={styles.mainDescription}>{diveLog.name}</Text>
          <View style={styles.locationContainer}>
            <Image source={DescIcon} />
            <Text style={styles.locationText}>USS Liberty Wreck on Beach</Text>
          </View>
          <View style={styles.locationContainer}>
            <Image source={LocationImage} />
            <Text style={styles.locationText}>East Bali, Indonesia</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsLevelText}>{diveLog.difficulty}</Text>
            {isAdvancedLog && (
              <>
                <View style={styles.dot} />
                <Text style={styles.ratingsText}>{diveLog.startDate}</Text>
              </>
            )}
          </View>

          <DiveLocation coordinates={coords} navigateToMap={navigateToMap} />

          <View style={styles.note}>
            <View style={styles.noteHeaderContainer}>
              <View style={styles.profile}>
                <Image source={ProfileImage} style={styles.profileImage} />
                <View style={styles.nameSourceContainer}>
                  <Text style={styles.profileName}>Akari</Text>
                  <Text style={styles.noteSource}>Snorkel</Text>
                </View>
              </View>
              <View style={styles.ratingsIconsContainer}>
                {attachIcons(4, 20)}
              </View>
            </View>
            <View style={styles.noteBodyContainer}>
              <Text style={styles.noteBodyText}>{diveLog.note}</Text>
            </View>
          </View>

          {isAdvancedLog && (
            <View style={styles.advancedDiveLogDetailsContainer}>
              <View style={styles.entryContainer}>
                <Text style={styles.entryLabel}>Entry</Text>
                <Text style={styles.entryText}>{diveLog.entry}</Text>
              </View>
              <View style={styles.divingDataContainer}>
                <Text style={styles.headerText}>Diving Data</Text>
                <View style={styles.divingDataBody}>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemLabelContainer}>
                      <Text style={styles.itemText}>{diveLog.maxDepth}</Text>
                      <Text style={styles.measurement}>m</Text>
                    </View>
                    <Text style={styles.itemLabel}>Max Depth</Text>
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemLabelContainer}>
                      <Text style={styles.itemText}>{diveLog.timeInWater}</Text>
                      <Text style={styles.measurement}>min</Text>
                    </View>
                    <Text style={styles.itemLabel}>Duration</Text>
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemLabelContainer}>
                      <Text style={styles.itemText}>{diveLog.weight}</Text>
                      <Text style={styles.measurement}>kg</Text>
                    </View>
                    <Text style={styles.itemLabel}>Weight</Text>
                  </View>
                </View>
              </View>

              <View style={styles.waterAirContainer}>
                <Text style={styles.headerText}>Diving Data</Text>
                <View style={styles.waterAirBody}>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemLabelContainer}>
                      <Text style={styles.itemText}>{diveLog.waterTemp}</Text>
                      <Text style={styles.measurement}>c</Text>
                    </View>
                    <Text style={styles.itemLabel}>Water Temp</Text>
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemLabelContainer}>
                      <Text style={styles.itemText}>{diveLog.visibility}</Text>
                      <Text style={styles.measurement}></Text>
                    </View>
                    <Text style={styles.itemLabel}>Visibility</Text>
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemLabelContainer}>
                      <Text style={styles.itemText}>{diveLog.airTemp}</Text>
                      <Text style={styles.measurement}>c</Text>
                    </View>
                    <Text style={styles.itemLabel}>Air Temp</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divingGearContainer}>
                <Text style={styles.headerText}>Diving Data</Text>
                <View style={styles.divingGearBody}>
                  <View style={styles.divingGearItemContainer}>
                    <View style={styles.divingGearLabelContainer}>
                      <View style={styles.airTankLabelContainer}>
                        <Text style={styles.airTankLabelText}>Air Tank 1</Text>
                      </View>
                      <View style={styles.airTankMeasurementContainer}>
                        <Text style={styles.capacityText}>400 bar</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.airTankTypetext}>
                          {diveLog.nitrox}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.progressContainer}>
                      <GradientBox
                        style={{
                          ...styles.gradientLine,
                          width: `${
                            ((diveLog.airTankStart as number) / 400) * 100
                          }%`,
                        }}
                      />
                    </View>
                    <View style={styles.divingGearValueContainer}>
                      <View style={styles.airTankValuelabelContainer}>
                        <Text style={styles.airTankValueText}>
                          {diveLog.airTankStart}&nbsp;bar
                        </Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.airTankUsedText}>Used</Text>
                      </View>
                      <View style={styles.airTankMeasurementContainer}>
                        <Text style={styles.airTankRemainderText}>
                          {400 - (diveLog.airTankStart || 0)}&nbsp;bar
                        </Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.airTankRemainderLabel}>Left</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.divingGearItemContainer}>
                    <View style={styles.divingGearLabelContainer}>
                      <View style={styles.airTankLabelContainer}>
                        <Text style={styles.airTankLabelText}>Air Tank 2</Text>
                      </View>
                      <View style={styles.airTankMeasurementContainer}>
                        <Text style={styles.capacityText}>400 bar</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.airTankTypetext}>
                          {diveLog.nitrox}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.progressContainer}>
                      <GradientBox
                        style={{
                          ...styles.gradientLine,
                          width: `${
                            ((diveLog.airTankEnd as number) / 400) * 100
                          }%`,
                        }}
                      />
                    </View>
                    <View style={styles.divingGearValueContainer}>
                      <View style={styles.airTankValuelabelContainer}>
                        <Text style={styles.airTankValueText}>
                          {diveLog.airTankEnd}&nbsp;bar
                        </Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.airTankUsedText}>Used</Text>
                      </View>
                      <View style={styles.airTankMeasurementContainer}>
                        <Text style={styles.airTankRemainderText}>
                          {400 - (diveLog.airTankEnd || 0)}&nbsp;bar
                        </Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.airTankRemainderLabel}>Left</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.editLogContainer}>
            <Icon
              onPress={
                isAdvancedLog
                  ? navigateToAdvancedLogsForm
                  : navigateToSimpleLogsForm
              }
              name="pencil-outline"
              color="black"
              size={30}
            />
            <TouchableWithoutFeedback
              onPress={
                isAdvancedLog
                  ? navigateToAdvancedLogsForm
                  : navigateToSimpleLogsForm
              }>
              <Text style={styles.editLogText}>
                {isAdvancedLog
                  ? 'Edit Advanced dive log'
                  : 'Edit Simple dive log'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: Platform.OS === 'android' ? 114 : 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginTop: 25,
    marginHorizontal: 25,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locationText: {
    color: 'black',
    marginLeft: 10,
    width: '80%',
  },
  mainDescription: {
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
  },
  ratingsLevelText: {
    color: '#aa00ff',
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginLeft: 10,
    marginTop: 4,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingsText: {
    color: 'grey',
    marginHorizontal: 5,
    fontSize: 14,
  },
  note: {
    width: '100%',
    minHeight: 150,
    borderRadius: 24,
    padding: 20,
    marginVertical: 1.5,
    borderColor: '#e9e9e9',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  noteHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteBodyContainer: {
    marginTop: 10,
  },
  noteBodyText: {
    color: 'black',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  profileName: {
    color: 'black',
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '700',
  },
  nameSourceContainer: {
    marginLeft: 15,
  },
  noteSource: {
    color: '#FFF',
    backgroundColor: '#0B94EF',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  ratingsIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 2,
  },
  advancedDiveLogDetailsContainer: {
    marginTop: 20,
  },
  entryContainer: {
    backgroundColor: '#fff',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  entryLabel: {
    color: 'grey',
    fontSize: 13,
  },
  entryText: {
    color: 'black',
    marginLeft: 40,
    fontSize: 15,
  },
  divingDataContainer: {
    marginTop: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  divingDataBody: {
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 7,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  measurement: {
    fontSize: 11,
    fontWeight: '500',
    color: 'black',
    marginLeft: 1,
  },
  itemLabelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
    alignSelf: 'center',
  },
  itemLabel: {
    color: 'grey',
    fontSize: 15,
  },
  itemContainer: {},
  waterAirContainer: {
    marginTop: 40,
  },
  waterAirBody: {
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 7,
  },
  divingGearContainer: {
    marginTop: 40,
  },
  divingGearBody: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
  },
  divingGearLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divingGearValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airTankLabelContainer: {},
  airTankLabelText: {
    fontWeight: '500',
    color: 'black',
  },
  airTankMeasurementContainer: {
    flexDirection: 'row',
  },
  capacityText: {
    fontWeight: '600',
    color: 'black',
  },
  airTankTypetext: {},
  divingGearItemContainer: {
    marginVertical: 20,
  },
  divider: {
    marginHorizontal: 5,
    color: 'grey',
  },
  airTankValuelabelContainer: {
    flexDirection: 'row',
  },
  airTankValueText: {
    fontWeight: '500',
    color: 'black',
    fontSize: 12,
  },
  airTankUsedText: {
    color: 'black',
    fontSize: 12,
  },
  airTankRemainderText: {
    fontWeight: '600',
    color: 'black',
    fontSize: 12,
  },
  airTankRemainderLabel: {
    color: 'black',
    fontSize: 12,
  },
  progressContainer: {
    marginVertical: 10,
    height: 20,
    backgroundColor: '#EFF6F9',
    borderRadius: 10,
  },
  gradientLine: {
    height: 20,
    borderRadius: 10,
  },
  editLogContainer: {
    marginTop: 50,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editLogText: {
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    fontSize: 15,
    marginLeft: 10,
  },
});

export default Log;

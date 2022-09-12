import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import ImageCarousel from '_components/reusables/DiveLogImageCarousel';
import DiveLocation from './components/DiveLocation';
import Button from '_components/ui/Buttons/Button';


import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { RootStackParamList, LogsStackParamList } from '_utils/interfaces';

import { attachIcons } from '_utils/functions';
import ProfileImage from '_assets/Profile.jpg';
import GradientBox from '_components/ui/GradientBox';
import NoLog from './components/NoLog';
import DiveLogLoading from '_components/reusables/Placeholders/DiveLogs/DiveLog';
import UnavailableLocationBox from './components/UnavailabbleLocationDetailBox';

import Snorkel from '_assets/scuba_icons/snorkel.svg';
import Location from '_assets/scuba_icons/Location.svg';
import Shop from '_assets/scuba_icons/Shop.svg';
import {
  selectAuthToken,
  selectUser,
} from '_redux/slices/user';
import { useAppSelector, useAppDispatch } from '_redux/hooks';
import {
  selectDiveLogsLoadingState,
  selectActiveDiveLog,
  fetchSingleDiveLog,
} from '_redux/slices/dive-logs';
import NoDiveShop from './components/NoDiveShop';
import DiveShopView from './components/DIveShop';
import DiveShopStampView from './components/DiveShopStamp';
import { DiveShopFull } from '_utils/interfaces/data/shops';
import { isBelowHeightThreshold } from '_utils/constants';

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
  // const [hasLoaded, setHasLoaded] = React.useState(false);
  // const [diveLog, setDiveLog] = React.useState<AdvancedDiveLogReturnValues>();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectDiveLogsLoadingState);
  const diveLog = useAppSelector(selectActiveDiveLog);
  const authToken = useAppSelector(selectAuthToken);

  const airLimit = user?.unit === 'imperial' ? 3400 : 400;

  const loadDiveLog = async () => {
    dispatch(fetchSingleDiveLog(route.params.diveLogId));
  };

  React.useEffect(() => {
    loadDiveLog();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigateBack = () => {
    navigation.navigate('App', {
      screen: 'Logs',
    });
  };

  if (isLoading) {
    return <DiveLogLoading />;
  }

  if (!isLoading && diveLog?.review.id !== route.params.diveLogId) {
    return null;
  }

  if (!isLoading && !diveLog) {
    return <NoLog goBack={navigateBack} />;
  }

  const isAdvancedLog = !!(
    diveLog?.review.dive_length || diveLog?.review.water_temp
  );
  const coords = {
    latitude: diveLog?.spot.latitude || -8.409518,
    longitude: diveLog?.spot.longitude || 115.188919,
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

  if (diveLog) {
    const navigateFromSimpleLogValue = () => {
      navigation.navigate('LogsFormStack', {
        screen: 'AdvancedDiveLogsForm',
        params: {
          diveLog: {
            ...diveLog.review,
            location: {
              lat: diveLog.spot.latitude,
              lng: diveLog.spot.longitude,
              beach_id: diveLog.spot.id,
              desc: diveLog.spot.name,
              location_city: diveLog.spot.location_city,
            },
          },
        },
      });
    };

    const navigateToAdvancedLogsForm = () => {
      navigation.navigate('LogsFormStack', {
        screen: 'AdvancedDiveLogsForm',
        params: {
          diveLog: {
            ...diveLog.review,
            location: {
              lat: diveLog.spot.latitude,
              lng: diveLog.spot.longitude,
              beach_id: diveLog.spot.id,
              desc: diveLog.spot.name,
              location_city: diveLog.spot.location_city,
            },
            startDate:
              diveLog.review.date_dived && new Date(diveLog.review.date_dived),
            startTime:
              diveLog.review.date_dived && new Date(diveLog.review.date_dived),
            dive_shop: diveLog.dive_shop && {
              shop_id: diveLog.dive_shop.id,
              location_city: `${diveLog.dive_shop.city}, ${diveLog.dive_shop?.state}`,
              name: diveLog.dive_shop.name,
            },
          },
        },
      });
    };

    const deleteDiveLog = () => {
      const url = `${config.API_ENDPOINT}/review/delete?review_id=${diveLog.review.id}`;
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      navigateBack()
    }

    const logHasCoordinates = !!(
      diveLog.spot.latitude && diveLog.spot.longitude
    );

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ImageCarousel
            goBack={navigateBack}
            images={diveLog.review.images}
            shareUrl={`https://zentacle.com/dive-log/${diveLog.review.id}`}
          />

          <View style={styles.contentContainer}>
            <Text style={styles.mainDescription}>{diveLog.review.title}</Text>
            <View style={styles.locationContainer}>
              <Snorkel width={15} />
              <Text style={styles.locationText}>{diveLog.spot.name}</Text>
            </View>
            <View style={styles.locationContainer}>
              <Location width={15} />
              <Text style={styles.locationText}>
                {diveLog.spot.location_city}
              </Text>
            </View>
            {diveLog.dive_shop?.name && (
              <View style={styles.diveShopContainer}>
                <Shop width={15} />
                <Text style={styles.diveShopText}>
                  {diveLog.dive_shop?.name}
                </Text>
              </View>
            )}
            <View style={styles.ratingsContainer}>
              <Text style={styles.ratingsLevelText}>
                {diveLog.review.difficulty}
              </Text>
              {isAdvancedLog && (
                <>
                  <View style={styles.dot} />
                  <Text style={styles.ratingsText}>
                    {new Date(
                      diveLog.review.date_dived as string,
                    ).toDateString()}
                  </Text>
                </>
              )}
            </View>

            {logHasCoordinates ? (
              <DiveLocation
                coordinates={coords}
                navigateToMap={navigateToMap}
              />
            ) : (
              <UnavailableLocationBox desc={diveLog.spot.name} />
            )}

            <View style={styles.note}>
              <View style={styles.noteHeaderContainer}>
                <View style={styles.profile}>
                  {diveLog.review.user?.profile_pic ? (
                    <Image
                      source={{ uri: diveLog.review.user.profile_pic }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Image source={ProfileImage} style={styles.profileImage} />
                  )}
                  <View style={styles.nameSourceContainer}>
                    <Text style={styles.profileName}>
                      {diveLog.review.user?.first_name}
                    </Text>
                    <View style={styles.noteSourceContainer}>
                      <Text style={styles.noteSource}>
                        {diveLog.review.activity_type}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.ratingsIconsContainer}>
                  {attachIcons(diveLog.review.rating, 20)}
                </View>
              </View>
              <View style={styles.noteBodyContainer}>
                <Text style={styles.noteBodyText}>{diveLog.review.text}</Text>
              </View>
            </View>

            {isAdvancedLog && (
              <View style={styles.advancedDiveLogDetailsContainer}>
                <View style={styles.entryContainer}>
                  <Text style={styles.entryLabel}>{t('ENTRY')}</Text>
                  <Text style={styles.entryText}>{diveLog.review.entry}</Text>
                </View>
                <View style={styles.divingDataContainer}>
                  <Text style={styles.headerText}>{t('DIVING_DATA')}</Text>
                  <View style={styles.divingDataBody}>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemLabelContainer}>
                        <Text style={styles.itemText}>
                          {diveLog.review.max_depth}
                        </Text>
                        <Text style={styles.measurement}>
                          {user?.unit === 'imperial' ? 'ft' : 'm'}
                        </Text>
                      </View>
                      <Text style={styles.itemLabel}>{t('MAX_DEPTH')}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemLabelContainer}>
                        <Text style={styles.itemText}>
                          {diveLog.review.dive_length}
                        </Text>
                        <Text style={styles.measurement}>min</Text>
                      </View>
                      <Text style={styles.itemLabel}>{t('DURATION')}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemLabelContainer}>
                        <Text style={styles.itemText}>
                          {diveLog.review.weight}
                        </Text>
                        <Text style={styles.measurement}>
                          {user?.unit === 'imperial' ? 'lb' : 'kg'}
                        </Text>
                      </View>
                      <Text style={styles.itemLabel}>{t('WEIGHT')}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.waterAirContainer}>
                  <Text style={styles.headerText}>{t('DIVING_DATA')}</Text>
                  <View style={styles.waterAirBody}>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemLabelContainer}>
                        <Text style={styles.itemText}>
                          {diveLog.review.water_temp}
                        </Text>
                        <Text style={styles.measurement}>
                          {user?.unit === 'imperial' ? 'f' : 'c'}
                        </Text>
                      </View>
                      <Text style={styles.itemLabel}>{t('WATER_TEMP')}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemLabelContainer}>
                        <Text style={styles.itemText}>
                          {diveLog.review.visibility}
                        </Text>
                        <Text style={styles.measurement}></Text>
                      </View>
                      <Text style={styles.itemLabel}>{t('VISIBILITY')}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemLabelContainer}>
                        <Text style={styles.itemText}>
                          {diveLog.review.air_temp}
                        </Text>
                        <Text style={styles.measurement}>
                          {user?.unit === 'imperial' ? 'f' : 'c'}
                        </Text>
                      </View>
                      <Text style={styles.itemLabel}>{t('AIR_TEMP')}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divingGearContainer}>
                  <Text style={styles.headerText}>{t('DIVING_DATA')}</Text>
                  <View style={styles.divingGearBody}>
                    <View style={styles.divingGearItemContainer}>
                      <View style={styles.divingGearLabelContainer}>
                        <View style={styles.airTankLabelContainer}>
                          <Text style={styles.airTankLabelText}>
                            {t('AIR_TANK')}
                          </Text>
                        </View>
                        <View style={styles.airTankMeasurementContainer}>
                          <Text style={styles.capacityText}>
                            {diveLog.review.start_air}{' '}
                            {user?.unit === 'imperial' ? 'psi' : 'bar'}
                          </Text>
                          <Text style={styles.divider}>|</Text>
                          <Text style={styles.airTankTypetext}>
                            {diveLog.review.air_type}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.progressContainer}>
                        <GradientBox
                          style={{
                            ...styles.gradientLine,
                            width: `${((diveLog.review.end_air as number) /
                                (diveLog.review.start_air as number)) *
                              100
                              }%`,
                          }}
                        />
                      </View>
                      <View style={styles.divingGearValueContainer}>
                        <View style={styles.airTankValuelabelContainer}>
                          <Text style={styles.airTankValueText}>
                            {(diveLog.review.start_air || airLimit) -
                              (diveLog.review.end_air || 0)}
                            &nbsp;
                            {user?.unit === 'imperial' ? 'psi' : 'bar'}
                          </Text>
                          <Text style={styles.divider}>|</Text>
                          <Text style={styles.airTankUsedText}>
                            {t('USED')}
                          </Text>
                        </View>
                        <View style={styles.airTankMeasurementContainer}>
                          <Text style={styles.airTankRemainderText}>
                            {diveLog.review.end_air || 0}&nbsp;
                            {user?.unit === 'imperial' ? 'psi' : 'bar'}
                          </Text>
                          <Text style={styles.divider}>|</Text>
                          <Text style={styles.airTankRemainderLabel}>
                            {t('LEFT')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {isAdvancedLog ? (
              <View style={styles.editLogContainer}>
                <Icon
                  onPress={
                    isAdvancedLog
                      ? navigateToAdvancedLogsForm
                      : navigateFromSimpleLogValue
                  }
                  name="pencil-outline"
                  color="black"
                  size={30}
                />
                <TouchableWithoutFeedback onPress={navigateToAdvancedLogsForm}>
                  <Text style={styles.editLogText}>Edit dive log</Text>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View style={styles.editLogContainer}>
                <Button
                  onPress={navigateFromSimpleLogValue}
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
                    container: styles.buttonContainer,
                    text: styles.buttonText,
                  }}>
                  Add weight, air, etc
                </Button>
              </View>
            )}

            <View style={styles.editLogContainer}>
              <Icon
                onPress={deleteDiveLog}
                name="trash-can"
                color="black"
                size={30}
              />
              <TouchableWithoutFeedback onPress={deleteDiveLog}>
                <Text style={styles.editLogText}>Delete dive log</Text>
              </TouchableWithoutFeedback>
            </View>

            {Object.keys(diveLog.dive_shop as DiveShopFull).length ? (
              diveLog.dive_shop?.stamp_uri ? (
                <DiveShopStampView
                  diveShop={diveLog.dive_shop as DiveShopFull}
                  dateDived={diveLog.review.date_dived as string}
                />
              ) : (
                <DiveShopView diveShop={diveLog.dive_shop as DiveShopFull} />
              )
            ) : (
              <NoDiveShop loadDiveLog={loadDiveLog} diveLog={diveLog} />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  // unlikely to hit here, but has to return something other thasn undefined
  return null;
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
    minHeight: 80,
    borderRadius: 24,
    paddingTop: 10,
    marginVertical: 1.5,
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
    textAlign: 'justify',
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
  noteSourceContainer: {
    backgroundColor: '#0B94EF',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  noteSource: {
    color: '#FFF',
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
  airTankTypetext: {
    color: 'black',
  },
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
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editLogText: {
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    fontSize: 15,
    marginLeft: 10,
    color: 'black',
  },
  diveShopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  diveShopText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  buttonContainer: {
    borderRadius: 12,
    paddingVertical: isBelowHeightThreshold ? 12 : 16,
    marginHorizontal: 0,
    marginVertical: isBelowHeightThreshold ? 10 : 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default Log;

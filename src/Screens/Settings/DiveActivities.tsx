import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';

import GradientCircle from '_components/ui/GradientCircle';
import ActivityImage from '_assets/Activity.png';
import GradientBox from '_components/ui/GradientBox';

import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { updateSettings, selectSettings } from '_redux/slices/settings';

type DiveActivitiesTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'DiveActivities'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface DiveActivitiesTypeProps {
  navigation: DiveActivitiesTypeNavigationProps;
}

const WIDTH = Dimensions.get('window').width;

interface ActivityTypes {
  name: string;
}

const DiveActivities: FunctionComponent<DiveActivitiesTypeProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);

  const activityTypes: ActivityTypes[] = [
    {
      name: t('FREEDIVING'),
    },
    {
      name: t('SCUBA'),
    },
    {
      name: t('SNORKEL'),
    },
  ];

  const navigateBack = () => {
    navigation.goBack();
  };

  const submitForm = (val: string) => {
    dispatch(
      updateSettings({
        activityType: val,
      }),
    );
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
          <Text style={styles.headerText}>{t('DIVE_ACTIVITIES')}</Text>
          <View />
        </View>

        <View style={styles.mainContainer}>
          <GradientCircle
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
            <Image source={ActivityImage} />
          </GradientCircle>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionMainText}>
              {t('activity_type.DESCRIPTION_MAIN_TEXT')}
            </Text>
            <Text style={styles.descriptionSubText}>
              {t('activity_type.DESCRIPTION_SUB_TEXT')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.selectionContainer}>
        {activityTypes.map((activityType, index) => {
          if (settings.activityType === activityType.name) {
            return (
              <View style={styles.selectedShadow} key={index}>
                <GradientBox style={styles.selectedActivity}>
                  <View style={styles.selectBox}>
                    <View style={styles.selectedActivityCircle}>
                      <GradientCircle style={styles.selectedGradient} />
                    </View>
                    <Text style={styles.activityText}>{activityType.name}</Text>
                  </View>
                </GradientBox>
              </View>
            );
          }
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => submitForm(activityType.name)}>
              <View style={styles.activity}>
                <View style={styles.normalActivityCircle}></View>
                <Text style={styles.activityText}>{activityType.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
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
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: 45,
    alignItems: 'center',
    marginTop: 30,
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
    color: 'black',
  },
  descriptionContainer: {
    marginTop: WIDTH < 400 ? WIDTH * 0.07 : WIDTH * 0.08,
    marginHorizontal: 5,
  },
  descriptionSubText: {
    color: '#AAA',
    textAlign: 'center',
    fontSize: 16,
  },
  descriptionMainText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: WIDTH < 400 ? WIDTH * 0.07 : WIDTH * 0.08,
  },
  selectionContainer: {
    marginHorizontal: 25,
    marginTop: WIDTH * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selectedShadow: {
    borderRadius: 12,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    minWidth: '25%',
  },
  selectedActivity: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  activityText: {
    marginRight: WIDTH < 380 ? 10 : 25,
    marginLeft: 15,
    marginBottom: 10,
    color: 'black',
    fontSize: WIDTH < 380 ? 13 : 14,
  },
  normalActivityCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  selectedActivityCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradient: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activity: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
    minWidth: '25%',
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
});

export default DiveActivities;

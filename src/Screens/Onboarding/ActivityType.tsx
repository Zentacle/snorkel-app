import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  OnboardingStackParamList,
} from '_utils/interfaces';

import GradientCircle from '_components/ui/GradientCircle';
import ActivityImage from '_assets/Activity.png';
import GradientText from '_components/ui/GradientText';
import { useAppDispatch } from '_redux/hooks';
import { updateSettings } from '_redux/slices/settings';
import { sendEvent } from '_utils/functions/amplitude';

const WIDTH = Dimensions.get('window').width;

type ActivityTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'ActivityType'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ActivityTypeProps {
  navigation: ActivityTypeNavigationProps;
}

interface ActivityTypes {
  name: string;
}

const ActivityType: FunctionComponent<ActivityTypeProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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

  const navigateToRecentDiveLogForm = () => {
    navigation.navigate('AddRecentDiveLog');
  };

  const submitForm = (val: string) => {
    dispatch(
      updateSettings({
        activityType: val,
      }),
    );
    navigateToRecentDiveLogForm();
  };

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'onboarding__activity',
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={navigateToRecentDiveLogForm}>
        <View style={styles.skipContainer}>
          <Text style={styles.skipText}>{t('SKIP')}</Text>
        </View>
      </TouchableWithoutFeedback>
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
      <View style={styles.selectionContainer}>
        {activityTypes.map((activityType, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => submitForm(activityType.name)}>
            <View style={styles.selection}>
              <GradientText
                gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 0.06,
                  y: 1.8,
                }}
                gradientLocations={[0.01, 1, 1]}
                style={styles.selectionText}>
                {activityType.name}
              </GradientText>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  mainContainer: {
    marginHorizontal: 55,
    alignItems: 'center',
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
  },
  selection: {
    width: (WIDTH - 60) / 3,
    height: WIDTH < 400 ? 65 : 70,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
  },
  selectionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  selectionLabel: {
    color: 'black',
  },
  skipContainer: {
    marginHorizontal: 35,
    marginVertical: WIDTH * 0.15,
  },
  skipText: {
    textAlign: 'right',
    fontSize: 18,
    color: 'grey',
  },
});

export default ActivityType;

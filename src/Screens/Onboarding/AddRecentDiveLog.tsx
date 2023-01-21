import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { Form, Field } from 'react-final-form';
import validate from 'validate.js';
import config from 'react-native-config';
import Purchases from 'react-native-purchases';

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
import LocationAutocompleteModal from '_screens/DiveLogsForms/components/LocationAutocompleteModal';
import SimpleFormDiveLocation from '_screens/DiveLogsForms/components/SimpleFormDiveLocation';
import Button from '_components/ui/Buttons/Button';
import { sendEvent } from '_utils/functions/amplitude';

import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

import type { FormApi } from 'final-form';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').width;

type AddRecentDiveLogNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'AddRecentDiveLog'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface AddRecentDiveLogProps {
  navigation: AddRecentDiveLogNavigationProps;
}

type Location =
  | {
      lat: number;
      lng: number;
      desc: string;
    }
  | null
  | undefined;

interface InitialValues {
  location: Location;
}

const AddRecentDiveLog: FunctionComponent<AddRecentDiveLogProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  let formRef = React.useRef<FormApi>();
  const [proVerified, verifyIsPro] = React.useState(false);

  const user = useAppSelector(selectUser);

  const [autocompleteModalOpen, toggleAutocompleteModal] =
    React.useState(false);

  const openLocationModal = () => {
    toggleAutocompleteModal(true);
  };

  const closeLocationModal = () => {
    toggleAutocompleteModal(false);
  };

  const checkSubscription = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    if (
      customerInfo.entitlements.active[
        config.REVENUE_CAT_ENTITLEMENT_IDENTIFIER
      ]?.isActive
    ) {
      verifyIsPro(true);
    }
  };

  const constraints = {};

  const initialValues: InitialValues = {
    location: undefined,
  };

  const navigateToDiveLogForm = (location: Location) => {
    navigation.push('App', {
      screen: 'LogsForm',
      params: {
        location,
      },
    });
  };

  const skip = () => {
    if (proVerified || user?.has_pro) {
      navigation.navigate('App', {
        screen: 'Explore',
      });
    } else {
      navigation.push('ProUpsellLast');
    }
  };

  React.useEffect(() => {
    checkSubscription();
  }, []);

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'onboarding__dive_log',
    });
  }, []);

  React.useEffect(() => {
    const location = formRef.current?.getFieldState('location')?.value;
    const isValidLocation = !!(
      location &&
      location.lat &&
      location.lng &&
      location.desc
    );
    if (isValidLocation) {
      navigateToDiveLogForm(location);
    }
  });

  const handleSkip = () => {
    sendEvent('skip_onboarding', {
      screen: 'dive_log',
    });
    skip();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        validate={values => validate(values, constraints)}
        onSubmit={() => {}}
        initialValues={initialValues}
        render={({ values, form }) => {
          formRef.current = form;

          return (
            <>
              <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={handleSkip}>
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
                      Where was your most recent dive?
                    </Text>
                    <Text style={styles.descriptionSubText}>
                      Let's log your first dive to get your profile set up
                    </Text>
                  </View>
                </View>

                <View style={styles.diveShopContainer}>
                  <Field
                    name="location"
                    isVisible={autocompleteModalOpen}
                    component={LocationAutocompleteModal}
                    closeModal={closeLocationModal}
                  />

                  <View style={styles.diveShopLabelContainer}></View>
                  {values.location?.desc ? (
                    <SimpleFormDiveLocation
                      coordinates={{
                        latitude: values.location.lat,
                        longitude: values.location.lng,
                      }}
                      desc={values.location.desc}
                      location_city={values.location.location_city}
                      onClickEdit={openLocationModal}
                    />
                  ) : (
                    <View>
                      <Text style={styles.headerLabel}>
                        {t('DIVE_LOCATION')}
                      </Text>
                      <Pressable onPress={openLocationModal}>
                        <View style={styles.subContainer}>
                          <Pressable onPress={openLocationModal}>
                            <GradientCircle style={styles.iconContainer}>
                              <IOIcon
                                name="location-outline"
                                size={25}
                                color="white"
                              />
                            </GradientCircle>
                          </Pressable>
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
                            style={styles.actionText}>
                            {t('ADD_LOCATION')}
                          </GradientText>
                        </View>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.footer}>
                <Button
                  onPress={() =>
                    navigateToDiveLogForm(values.location as Location)
                  }
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
                  Log Dive
                </Button>
              </View>
            </>
          );
        }}
      />
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
  skipContainer: {
    marginHorizontal: 35,
    marginVertical: 16,
  },
  skipText: {
    textAlign: 'right',
    fontSize: 18,
    color: 'grey',
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
  diveShopContainer: {
    marginTop: 20,
    marginHorizontal: 25,
  },
  optionaltext: {
    color: '#aa00ff',
  },
  diveShopLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diveShopValuesContainer: {
    height: 130,
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  diveShopValuesTextContainer: {
    marginLeft: 10,
    maxWidth: '50%',
  },
  diveShopName: {
    fontWeight: '600',
    fontSize: 15,
  },
  diveShopLocation: {
    fontSize: 13,
    color: 'grey',
  },
  diveShopIcon: {
    marginRight: 10,
  },
  subContainer: {
    height: 130,
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actionText: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '600',
  },
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: HEIGHT < 400 ? 14 : 16,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    marginHorizontal: 25,
    marginBottom: 10,
  },
});

export default AddRecentDiveLog;

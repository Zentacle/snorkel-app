import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import GradientText from '_components/ui/GradientText';
import GradientCircle from '_components/ui/GradientCircle';
import RatingsInputComp from '_components/ui/RatingsInputComp';
import SelectWGradientBorder from '_components/ui/SelectWGradientBorderV2';
import LocationAutocompleteModal from '_screens/DiveLogsForms/components/LocationAutocompleteModal';
import SimpleFormDiveLocation from '_screens/DiveLogsForms/components/SimpleFormDiveLocation';

import UnavailableLocationBox from '_screens/DiveLogsForms/components/UnavailableLocationBox';
import type { FunctionComponent } from 'react';
import { isBelowHeightThreshold } from '_utils/constants';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';
import { capitalize } from '_utils/functions';
import { sendEvent } from '_utils/functions/amplitude';

interface LocationAndImageProps {
  location?: {
    lat: number;
    lng: number;
    desc: string;
    location_city: string;
  };
}

const Location: FunctionComponent<LocationAndImageProps> = ({
  location,
}) => {
  const { t } = useTranslation();
  const activity = [
    t('SCUBA').toLowerCase(),
    t('FREEDIVING').toLowerCase(),
    t('SNORKEL').toLowerCase(),
  ];

  const [autocompleteModalOpen, toggleAutocompleteModal] =
    React.useState(false);

  const openLocationModal = () => {
    toggleAutocompleteModal(true);
  };

  const closeLocationModal = () => {
    toggleAutocompleteModal(false);
  };

  const isValidLocation = !!(
    location &&
    location.lat &&
    location.lng &&
    location.desc
  );

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'dive_log__location',
    });
  }, []);

  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Field
        name="location"
        isVisible={autocompleteModalOpen}
        component={LocationAutocompleteModal}
        closeModal={closeLocationModal}
      />

      {isValidLocation ? (
        <SimpleFormDiveLocation
          coordinates={{
            latitude: location.lat,
            longitude: location.lng,
          }}
          desc={location.desc}
          location_city={location.location_city}
          onClickEdit={openLocationModal}
        />
      ) : !isValidLocation && location?.desc ? (
        <UnavailableLocationBox
          desc={location.desc}
          location_city={location.location_city}
          onClickEdit={openLocationModal}
          showEdit
        />
      ) : (
        <View>
          <Text style={styles.headerLabel}>{t('DIVE_LOCATION')}</Text>
          <Pressable onPress={openLocationModal}>
            <View style={styles.subContainer}>
              <Pressable onPress={openLocationModal}>
                <GradientCircle style={styles.iconContainer}>
                  <IOIcon name="location-outline" size={25} color="white" />
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

      <View style={styles.activityContentContainer}>
        <Text style={styles.headerLabel}>{t('DIVE_ACTIVITY')}</Text>
        <Field
          name="activity_type"
          component={SelectWGradientBorder}
          options={activity}
          activeComponent={ActiveComponent}
          inactiveComponent={InactiveComponent}
        />
      </View>

      <View style={styles.activityContentContainer}>
        <Text style={styles.headerLabel}>{capitalize(t('RATING'))}</Text>
        <Field name="rating" component={RatingsInputComp} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 25,
    marginBottom: isBelowHeightThreshold ? 30 : 0,
  },
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
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
  activityContentContainer: {
    marginTop: 30,
  },
  optionaltext: {
    color: '#aa00ff',
  },
});

export default Location;

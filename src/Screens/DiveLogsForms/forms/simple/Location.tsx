import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';

import GradientText from '_components/ui/GradientText';
import GradientCircle from '_components/ui/GradientCircle';
import LocationAutocompleteModal from '_screens/DiveLogsForms/components/LocationAutocompleteModal';
import SimpleFormDiveLocation from '_screens/DiveLogsForms/components/SimpleFormDiveLocation';

import UnavailableLocationBox from '_screens/DiveLogsForms/components/UnavailableLocationBox';
import type { FunctionComponent } from 'react';
import ImagePickerArray from '_screens/DiveLogsForms/components/ImagePickerArray';
import { isBelowHeightThreshold } from '_utils/constants';

interface LocationAndImageProps {
  location?: {
    lat: number;
    lng: number;
    desc: string;
    location_city: string;
  };
}

const Location: FunctionComponent<LocationAndImageProps> = ({ location }) => {
  const { t } = useTranslation();
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

  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
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

      <FieldArray
        name="images"
        component={ImagePickerArray}
        // containerStyle={styles.searchInputContainer}
        // withFilterIcon
        // handleInputFocus={handleInputFocus}
        // onClickFilterIcon={() => navigateToFilters(values)}
      />
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
});

export default Location;

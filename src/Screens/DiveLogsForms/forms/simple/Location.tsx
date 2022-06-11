import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import GradientText from '_components/ui/GradientText';
import GradientCircle from '_components/ui/GradientCircle';
import LocationAutocompleteModal from '_screens/DiveLogsForms/components/LocationAutocompleteModal';
import SimpleFormDiveLocation from '_screens/DiveLogsForms/components/SimpleFormDiveLocation';
import DiveShopAutocompleteModal from '_screens/DiveLogsForms/components/DiveShopAutocompleteModal';

import UnavailableLocationBox from '_screens/DiveLogsForms/components/UnavailableLocationBox';
import type { FunctionComponent } from 'react';
import ImagePickerArray from '_screens/DiveLogsForms/components/ImagePickerArray';
import { isBelowHeightThreshold } from '_utils/constants';
import { DiveShop } from '_utils/interfaces/data/logs';

interface LocationAndImageProps {
  location?: {
    lat: number;
    lng: number;
    desc: string;
    location_city: string;
  };
  dive_shop?: DiveShop;
}

const Location: FunctionComponent<LocationAndImageProps> = ({
  location,
  dive_shop,
}) => {
  const { t } = useTranslation();
  const [autocompleteModalOpen, toggleAutocompleteModal] =
    React.useState(false);

  const openLocationModal = () => {
    toggleAutocompleteModal(true);
  };

  const closeLocationModal = () => {
    toggleAutocompleteModal(false);
  };

  const [diveShopAutocompleteModalOpen, toggleDiveShopAutocompleteModal] =
    React.useState(false);

  const openDiveShopModal = () => {
    toggleDiveShopAutocompleteModal(true);
  };

  const closeDiveShopModal = () => {
    toggleDiveShopAutocompleteModal(false);
  };

  const isValidLocation = !!(
    location &&
    location.lat &&
    location.lng &&
    location.desc
  );

  const isValidDiveShop = !!(
    dive_shop &&
    dive_shop.shop_id &&
    dive_shop.name &&
    dive_shop.location_city
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
      <Field
        name="dive_shop"
        isVisible={diveShopAutocompleteModalOpen}
        component={DiveShopAutocompleteModal}
        closeModal={closeDiveShopModal}
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

      <View style={styles.diveShopContainer}>
        <View style={styles.diveShopLabelContainer}>
          <Text style={styles.headerLabel}>{t('DIVE_SHOP')}</Text>
          <Text style={styles.optionaltext}>{t('OPTIONAL')}</Text>
        </View>
        {isValidDiveShop ? (
          <View style={styles.diveShopValuesContainer}>
            <MUIcon
              style={styles.diveShopIcon}
              name="store-outline"
              size={40}
              color="black"
            />
            <View style={styles.diveShopValuesTextContainer}>
              <Text style={styles.diveShopName}>{dive_shop.name}</Text>
              <Text style={styles.diveShopLocation}>
                {dive_shop.location_city}
              </Text>
            </View>
          </View>
        ) : (
          <Pressable onPress={openDiveShopModal}>
            <View style={styles.subContainer}>
              <Pressable onPress={openDiveShopModal}>
                <GradientCircle style={styles.iconContainer}>
                  <MUIcon name="store-outline" size={25} color="white" />
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
                {t('ADD_DIVE_SHOP')}
              </GradientText>
            </View>
          </Pressable>
        )}
      </View>
      <FieldArray name="images" component={ImagePickerArray} />
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
  diveShopContainer: {
    marginTop: 20,
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
});

export default Location;

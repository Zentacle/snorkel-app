import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';

import GradientCircle from '_components/ui/GradientCircle';
import GradientText from '_components/ui/GradientText';

import FormManagementInput from '_components/ui/FormManagementInput';
import SelectWGradientBorder from '_components/ui/SelectWGradientBorderV2';
import RatingsInputComp from '_components/ui/RatingsInputComp';
import ImagePickerArray from '_screens/DiveLogsForms/components/ImagePickerArray';
import SelectWGradientBorderForPrivacy from '_components/SelectWGradientborderForPrivacy';

import type { FunctionComponent } from 'react';
import type { AdvancedFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';
import LocationAutocompleteModal from '_screens/DiveLogsForms/components/LocationAutocompleteModal';
import DiveShopAutocompleteModal from '_screens/DiveLogsForms/components/DiveShopAutocompleteModal';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';
import Snorkel from '_assets/scuba_icons/snorkel.svg';
import Location from '_assets/scuba_icons/Location.svg';

interface BasicInfoProps {
  values: InitialValues;
}

const BasicInfo: FunctionComponent<BasicInfoProps> = ({ values }) => {
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

  const levels = [
    t('BEGINNER').toLowerCase(),
    t('INTERMEDIATE').toLowerCase(),
    t('ADVANCED').toLowerCase(),
  ];

  const activity = [
    t('SCUBA').toLowerCase(),
    t('FREEDIVING').toLowerCase(),
    t('SNORKEL').toLowerCase(),
  ];

  const privacy = [
    t('DIVE_LOG_PUBLIC').toLowerCase(),
    t('DIVE_LOG_PRIVATE').toLowerCase(),
  ];

  const locationHasCoordinates =
    values.location && values.location.lat && values.location.lng;

  const isValidDiveShop = !!(
    values.dive_shop &&
    values.dive_shop.shop_id &&
    values.dive_shop.name &&
    values.dive_shop.location_city
  );

  return (
    <View style={styles.container}>
      <View>
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
        <Text style={styles.headerLabel}>{t('DIVE_SITE_LOCATION')}</Text>
        <View style={styles.mapContainer}>
          {values.location && locationHasCoordinates && (
            <MapView
              style={styles.map}
              scrollEnabled={false}
              liteMode={true}
              initialRegion={{
                latitude: values.location.lat,
                longitude: values.location.lng,
                latitudeDelta: 0.0121,
                longitudeDelta: 0.2122,
              }}>
              <Marker
                coordinate={{
                  latitude: values.location.lat,
                  longitude: values.location.lng,
                }}
              />
            </MapView>
          )}

          <View />
          <View style={styles.mapDescriptionContainer}>
            <View style={styles.mapTextContainer}>
              <View style={styles.mapTextItem}>
                <View style={styles.mapTextImageContainer}>
                  <Snorkel width={15} />
                </View>
                <Text style={styles.mapText}>{values.location?.desc}</Text>
              </View>
              <View style={styles.mapTextItem}>
                <View style={styles.mapTextImageContainer}>
                  <Location width={15} />
                </View>
                <Text style={styles.mapText}>
                  {values.location?.location_city}
                </Text>
              </View>
            </View>
            <View style={styles.mapIconContainer}>
              <MAIcon
                onPress={openLocationModal}
                name="pencil-outline"
                color="black"
                size={30}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.diveShopContainer}>
        <View style={styles.diveShopLabelContainer}>
          <Text style={styles.headerLabel}>{t('DIVE_SHOP')}</Text>
          <Text style={styles.optionaltext}>{t('OPTIONAL')}</Text>
        </View>
        {isValidDiveShop ? (
          <Pressable
            style={state => ({
              opacity: state.pressed ? 0.7 : 1,
            })}
            onPress={openDiveShopModal}>
            <View style={styles.diveShopValuesContainer}>
              <MAIcon
                style={styles.diveShopIcon}
                name="store-outline"
                size={40}
                color="black"
              />
              <View style={styles.diveShopValuesTextContainer}>
                <Text style={styles.diveShopName}>
                  {values.dive_shop?.name}
                </Text>
                <Text style={styles.diveShopLocation}>
                  {values.dive_shop?.location_city}
                </Text>
              </View>
            </View>
          </Pressable>
        ) : (
          <Pressable
            style={state => ({
              opacity: state.pressed ? 0.7 : 1,
            })}
            onPress={openDiveShopModal}>
            <View style={styles.subContainer}>
              <Pressable onPress={openDiveShopModal}>
                <GradientCircle style={styles.iconContainer}>
                  <MAIcon name="store-outline" size={25} color="white" />
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

      <View style={styles.mediaContainer}>
        <FieldArray name="images" component={ImagePickerArray} />
      </View>

      <View style={styles.notesContainer}>
        <View style={styles.inputContentLabel}>
          <Text style={styles.headerLabel}>{t('NOTE')}</Text>
          <View style={styles.optionalContainer}>
            <Text style={styles.optionaltext}>{t('UP_TO_100_CHARS')}</Text>
          </View>
        </View>
        <View>
          <Field
            name="text"
            component={FormManagementInput}
            placeholder={t('WRITE_NOTE')}
            style={styles.notesInput}
            containerStyle={styles.inputContainer}
            maxLength={1000}
            multiline
          />
        </View>
      </View>

      <View style={styles.ratingContentContainner}>
        <Text style={styles.headerLabel}>{t('RATING')}</Text>
        <View style={styles.ratingContainer}>
          <Field name="rating" component={RatingsInputComp} />
        </View>
      </View>

      <View style={styles.privacyContentContainer}>
        <Text style={styles.headerLabel}>{t('DIVE_LOG_PRIVACY_TEXT')}</Text>
        <Field
          name="privacy"
          component={SelectWGradientBorderForPrivacy}
          options={privacy}
          activeComponent={ActiveComponent}
          inactiveComponent={InactiveComponent}
        />
      </View>

      <View style={styles.levelContentContainer}>
        <Text style={styles.headerLabel}>{t('LEVEL_OF_DIFFICULTY')}</Text>
        <Field
          name="difficulty"
          component={SelectWGradientBorder}
          options={levels}
          activeComponent={ActiveComponent}
          inactiveComponent={InactiveComponent}
        />
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 25,
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
    color: 'black',
  },
  mediaContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  optionalContainer: {},
  optionaltext: {
    color: '#aa00ff',
  },
  mediaContentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    marginTop: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '60%',
    borderRadius: 18,
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  mapDescriptionContainer: {
    position: 'absolute',
    top: '60%',
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapTextContainer: {},
  mapTextItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapTextImageContainer: {
    width: 20,
  },
  mapText: {
    marginLeft: 10,
    color: 'black',
  },
  mapIconContainer: {
    marginRight: 20,
  },
  inputContentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 0,
    paddingHorizontal: 10,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  notesContainer: {
    marginTop: 10,
  },
  notesInput: {
    minHeight: Platform.OS === 'android' ? 60 : 120,
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 5,
    color: 'black',
  },
  ratingContentContainner: {
    marginTop: 30,
  },
  ratingContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  star: {},
  starLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  levelContentContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  activityContentContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  privacyContentContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  diveShopContainer: {
    marginTop: 20,
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

export default BasicInfo;

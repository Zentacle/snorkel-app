import React from 'react';
import type { FunctionComponent } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import GradientText from '_components/ui/GradientText';
import GradientCircle from '_components/ui/GradientCircle';
import SelectWGradientBorder from '_components/ui/SelectWGradientBorderV2';
import SelectWGradientBorderForPrivacy from '_components/SelectWGradientborderForPrivacy';
import {
  ActiveComponent,
  InactiveComponent,
} from '_utils/form/gradient-selection';
import { sendEvent } from '_utils/functions/amplitude';
import { DiveShopSearchResult } from '_utils/interfaces/data/logs';
import FMInput from '_components/ui/FormManagementInput';
import DiveShopAutocompleteModal from '_screens/DiveLogsForms/components/DiveShopAutocompleteModal';
import ImagePickerArray from '_screens/DiveLogsForms/components/ImagePickerArray';
import { handleGetDiveShop } from '_redux/slices/dive-shops/api';

interface SimpleDetailProps {
  dive_shop_id: number;
  dive_shop?: DiveShopSearchResult;
}

const Rating: FunctionComponent<SimpleDetailProps> = props => {
  const [dive_shop, setDiveShop] = React.useState<
    DiveShopSearchResult | undefined
  >(props.dive_shop);
  const { t } = useTranslation();
  const levels = [
    t('BEGINNER').toLowerCase(),
    t('INTERMEDIATE').toLowerCase(),
    t('ADVANCED').toLowerCase(),
  ];

  const privacy = [
    t('DIVE_LOG_PUBLIC').toLowerCase(),
    t('DIVE_LOG_PRIVATE').toLowerCase(),
  ];

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'dive_log__simple_details',
    });
  }, []);

  const [diveShopAutocompleteModalOpen, toggleDiveShopAutocompleteModal] =
    React.useState(false);

  const closeDiveShopModal = () => {
    toggleDiveShopAutocompleteModal(false);
  };

  const openDiveShopModal = () => {
    toggleDiveShopAutocompleteModal(true);
  };

  React.useEffect(() => {
    if (!dive_shop && props.dive_shop_id) {
      const getDiveShop = async () => {
        const shop = (await handleGetDiveShop(props.dive_shop_id)).data;
        setDiveShop({
          shop_id: shop.id,
          location_city: shop.city,
          name: shop.name,
        });
      };
      getDiveShop();
    }
  }, [props.dive_shop_id, dive_shop]);

  React.useEffect(() => {
    setDiveShop(props.dive_shop);
  }, [props.dive_shop]);

  const isValidDiveShop = !!(
    dive_shop &&
    dive_shop.shop_id &&
    dive_shop.name &&
    dive_shop.location_city
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Field
        name="dive_shop"
        isVisible={diveShopAutocompleteModalOpen}
        component={DiveShopAutocompleteModal}
        closeModal={closeDiveShopModal}
      />

      <View>
        <View style={styles.notesContentLabel}>
          <Text style={styles.headerLabel}>{t('NOTE')}</Text>
          <View style={styles.optionalContainer}>
            <Text style={styles.optionaltext}>{t('UP_TO_100_CHARS')}</Text>
          </View>
        </View>
        <View>
          <Field
            name="text"
            component={FMInput}
            placeholder={t('WRITE_NOTE')}
            style={styles.input}
            containerStyle={styles.inputContainer}
            maxLength={1000}
            multiline
          />
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
          activeComponent={ActiveComponent}
          inactiveComponent={InactiveComponent}
          options={levels}
        />
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
          </Pressable>
        ) : (
          <Pressable
            style={state => ({
              opacity: state.pressed ? 0.7 : 1,
            })}
            onPress={openDiveShopModal}>
            <View style={styles.subContainer}>
              <GradientCircle style={styles.iconContainer}>
                <MUIcon name="store-outline" size={25} color="white" />
              </GradientCircle>
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  actionText: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '600',
  },
  container: {
    marginTop: 30,
    marginHorizontal: 25,
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
  diveShopContainer: {
    marginTop: 30,
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
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  levelContentContainer: {
    marginTop: 30,
  },
  privacyContentContainer: {
    marginTop: 30,
  },
  optionalContainer: {},
  optionaltext: {
    color: '#aa00ff',
    fontSize: 12,
  },
  notesContentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 0,
    paddingHorizontal: 10,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'flex-start',
  },
  input: {
    minHeight: Platform.OS === 'android' ? 40 : 120,
    fontSize: 16,
    paddingTop: Platform.OS === 'android' ? 5 : 12,
    paddingBottom: 5,
    color: 'black',
    justifyContent: 'flex-start',
  },
  subContainer: {
    height: 130,
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Rating;

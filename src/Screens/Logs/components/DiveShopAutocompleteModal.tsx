import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  FlatList,
  Keyboard,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import debounce from 'lodash/debounce';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { stringify } from 'qs';

import type { FunctionComponent } from 'react';
import PlainSearchInput from '_components/ui/PlainSearchInput';
import { handleTypeAhead } from '_redux/slices/dive-shops/api';
import { DiveShopTypeaheadResponse } from '_utils/interfaces/data/shops';

import LocationImage from '_assets/LocationLargish.png';
import { isBelowHeightThreshold } from '_utils/constants';
import { handleUpdateDiveLog } from '_redux/slices/dive-logs/api';
import { useAppSelector } from '_redux/hooks';
import { selectAuthToken } from '_redux/slices/user';
import { AdvancedFormInitialValues } from '_utils/interfaces/data/logs';
interface BaseProps {
  isVisible: boolean;
  closeModal: () => void;
  reset?: () => void;
  diveLogId: number;
  loadDiveLog(): Promise<void>;
  locationId: number;
}

type ModalWFinalFormProps = BaseProps;

const HEIGHT = Dimensions.get('window').height;

const DiveShopAutocompleteModal: FunctionComponent<ModalWFinalFormProps> = ({
  isVisible,
  closeModal,
  diveLogId,
  loadDiveLog,
  locationId,
}) => {
  const authToken = useAppSelector(selectAuthToken);
  const { t } = useTranslation();
  const [text, changeText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<
    DiveShopTypeaheadResponse[]
  >([]);

  const makeRequest = React.useMemo(
    () =>
      debounce(async (val: string) => {
        const queryObj = {
          query: val,
          beach_only: 'True',
        };
        const queryString = stringify(queryObj);
        const response = await handleTypeAhead(queryString);

        if (response.data) {
          setSuggestions(response.data);
        }
      }, 500),
    [],
  );

  const handleTextChange = (val: string) => {
    if (val.trim().length) {
      changeText(val);
      makeRequest(val);
    } else {
      changeText(val);
      setSuggestions([]);
    }
  };

  const setPlace = async (place: DiveShopTypeaheadResponse) => {
    changeText(place.text);
    setSuggestions([]);
    Keyboard.dismiss();
    setLoading(true);
    await handleUpdateDiveLog(
      {
        id: diveLogId,
        dive_shop_id: place.id,
        beach_id: locationId,
      } as AdvancedFormInitialValues,
      authToken as string,
    );

    await loadDiveLog();
    setLoading(false);
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setSuggestions([]);
  };

  const _renderItem = (item: { item: DiveShopTypeaheadResponse }) => {
    return (
      <Pressable
        onPress={() => setPlace(item.item)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#cecece' : 'transparent',
          },
        ]}>
        <View style={styles.resultContainer}>
          <Image source={LocationImage} />
          <View style={styles.placeContainer}>
            <Text style={styles.place}>{item.item.text}</Text>
            <Text style={styles.placeSubText}>{item.item.subtext}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const _keyExtractor = (item: any) => item.id;

  return (
    <Modal visible={isVisible} onRequestClose={closeModal} style={styles.modal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon
            name="chevron-back-outline"
            size={30}
            style={{ marginRight: 10 }}
            onPress={handleCloseModal}
            color="black"
          />
          <PlainSearchInput
            onChange={handleTextChange}
            value={text}
            containerStyle={styles.inputCompContainer}
            style={styles.search}
            placeholder={t('DIVE_SHOP_PLACEHOLDER')}
            placeholderTextColor="grey"
            autoFocus
          />
          {loading && (
            <ActivityIndicator size="small" style={{ marginLeft: 10 }} />
          )}
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            data={suggestions}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6F9',
    flex: 1,
  },
  listContainer: {
    marginBottom: 100,
  },
  modal: {},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEIGHT * 0.04,
    borderBottomColor: '#A9BEBF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    paddingHorizontal: isBelowHeightThreshold ? 15 : 25,
    paddingBottom: 20,
  },
  inputCompContainer: {
    paddingVertical: 8,
    borderRadius: 18,
  },
  searchLabel: {
    marginLeft: 15,
    color: 'grey',
    fontSize: 17,
  },
  search: {
    color: 'black',
    fontSize: 16,
    minWidth: isBelowHeightThreshold ? '65%' : '70%',
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryTextsContainer: {
    marginLeft: 15,
  },
  countryMainText: {
    fontSize: 15,
    color: 'grey',
  },
  searchText: {
    fontSize: 15,
    color: 'black',
    marginBottom: 2,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 25,
  },
  placeContainer: {
    marginLeft: 15,
  },
  place: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  placeSubText: {
    color: 'grey',
    fontSize: 13,
  },
});

export default DiveShopAutocompleteModal;

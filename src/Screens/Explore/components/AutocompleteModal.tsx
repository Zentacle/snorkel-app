import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
import { stringify } from 'qs';

import type { FunctionComponent } from 'react';
import type { FieldRenderProps } from 'react-final-form';
import PlainSearchInput from '_components/ui/PlainSearchInput';

import { handleTypeAhead } from '_redux/slices/search/api';
import { TypeaheadResponse } from '_utils/interfaces/data/search';

import LocationImage from '_assets/LocationLargish.png';
import FlagImage from '_assets/Flag.png';
import { isBelowHeightThreshold } from '_utils/constants';

interface BaseProps {
  isVisible: boolean;
  closeModal: () => void;
  reset: () => void;
  navigateToDiveSite: (id: number) => void;
}
type FinalFormProps = FieldRenderProps<string, any>;

type ModalWFinalFormProps = BaseProps & FinalFormProps;

const HEIGHT = Dimensions.get('window').height;

const AutocompleteModal: FunctionComponent<ModalWFinalFormProps> = ({
  isVisible,
  closeModal,
  input: { onChange },
  navigateToDiveSite,
}) => {
  const { t } = useTranslation();
  const [text, changeText] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<TypeaheadResponse[]>([]);
  const [loading, setLoading] = React.useState(false);

  const makeRequest = debounce(async (val: string) => {
    const queryObj = {
      query: val,
    };
    const queryString = stringify(queryObj);
    const response = await handleTypeAhead(queryString);
    if (response.data) {
      setSuggestions(response.data);
      setLoading(false);
    }
  });

  const handleTextChange = (val: string) => {
    if (val.trim().length) {
      setLoading(true);
      changeText(val);
      makeRequest(val);
    } else {
      changeText(val);
      setSuggestions([]);
      setLoading(false);
    }
  };

  const handleNavigationToDiveSite = (diveSiteId: number) => {
    navigateToDiveSite(diveSiteId);
    handleCloseModal();
  };

  const setPlace = async (place: string) => {
    changeText(place);
    setSuggestions([]);
    setLoading(true);
    Keyboard.dismiss();
    onChange(place);
    setLoading(false);
    closeModal();
  };

  const handleCloseModal = () => {
    onChange('');
    closeModal();
    setLoading(false);
    setSuggestions([]);
    changeText('');
  };

  const _renderItem = (item: { item: TypeaheadResponse }) => {
    return (
      <Pressable onPress={() => setPlace(item.item.text)}>
        <View style={styles.resultContainer}>
          {item.item.type === 'site' ? (
            <>
              <Image source={LocationImage} />
              <Pressable
                onPress={() => handleNavigationToDiveSite(item.item.id)}>
                <View style={styles.placeContainer}>
                  <Text style={styles.place}>{item.item.text}</Text>
                  <Text style={styles.placeSubText}>{item.item.subtext}</Text>
                </View>
              </Pressable>
            </>
          ) : (
            <>
              <Image source={FlagImage} />
              <View style={styles.placeContainer}>
                <Text style={styles.place}>{item.item.text}</Text>
                <Text style={styles.placeSubText}>{item.item.subtext}</Text>
              </View>
            </>
          )}
        </View>
      </Pressable>
    );
  };

  const _keyExtractor = (item: any) => item.url;

  return (
    <Modal visible={isVisible} onRequestClose={closeModal} style={styles.modal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <PlainSearchInput
            onChange={handleTextChange}
            value={text}
            containerStyle={styles.inputCompContainer}
            style={styles.search}
            placeholder="Search"
            placeholderTextColor="#BFBFBF"
            autoFocus
          />
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.searchBar}>
              <Text style={styles.searchLabel}>{t('CANCEL')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              keyExtractor={_keyExtractor}
              renderItem={_renderItem}
              data={suggestions}
              keyboardShouldPersistTaps="always"
            />
          </View>
        )}
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
    marginHorizontal: 25,
    marginTop: 10,
  },
  modal: {},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEIGHT * 0.04,
    borderBottomColor: '#A9BEBF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  inputCompContainer: {
    paddingVertical: isBelowHeightThreshold ? 5 : 10,
    borderRadius: 18,
  },
  searchLabel: {
    marginLeft: 15,
    color: 'grey',
    fontSize: 17,
  },
  searchBar: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  search: {
    color: 'black',
    fontSize: 16,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  placeContainer: {
    marginLeft: 15,
  },
  place: {
    color: 'black',
    fontSize: 15,
  },
  placeSubText: {
    color: 'grey',
  },
});

export default AutocompleteModal;

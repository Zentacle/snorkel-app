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
import Config from 'react-native-config';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';
import type { FieldRenderProps } from 'react-final-form';
import PlainSearchInput from '_components/ui/PlainSearchInput';

import LocationImage from '_assets/LocationLargish.png';
import FlagImage from '_assets/Flag.png';
import { isBelowHeightThreshold } from '_utils/constants';

interface BaseProps {
  isVisible: boolean;
  closeModal: () => void;
  reset: () => void;
}
type FinalFormProps = FieldRenderProps<string, any>;

interface PlaceSuggestion {
  place_id: string;
  description: string;
}

type ModalWFinalFormProps = BaseProps & FinalFormProps;

const HEIGHT = Dimensions.get('window').height;

const AutocompleteModal: FunctionComponent<ModalWFinalFormProps> = ({
  isVisible,
  closeModal,
  input: { onChange },
}) => {
  const { t } = useTranslation();
  const [text, changeText] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = React.useState(false);

  const makeRequest = debounce(async (val: string) => {
    const uri = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      val,
    )}&types=geocode&language=en&key=${Config.GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(uri).then(resp => resp.json());
    if (response.status === 'OK') {
      setSuggestions(response.predictions);
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

  const setPlace = async (place: string) => {
    changeText(place);
    setSuggestions([]);
    setLoading(true);
    Keyboard.dismiss();
    onChange(place);
    setLoading(false);
    closeModal();
  };

  const splitCountry = (input: string) => {
    const inputArray = input.split(',');
    return inputArray[inputArray.length - 1].trim();
  };

  const handleCloseModal = () => {
    onChange('');
    closeModal();
    setLoading(false);
    setSuggestions([]);
    changeText('');
  };

  const _renderItem = (item: { item: PlaceSuggestion }) => {
    return (
      <Pressable onPress={() => setPlace(item.item.description)}>
        <View style={styles.resultContainer}>
          <Image source={LocationImage} />
          <View style={styles.placeContainer}>
            <Text style={styles.place}>{item.item.description}</Text>
            <Text style={styles.placeSubText}>Subtext</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const _keyExtractor = (item: any) => item.place_id;

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
          />
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <Text style={styles.searchLabel}>{t('CANCEL')}</Text>
          </TouchableWithoutFeedback>
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <View style={styles.listContainer}>
            {!!suggestions.length && (
              <View style={styles.countryContainer}>
                <Image source={FlagImage} />
                <View style={styles.countryTextsContainer}>
                  <Text style={styles.searchText}>{text}</Text>
                  <Text style={styles.countryMainText}>
                    {splitCountry(suggestions[0].description)}
                  </Text>
                </View>
              </View>
            )}
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
  search: {
    color: 'black',
    fontSize: 16,
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

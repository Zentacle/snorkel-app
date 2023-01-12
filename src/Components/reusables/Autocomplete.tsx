import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Pressable,
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

interface BaseProps {}
type FinalFormProps = FieldRenderProps<string, any>;

interface PlaceSuggestion {
  place_id: string;
  description: string;
}

type AutocompleteWfinalProps = BaseProps & FinalFormProps;

const HEIGHT = Dimensions.get('window').height;

const Autocomplete: FunctionComponent<AutocompleteWfinalProps> = ({
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
  };

  const splitCountry = (input: string) => {
    const inputArray = input.split(',');
    return inputArray[inputArray.length - 1].trim();
  };

  const handleCloseModal = () => {
    setLoading(false);
    setSuggestions([]);
    changeText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <PlainSearchInput
          onChange={handleTextChange}
          value={text}
          containerStyle={styles.inputCompContainer}
          style={styles.search}
          placeholder="Search"
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

          {suggestions.map((suggestion: PlaceSuggestion) => (
            <Pressable
              key={suggestion.place_id}
              onPress={() => setPlace(suggestion.description)}>
              <View style={styles.resultContainer}>
                <Image source={LocationImage} />
                <View style={styles.placeContainer}>
                  <Text style={styles.place}>{suggestion.description}</Text>
                  <Text style={styles.placeSubText}>Subtext</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    paddingVertical: 10,
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

export default Autocomplete;

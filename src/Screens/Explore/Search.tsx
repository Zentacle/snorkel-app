import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
import { stringify } from 'qs';
import { SharedElement } from 'react-navigation-shared-element';

import { handleTypeAhead } from '_redux/slices/search/api';
import {
  TypeaheadResponse,
  LocationSearchInitialValues,
} from '_utils/interfaces/data/search';

import PlainSearchInput from '_components/ui/PlainSearchInput';
import LocationImage from '_assets/LocationLargish.png';
import FlagImage from '_assets/Flag.png';
import { isBelowHeightThreshold } from '_utils/constants';

import { useAppDispatch } from '_redux/hooks';
import { search } from '_redux/slices/search';

import type { FunctionComponent } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type {
  RootStackParamList,
  ExploreStackParamList,
} from '_utils/interfaces';

const HEIGHT = Dimensions.get('window').height;

type SearchNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ExploreStackParamList, 'DiveSite'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface SearchProps {
  navigation: SearchNavigationProps;
}

const Search: FunctionComponent<SearchProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [text, changeText] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<TypeaheadResponse[]>([]);

  const makeRequest = React.useMemo(
    () =>
      debounce(async (val: string) => {
        const queryObj = {
          query: val,
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

  // const setPlace = async (place: string) => {
  //   changeText(place);
  //   setSuggestions([]);
  //   Keyboard.dismiss();
  // };

  const handleCancelSearch = () => {
    setSuggestions([]);
    changeText('');
    navigation.goBack();
  };

  const handleNavigationToDiveSite = (id: number) => {
    navigation.push('ExploreStack', {
      screen: 'DiveSite',
      params: {
        diveSpotId: id,
      },
    });
  };

  const handleNavigationToSearchResults = async (
    values: LocationSearchInitialValues,
  ) => {
    await dispatch(search(values));
    navigation.navigate('SearchStack', {
      screen: 'SearchResults',
      params: {
        search: values,
      },
    });
  };

  const handleClearInput = () => {
    changeText('');
    setSuggestions([]);
  };

  const _renderItem = (item: { item: TypeaheadResponse }) => {
    return item.item.type === 'site' ? (
      <Pressable
        onPress={() => handleNavigationToDiveSite(item.item.id)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#cecece' : 'transparent',
          },
        ]}>
        <View style={styles.resultContainer}>
          <View style={styles.resultItemContainer}>
            <Image source={LocationImage} />
            <View style={styles.placeContainer}>
              <Text style={styles.place}>{item.item.text}</Text>
              <Text style={styles.placeSubText}>{item.item.subtext}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    ) : (
      <Pressable
        onPress={() =>
          handleNavigationToSearchResults({ search_term: item.item.text })
        }>
        <View style={styles.resultContainer}>
          <View style={styles.resultItemContainer}>
            <Image source={FlagImage} />
            <View style={styles.placeContainer}>
              <Text style={styles.place}>{item.item.text}</Text>
              <Text style={styles.placeSubText}>{item.item.subtext}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const _keyExtractor = (item: any) => `${item.id}_${item.url}`;

  return (
    <View style={styles.container}>
      <SharedElement id="beach.search">
        <View style={styles.searchContainer}>
          <PlainSearchInput
            onChange={handleTextChange}
            value={text}
            containerStyle={styles.inputCompContainer}
            style={styles.search}
            placeholder="Search"
            placeholderTextColor="#BFBFBF"
            autoFocus
            enableClearInput
            handleClearInput={handleClearInput}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={handleCancelSearch}>
            <View style={styles.searchBar}>
              <Text style={styles.searchLabel}>{t('CANCEL')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SharedElement>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          data={suggestions}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6F9',
    flex: 1,
    paddingTop: 20,
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
  },
  search: {
    color: 'black',
    fontSize: 16,
    width: '60%',
  },
  resultContainer: {
    paddingHorizontal: 25,
    marginVertical: 16,
  },
  resultItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

Search.sharedElements = () => {
  return [
    {
      id: 'beach.search',
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

export default Search;

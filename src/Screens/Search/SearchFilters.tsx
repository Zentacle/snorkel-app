import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Field, Form } from 'react-final-form';
import Icon from 'react-native-vector-icons/Ionicons';
import get from 'lodash/get';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { FormApi } from 'final-form';
import type {
  RootStackParamList,
  SearchStackParamList,
} from '_utils/interfaces';

import type { InitialSearchValues } from '_utils/interfaces/data/search';

import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';
import SelectWGradientBorder from '_components/ui/SelectWGradientBoder';
import SliderComp from '_components/ui/Slider';
import Button from '_components/ui/Buttons/Button';

type SearchFiltersNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SearchStackParamList, 'SearchFilters'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type SearchFiltersRouteProps = RouteProp<SearchStackParamList, 'SearchFilters'>;

interface SearchFiltersProps {
  navigation: SearchFiltersNavigationProps;
  route: SearchFiltersRouteProps;
}

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const preferences = ['Scuba', 'Free', 'Snorkel'];
const entries = ['Shore', 'Boat'];

const ActiveComponent = (level: string) => (
  <View style={styles.selectedShadow}>
    <GradientBox style={styles.selectedLevel}>
      <View style={styles.selectBox}>
        <View style={styles.selectedLevelCircle}>
          <GradientCircle style={styles.selectedGradient} />
        </View>
        <Text style={styles.levelText}>{level}</Text>
      </View>
    </GradientBox>
  </View>
);

const InactiveComponent = (level: string) => (
  <View style={styles.level}>
    <View style={styles.normalLevelCircle} />
    <Text style={styles.levelText}>{level}</Text>
  </View>
);

const EntryActiveComp = (entry: string) => (
  <View style={styles.selectedShadow}>
    <GradientBox style={styles.selectedLevel}>
      <View style={styles.selectBox}>
        <View style={styles.selectedLevelCircle}>
          <GradientCircle style={styles.selectedGradient} />
        </View>
        <Text style={styles.levelText}>{entry}</Text>
      </View>
    </GradientBox>
  </View>
);

const EntryInctiveComp = (entry: string) => {
  const index = entries.findIndex(item => item === entry);
  return (
    <View
      style={[
        styles.level,
        index === 0 ? { marginRight: 15 } : { marginLeft: 15 },
      ]}>
      <View style={styles.normalLevelCircle}></View>
      <Text style={styles.levelText}>{entry}</Text>
    </View>
  );
};

const SearchFilters: FunctionComponent<SearchFiltersProps> = ({
  navigation,
  route,
}) => {
  const passedInLocationValues: InitialSearchValues = get(
    route,
    'params.search',
    {},
  );

  let formRef = React.useRef<FormApi>();

  const initialValues: InitialSearchValues = {
    difficulty: 'Beginner',
    preference: 'Scuba',
    entry: 'Shore',
    maxDepth: 18,
    ...passedInLocationValues,
  };

  /**
   * since initial state is passed in from navigation params,
   * resetting the form without modifying navigation params
   * will not change anything.
   * Besides, we only want to change one value instead of resetting
   * the entire form.
   */
  const resetFiltersFromNav = () => {
    navigation.setParams({
      search: {},
    });
    formRef.current?.reset();
  };

  const navigatebackToSearch = () => {
    navigation.goBack();
  };

  const navigateToResults = (values: InitialSearchValues) => {
    navigation.navigate('SearchStack', {
      screen: 'SearchResults',
      params: {
        search: values,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        onSubmit={() => {}}
        initialValues={initialValues}
        render={({ form, values }) => {
          formRef.current = form;
          return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <Icon
                  onPress={navigatebackToSearch}
                  name="chevron-back-outline"
                  color="black"
                  size={30}
                />
                <Text style={styles.headerMainText}>Filter</Text>
                <TouchableWithoutFeedback onPress={resetFiltersFromNav}>
                  <Text style={styles.headerRightText}>Reset</Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.formBodyContainer}>
                <View style={styles.divePreferenceContentContainer}>
                  <Text style={styles.headerLabel}>
                    Dive activity preferences
                  </Text>
                  <Field
                    name="preference"
                    component={SelectWGradientBorder}
                    activeComponent={ActiveComponent}
                    inactiveComponent={InactiveComponent}
                    options={preferences}
                  />
                </View>

                <View style={styles.levelContentContainer}>
                  <Text style={styles.headerLabel}>Level of difficulty</Text>
                  <Field
                    name="difficulty"
                    component={SelectWGradientBorder}
                    activeComponent={ActiveComponent}
                    inactiveComponent={InactiveComponent}
                    options={levels}
                  />
                </View>

                <View style={styles.diveActivityContentContainer}>
                  <Text style={styles.headerLabel}>Entry</Text>
                  <Field
                    name="entry"
                    component={SelectWGradientBorder}
                    options={entries}
                    activeComponent={EntryActiveComp}
                    inactiveComponent={EntryInctiveComp}
                    style={styles.entryContainer}
                  />
                </View>

                <View style={styles.maxDepthContainer}>
                  <Field
                    name="maxDepth"
                    label="Max Depth. Ft"
                    component={SliderComp}
                    trackMarks={[
                      0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
                    ]}
                    benchMarks={[0, 250, 500]}
                    minimumValue={0}
                    maximumValue={500}
                  />
                </View>

                <Button
                  onPress={() => navigateToResults(values)}
                  gradient
                  gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
                  gradientLocations={[0.01, 1, 1]}
                  start={{
                    x: 0,
                    y: 0,
                  }}
                  end={{
                    x: 0.06,
                    y: 2.2,
                  }}
                  style={{
                    container: styles.buttonContainer,
                    text: styles.buttonText,
                  }}>
                  Show (32 results)
                </Button>
              </View>
            </ScrollView>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6F9',
    flex: 1,
  },
  contentContainer: {
    marginTop: 20,
    marginHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerMainText: {
    fontSize: 28,
    fontWeight: '800',
  },
  headerRightText: {
    fontSize: 18,
  },
  formBodyContainer: {
    marginTop: 40,
  },
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  divePreferenceContentContainer: {},
  levelContentContainer: {
    marginTop: 40,
  },
  level: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
    minWidth: '30%',
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  selectedShadow: {
    minWidth: '30%',
    borderRadius: 12,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  selectedLevel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  levelText: {
    marginRight: 25,
    marginLeft: 15,
    marginBottom: 10,
  },
  normalLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  selectedLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradient: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  entryContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveActivityContentContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  maxDepthContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 0,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default SearchFilters;

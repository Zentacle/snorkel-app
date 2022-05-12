import React, { Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';

import GradientCircle from '_components/ui/GradientCircle';
import MeasurementImage from '_assets/Measurement.png';
import GradientText from '_components/ui/GradientText';
import GradientBox from '_components/ui/GradientBox';

import { capitalize } from '_utils/functions';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { selectUser, updateUser } from '_redux/slices/user';
import type { MeasurementUnit } from '_utils/interfaces/data/user';

type TypeUnitsTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'TypeUnits'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface TypeUnitsTypeProps {
  navigation: TypeUnitsTypeNavigationProps;
}

const WIDTH = Dimensions.get('window').width;

const TypeUnits: FunctionComponent<TypeUnitsTypeProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const navigateBack = () => {
    navigation.goBack();
  };

  const submitForm = async (val: MeasurementUnit) => {
    await dispatch(
      updateUser({
        unit: val,
      }),
    );
  };

  interface MeasurementTypesForView {
    name: MeasurementUnit;
    types: string[];
  }

  const measurementTypes: MeasurementTypesForView[] = [
    {
      name: t('IMPERIAL'),
      types: ['ft', 'lb', 'psi', 'f'],
    },
    {
      name: t('METRIC'),
      types: ['m', 'kg', 'bar', 'C'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Icon
            name="chevron-back-outline"
            size={30}
            color="black"
            onPress={navigateBack}
          />
          <Text style={styles.headerText}>{t('TYPE_UNITS')}</Text>
          <View />
        </View>

        <View style={styles.mainContainer}>
          <GradientCircle
            gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
            gradientLocations={[0.002, 1, 1]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1.06,
              y: 1.2,
            }}>
            <Image source={MeasurementImage} />
          </GradientCircle>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionMainText}>
              {t('TYPE_UNITS_MAIN_TEXT')}
            </Text>
            <Text style={styles.descriptionSubText}>
              {t('TYPE_UNITS_SUB_TEXT')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.selectionContainer}>
        {measurementTypes.map((measurement, index) => {
          if (measurement.name === user?.unit) {
            return (
              <TouchableWithoutFeedback
                onPress={() => submitForm(measurement.name)}
                key={index}>
                <GradientBox style={styles.selectedType}>
                  <View style={styles.selection}>
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
                      style={styles.selectionText}>
                      {capitalize(measurement.name)}
                    </GradientText>
                    <View style={styles.selectionLabelContainer}>
                      {measurement.types.map((type, mIndex) => (
                        <Fragment key={mIndex}>
                          <Text style={styles.selectionLabel}>{type}</Text>
                          {mIndex !== measurement.types.length - 1 && (
                            <View style={styles.dot} />
                          )}
                        </Fragment>
                      ))}
                    </View>
                  </View>
                </GradientBox>
              </TouchableWithoutFeedback>
            );
          }

          return (
            <TouchableWithoutFeedback
              onPress={() => submitForm(measurement.name)}
              key={index}>
              <View style={styles.selection}>
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
                  style={styles.selectionText}>
                  {capitalize(measurement.name)}
                </GradientText>
                <View style={styles.selectionLabelContainer}>
                  {measurement.types.map((type, mIndex) => (
                    <Fragment key={mIndex}>
                      <Text style={styles.selectionLabel}>{type}</Text>
                      {mIndex !== measurement.types.length - 1 && (
                        <View style={styles.dot} />
                      )}
                    </Fragment>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  mainContainer: {
    marginHorizontal: 55,
    marginTop: WIDTH * 0.3,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: WIDTH < 400 ? WIDTH * 0.07 : WIDTH * 0.08,
    marginHorizontal: 5,
  },
  descriptionSubText: {
    color: '#AAA',
    textAlign: 'center',
    fontSize: 16,
  },
  descriptionMainText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: WIDTH < 400 ? WIDTH * 0.07 : WIDTH * 0.08,
  },
  selectionContainer: {
    marginHorizontal: 25,
    marginTop: WIDTH * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selection: {
    width: (WIDTH - 60) / 2,
    height: WIDTH < 400 ? 90 : 100,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
  },
  selectionText: {
    fontSize: 16,
    fontWeight: '700',
  },
  selectionLabel: {
    color: 'black',
  },
  selectionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  selectedType: {
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginHorizontal: 7,
    marginTop: 4,
  },
});

export default TypeUnits;

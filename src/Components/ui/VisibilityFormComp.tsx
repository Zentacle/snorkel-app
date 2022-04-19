import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';
import type { FieldRenderProps } from 'react-final-form';

import GradientBox from '_components/ui/GradientBox';

import Visibility from '_assets/Visibility.png';

interface VisibilityFormCompProps {
  visibilityLevels: number[];
}
type FinalFormProps = FieldRenderProps<number, any>;
type ComponentProps = VisibilityFormCompProps & FinalFormProps;

const VisibilityFormComp: FunctionComponent<ComponentProps> = ({
  input: { value, onChange },
}) => {
  const { t } = useTranslation();

  const visibilityLevels = [1, 2, 3, 4, 5];

  const visibilityLevelMap: { [key: string]: string } = {
    1: t('POOR'),
    2: t('BELOW_AVERAGE'),
    3: t('AVERAGE'),
    4: t('GOOD'),
    5: t('AMAZING'),
  };

  // const visibilityLevels = [
  //   t('POOR'),
  //   t('BELOW_AVERAGE'),
  //   t('AVERAGE'),
  //   t('GOOD'),
  //   t('AMAZING'),
  // ];

  const valueIndex = visibilityLevels.findIndex(vis => vis === value);

  return (
    <View style={styles.visibilityContentContainer}>
      <View style={styles.labelTextContainer}>
        <Text style={styles.labelText}>{t('VISIBILITY')}</Text>
        <Text style={styles.labelText}>
          {visibilityLevelMap[value.toString()]}
        </Text>
      </View>
      <View style={styles.visibility}>
        {visibilityLevels.map((visibilityLevel, index) => {
          if (valueIndex >= index) {
            return (
              <View key={index}>
                <TouchableWithoutFeedback
                  onPress={() => onChange(visibilityLevel)}>
                  <View style={styles.selectedVisibilityShadow}>
                    <GradientBox style={styles.visibilityBox}>
                      <View style={styles.visibilityContainer}>
                        <Image source={Visibility} />
                      </View>
                    </GradientBox>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.visibilityLevelText}>
                  {visibilityLevelMap[visibilityLevel.toString()]}
                </Text>
              </View>
            );
          }

          return (
            <View key={index}>
              <TouchableWithoutFeedback
                onPress={() => onChange(visibilityLevel)}>
                <View style={styles.visibilityContainer}></View>
              </TouchableWithoutFeedback>
              <Text style={styles.visibilityLevelText}>
                {visibilityLevelMap[visibilityLevel.toString()]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  visibilityContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visibilityContentContainer: {},
  visibility: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visibilityBox: {
    padding: 1.5,
    borderRadius: 8,
  },
  selectedVisibilityShadow: {
    borderRadius: 8,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  labelText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  labelTextContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visibilityLevelText: {
    width: 45,
    marginTop: 10,
    fontWeight: '500',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default VisibilityFormComp;

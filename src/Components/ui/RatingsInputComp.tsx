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

import StarEmpty from '_assets/StarEmpty.png';
import StarFull from '_assets/StarFull.png';

interface RatingsInputCompProps {}
type FinalFormProps = FieldRenderProps<number, any>;
type ComponentProps = RatingsInputCompProps & FinalFormProps;

const RatingsInputComp: FunctionComponent<ComponentProps> = ({
  input: { value, onChange },
}) => {
  const { t } = useTranslation();
  const ratings = [1, 2, 3, 4, 5];

  return (
    <View style={styles.ratingContainer}>
      {ratings.map((item, index) => (
        <TouchableWithoutFeedback key={index} onPress={() => onChange(item)}>
          <Image
            style={[styles.star, index !== 0 && {}]}
            source={value >= item ? StarFull : StarEmpty}
          />
        </TouchableWithoutFeedback>
      ))}
      <Text style={styles.starLabel}>
        {value} {t('OF')} 5
      </Text>
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
    color: 'black',
  },
});

export default RatingsInputComp;

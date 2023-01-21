import React from 'react';
import type { FunctionComponent } from 'react';
import { StyleSheet, Platform, View, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

interface Props {
  isIcon?: boolean;
}

const BackButton: FunctionComponent<Props> = ({ isIcon }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const stylesArray: ViewStyle[] = [styles.icon]
  if (isIcon) {
    stylesArray.push(styles.isIcon)
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
      <View style={styles.icon}>
        <Icon name="chevron-left" color="black" size={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 70 : 20,
    left: 20,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
  },
  isIcon: {
    backgroundColor: 'transparent',
  }
});

export default BackButton;

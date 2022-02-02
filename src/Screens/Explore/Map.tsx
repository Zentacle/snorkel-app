import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import FullScreenMap from './components/FullScreenMap';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  ExploreStackParamList,
} from '_utils/interfaces';

type MapNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ExploreStackParamList, 'Map'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type MapRouteProps = RouteProp<ExploreStackParamList, 'Map'>;

interface MapProps {
  navigation: MapNavigationProps;
  route: MapRouteProps;
}

const Map: FunctionComponent<MapProps> = ({ navigation, route }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const coords = route.params.coords;
  return (
    <>
      <FullScreenMap coords={coords} />
      <Icon
        style={styles.icon}
        name="chevron-left"
        color="black"
        size={23}
        onPress={goBack}
      />
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFF',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default Map;

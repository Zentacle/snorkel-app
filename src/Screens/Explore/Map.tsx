import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
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
  const isExplore = route.params.isExplore;
  return (
    <>
      <FullScreenMap coords={coords} isExplore={isExplore}/>
      <TouchableWithoutFeedback onPress={goBack}>
        <View style={styles.icon}>
          <Icon name="chevron-left" color="black" size={23} />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 70 : 20,
    left: 20,
    backgroundColor: '#FFF',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default Map;

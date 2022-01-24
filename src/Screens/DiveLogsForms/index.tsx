import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  AppTabsParamList,
  LogsFormStackParamList,
} from '_utils/interfaces';

type DiveLogsFormsNavigationProps = CompositeNavigationProp<
  CompositeNavigationProp<
    NativeStackNavigationProp<LogsFormStackParamList, 'SimpleLogsForm'>,
    BottomTabNavigationProp<AppTabsParamList>
  >,
  NativeStackNavigationProp<RootStackParamList>
>;

interface DiveLogsFormsProps {
  navigation: DiveLogsFormsNavigationProps;
}

const DiveLogsForms: FunctionComponent<DiveLogsFormsProps> = props => {
  const goBack = () => {
    props.navigation.goBack();
    // props.navigation.navigate('App', {
    //   screen: 'ExploreStack',
    //   params: {
    //     screen: 'Explore',
    //   },
    // });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View />
        <Text style={styles.header}>Create Dive Log</Text>
        <Icon onPress={goBack} name="close-outline" color="black" size={30} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 25,
  },
  header: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default DiveLogsForms;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  LogsFormStackParamList,
} from '_utils/interfaces';

import Footer from './components/SimpleFormFooter';
import FormStates from './components/FormStates';

import { advancedFormStages as stages } from './utils/utils';
import BasicInfo from './forms/advanced/BasicInfo';
import DateTimeDepth from './forms/advanced/DateTimeDepth';
import WaterOnshore from './forms/advanced/WaterOnshore';
import WearGear from './forms/advanced/WearGear';
import Review from './forms/advanced/Review';

type AdvancedDiveLogsFormsNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<LogsFormStackParamList, 'AdvancedDiveLogsForm'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type AdvancedDiveFormRouteProps = RouteProp<
  LogsFormStackParamList,
  'AdvancedDiveLogsForm'
>;

interface AdvancedDiveLogsFormsProps {
  navigation: AdvancedDiveLogsFormsNavigationProps;
  route: AdvancedDiveFormRouteProps;
}

const AdvancedDiveLogsForm: FunctionComponent<AdvancedDiveLogsFormsProps> = ({
  navigation,
  route,
}) => {
  const [page, switchPage] = React.useState(1);

  const next = () => {
    switchPage(page + 1);
  };

  const goToPage = (target: number) => {
    switchPage(target);
  };

  const previous = () => {
    switchPage(page - 1);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const showForms = (): JSX.Element => {
    switch (page) {
      case 0:
        return <BasicInfo />;
      case 1:
        return <DateTimeDepth />;
      case 2:
        return <WaterOnshore />;
      case 3:
        return <WearGear />;
      default:
        return <Review navigateToAdvancedDiveForm={() => {}} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {page > 0 && page !== stages.length ? (
          <TouchableWithoutFeedback onPress={previous}>
            <Icon
              name="chevron-back-outline"
              color="black"
              size={30}
              style={styles.prev}
            />
          </TouchableWithoutFeedback>
        ) : (
          <View style={styles.prevPlaceholder} />
        )}
        <View />
        <Text style={[styles.header, page === 0 && { marginLeft: -20 }]}>
          {page === stages.length
            ? 'Advanced Dive Log Created'
            : 'Full Dive Log'}
        </Text>
        <TouchableWithoutFeedback onPress={goBack}>
          <Icon
            style={styles.back}
            name="close-outline"
            color="black"
            size={30}
          />
        </TouchableWithoutFeedback>
      </View>

      {!!(page !== stages.length) && (
        <View style={styles.formStatesContainer}>
          <FormStates goToPage={goToPage} activeId={page} stages={stages} />
        </View>
      )}
      <ScrollView
        style={[
          styles.scrollContainer,
          page !== stages.length && {
            marginBottom: Platform.OS === 'android' ? 114 : 80,
          },
        ]}>
        {showForms()}
      </ScrollView>
      {page === stages.length ? (
        <View />
      ) : (
        <Footer
          next={next}
          text={page === stages.length - 1 ? 'Complete' : 'Continue'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  scrollContainer: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
  },
  header: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
  },
  prevPlaceholder: {
    width: 30,
    position: 'absolute',
    left: 0,
  },
  prev: {
    position: 'absolute',
    left: 0,
  },
  back: {
    position: 'absolute',
    right: 0,
  },
  formStatesContainer: {
    paddingBottom: 10,
    borderBottomColor: '#A8A8A8',
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default AdvancedDiveLogsForm;

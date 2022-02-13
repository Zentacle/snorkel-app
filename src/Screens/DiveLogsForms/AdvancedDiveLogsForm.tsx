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
import { Form } from 'react-final-form';
import validate from 'validate.js';
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
  LogsFormStackParamList,
} from '_utils/interfaces';

import Footer from './components/FormFooter';
import FormStates from './components/FormStates';

import { advancedFormStages as stages } from './utils/utils';
import BasicInfo from './forms/advanced/BasicInfo';
import DateTimeDepth from './forms/advanced/DateTimeDepth';
import WaterOnshore from './forms/advanced/WaterOnshore';
import WearGear from './forms/advanced/WearGear';
import Review from './forms/advanced/Review';
import ExitModal from './components/ExitModal';

import type { AdvancedFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';

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
  const [modalIsOpen, toggleModal] = React.useState(false);
  let formRef = React.useRef<FormApi>();
  let scrollContainerRef = React.useRef<ScrollView | null>();

  const simpleDiveLogsForm = get(route, 'params.simpleDiveLog', {});

  const next = () => {
    switchPage(page + 1);
  };

  const goToPage = (target: number) => {
    switchPage(target);
  };

  const previous = () => {
    switchPage(page - 1);
  };

  React.useEffect(() => {
    scrollContainerRef.current?.scrollTo({
      y: 0,
    });
  }, [page]);

  React.useEffect(() => {
    return navigation.addListener('blur', () => {
      switchPage(1);
      formRef.current?.reset();
    });
  }, [navigation]);

  const navigateToDiveLog = () => {
    navigation.navigate('App', {
      screen: 'Logs',
    }); // supposed to navigate to created simple dive log detail. Fix later
  };

  const navigateToHome = () => {
    navigation.navigate('App', {
      screen: 'Explore',
    });
  };

  const navigateToDiveLogs = () => {
    navigation.navigate('App', {
      screen: 'Logs',
    });
  };

  const handleCancel = () => {
    if (page === stages.length) {
      navigateToHome();
    } else {
      navigateToDiveLog();
    }
  };

  const openModal = () => {
    toggleModal(true);
  };

  const modalAction = () => {
    toggleModal(false);
    handleCancel();
  };
  const modalCancelAction = () => {
    toggleModal(false);
  };

  const constraints = {};
  const initialValues: InitialValues = {
    ...simpleDiveLogsForm,
    timeInWater: 45,
    maxDepth: 40,
    waterTemp: 14,
    airTemp: 20,
    visibility: 1,
    diveActivity: 'Scuba',
    entry: 'Shore',
    startDate: new Date(),
    startTime: new Date(),
    weight: 5,
    airTankStart: 40,
    airTankEnd: 40,
    nitrox: 'Normal',
  };

  const canMoveToNextPage = (
    currentPage: number,
    values: InitialValues,
  ): boolean => {
    switch (currentPage) {
      case 0:
        return !!(
          values.rating &&
          values.difficulty &&
          values.name &&
          values.note
        );
      default:
        return true;
    }
  };

  return (
    <Form
      validate={values => validate(values, constraints)}
      onSubmit={() => {}}
      initialValues={initialValues}
      render={({ values, handleSubmit, submitting, pristine, form }) => {
        formRef.current = form;
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
              return (
                <Review
                  formValues={values as InitialValues}
                  navigateToDiveLogs={navigateToDiveLogs}
                />
              );
          }
        };

        return (
          <SafeAreaView style={styles.container}>
            <ExitModal
              subtext="When you exit, all advanced dive log information you entered will be deleted. The simple dive log informationis saved and will remain unchanged."
              isVisible={modalIsOpen}
              modalAction={modalAction}
              modalCancelAction={modalCancelAction}
              actionText="Exit"
              cancelActionText="Cancel"
            />
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
              <TouchableWithoutFeedback
                onPress={page === stages.length ? navigateToHome : openModal}>
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
                <FormStates
                  goToPage={goToPage}
                  activeId={page}
                  stages={stages}
                />
              </View>
            )}
            <ScrollView
              ref={ref => (scrollContainerRef.current = ref)}
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
                disabled={!canMoveToNextPage(page, values as InitialValues)}
                text={page === stages.length - 1 ? 'Complete' : 'Continue'}
              />
            )}
          </SafeAreaView>
        );
      }}
    />
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

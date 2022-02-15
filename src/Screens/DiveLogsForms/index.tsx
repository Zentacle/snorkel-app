import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Form } from 'react-final-form';
import validate from 'validate.js';
import get from 'lodash/get';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { FormApi } from 'final-form';

import type { RootStackParamList, AppTabsParamList } from '_utils/interfaces';

import FormStates from './components/FormStates';
import Footer from './components/FormFooter';

import { simpleformStages as stages } from './utils/utils';
import Location from './forms/simple/Location';
import Rating from './forms/simple/Rating';
import Name from './forms/simple/Name';
import Notes from './forms/simple/Notes';
import Review from './forms/simple/Review';
import ExitModal from './components/ExitModal';

import { useAppDispatch } from '_redux/hooks';
import { saveDiveLog } from '_redux/slices/dive-logs';

import type { SimpleFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';

type SimpleDiveLogsFormsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'LogsForm'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type SimpleLogsFormRouteProps = RouteProp<AppTabsParamList, 'LogsForm'>;

interface SimpleDiveLogsFormsProps {
  navigation: SimpleDiveLogsFormsNavigationProps;
  route: SimpleLogsFormRouteProps;
}

const SimpleDiveLogsForms: FunctionComponent<
  SimpleDiveLogsFormsProps
> = props => {
  const [page, switchPage] = React.useState(0);
  const [modalIsOpen, toggleModal] = React.useState(false);
  const [savedDiveLogId, saveDiveLogId] = React.useState(0);
  const passedInLog: InitialValues = get(props.route, 'params.diveLogs', {});
  let formRef = React.useRef<FormApi>();
  const dispatch = useAppDispatch();

  const goBack = () => {
    props.navigation.goBack();
  };

  const openModal = () => {
    toggleModal(true);
  };

  const goToLog = (formvalues: InitialValues) => {
    props.navigation.navigate('LogsStack', {
      screen: 'LogDetail',
      params: {
        diveLog: {
          ...formvalues,
          id: savedDiveLogId,
        },
      },
    });
  };

  const modalAction = () => {
    toggleModal(false);
    goBack();
  };

  const modalCancelAction = () => {
    toggleModal(false);
  };

  const navigateToAdvancedDiveForm = (formvalues: InitialValues) => {
    props.navigation.navigate('LogsFormStack', {
      screen: 'AdvancedDiveLogsForm',
      params: {
        simpleDiveLog: formvalues,
      },
    });
  };

  const handleNavigateToAdvancedDiveLog = (formvalues: InitialValues) => {
    navigateToAdvancedDiveForm({ ...formvalues, id: savedDiveLogId });
  };

  const submitLog = (values: InitialValues) => {
    const diveLogId = new Date().getTime();

    const diveLog = {
      ...values,
      id: values.id ?? (diveLogId as number),
    };

    dispatch(saveDiveLog(diveLog));
    saveDiveLogId(diveLog.id as number);
    return diveLog;
  };

  const constraints = {};
  const initialValues: InitialValues = {
    id: 0,
    rating: 0,
    difficulty: 'Beginner',
    ...passedInLog,
  };

  React.useEffect(() => {
    return props.navigation.addListener('blur', () => {
      switchPage(0);
      formRef.current?.reset();
      props.navigation.setParams({
        diveLogs: {},
      });
    });
  }, [props.navigation]);

  const canMoveToNextPage = (
    currentPage: number,
    values: InitialValues,
  ): boolean => {
    switch (currentPage) {
      case 0:
        return true;
      case 1:
        return !!(values.rating && values.difficulty);
      case 2:
        return !!values.name;
      case 3:
        return !!values.note;
      default:
        return true;
    }
  };

  const next = () => {
    switchPage(page + 1);
  };

  const goToPage = (target: number) => {
    switchPage(target);
  };

  const previous = () => {
    switchPage(page - 1);
  };

  return (
    <Form
      validate={values => validate(values, constraints)}
      onSubmit={() => {}}
      initialValues={initialValues}
      keepDirtyOnReinitialize
      render={({ values, form }) => {
        formRef.current = form;

        const showForms = (): JSX.Element => {
          switch (page) {
            case 0:
              return <Location />;
            case 1:
              return <Rating />;
            case 2:
              return <Name />;
            case 3:
              return <Notes />;
            default:
              return (
                <Review
                  navigateToAdvancedDiveForm={() =>
                    handleNavigateToAdvancedDiveLog(values as InitialValues)
                  }
                  formValues={values as InitialValues}
                />
              );
          }
        };
        return (
          <SafeAreaView style={styles.container}>
            <ExitModal
              subtext="On exit, all dive log information you entered will be deleted."
              isVisible={modalIsOpen}
              modalAction={modalAction}
              modalCancelAction={modalCancelAction}
              actionText="Exit"
              cancelActionText="Cancel"
            />
            <ScrollView
              style={[
                styles.scrollContainer,
                page !== stages.length && {
                  marginBottom: Platform.OS === 'android' ? 114 : 80,
                },
              ]}>
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
                <Text
                  style={[styles.header, page === 0 && { marginLeft: -20 }]}>
                  {page === stages.length
                    ? 'Dive Log Created'
                    : 'Create Dive Log'}
                </Text>
                <TouchableWithoutFeedback
                  onPress={
                    page === stages.length
                      ? () => goToLog(values as InitialValues)
                      : openModal
                  }>
                  <Icon
                    style={styles.back}
                    name="close-outline"
                    color="black"
                    size={30}
                  />
                </TouchableWithoutFeedback>
              </View>

              {!!(page !== stages.length) && (
                <FormStates
                  goToPage={(target: number) => {
                    canMoveToNextPage(target - 1, values as InitialValues)
                      ? goToPage(target)
                      : () => {};
                  }}
                  activeId={page}
                  stages={stages}
                />
              )}

              {showForms()}
            </ScrollView>
            {page === stages.length ? (
              <View />
            ) : (
              <Footer
                next={
                  page === stages.length - 1
                    ? () => {
                        submitLog(values as InitialValues);
                        next();
                      }
                    : next
                }
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
});

export default SimpleDiveLogsForms;

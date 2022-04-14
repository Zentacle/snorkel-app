import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Form } from 'react-final-form';
import validate from 'validate.js';
import get from 'lodash/get';
import arrayMutators from 'final-form-arrays';
import { useTranslation } from 'react-i18next';

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

import Location from './forms/simple/Location';
import Rating from './forms/simple/Rating';
import Name from './forms/simple/Name';
import Notes from './forms/simple/Notes';
import Review from './forms/simple/Review';
import ExitModal from './components/ExitModal';

import { useAppDispatch } from '_redux/hooks';
import { saveDiveLog } from '_redux/slices/dive-logs';

import type { SimpleFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';
import {
  isBelowHeightThreshold,
  isBelowWidthThreshold,
} from '_utils/constants';
import { Stage } from './utils/interfaces';

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
  const { t } = useTranslation();
  const [page, switchPage] = React.useState(0);
  const [modalIsOpen, toggleModal] = React.useState(false);
  const [savedDiveLogId, saveDiveLogId] = React.useState(0);
  const passedInLog: InitialValues = get(props.route, 'params.diveLogs', {});
  let formRef = React.useRef<FormApi>();
  const dispatch = useAppDispatch();

  const stages: Stage[] = [
    {
      id: 0,
      name: t('simpleformStages._0'),
    },
    {
      id: 1,
      name: t('simpleformStages._1'),
    },
    {
      id: 2,
      name: t('simpleformStages._2'),
    },
    {
      id: 3,
      name: t('simpleformStages._3'),
    },
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  const openModal = () => {
    toggleModal(true);
  };

  const goToLog = () => {
    props.navigation.navigate('LogsStack', {
      screen: 'LogDetail',
      params: {
        diveLogId: savedDiveLogId,
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
      id: !!values.id ? values.id : (diveLogId as number),
    };

    dispatch(saveDiveLog(diveLog));
    saveDiveLogId(diveLog.id as number);
    return diveLog;
  };

  const constraints = {};

  const initialValues: InitialValues = {
    // ignore overwritten propertied error
    // @ts-ignore
    // id: 0,
    // @ts-ignore
    rating: 0,
    // @ts-ignore
    difficulty: t('BEGINNER'),
    activity_type: t('SCUBA'),
    location: undefined,
    // @ts-ignore
    // images: [],
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
        return !!(
          values.location &&
          values.location.lat &&
          values.location.lng &&
          values.location.desc
        );
      case 1:
        return !!(values.rating && values.difficulty);
      case 2:
        return !!values.title;
      case 3:
        return !!values.text;
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
      mutators={{
        ...arrayMutators,
      }}
      // keepDirtyOnReinitialize
      render={({ values, form }) => {
        formRef.current = form;
        return (
          <SafeAreaView style={styles.container}>
            <ExitModal
              subtext={t('diveLogForm.EXIT_MODAL_SUBTEXT_FOR_SIMPLE_FORM')}
              isVisible={modalIsOpen}
              modalAction={modalAction}
              modalCancelAction={modalCancelAction}
              actionText={t('EXIT')}
              cancelActionText={t('CANCEL')}
            />
            <ScrollView
              style={[
                styles.scrollContainer,
                page !== stages.length && {
                  marginBottom: isBelowHeightThreshold ? 100 : 80,
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
                    ? t('DIVE_LOG_CREATED')
                    : t('CREATE_DIVE_LOG')}
                </Text>
                <TouchableWithoutFeedback
                  onPress={
                    page === stages.length ? () => goToLog() : openModal
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

              {page === 0 && <Location location={values.location} />}
              {page === 1 && <Rating />}
              {page === 2 && <Name />}
              {page === 3 && <Notes />}
              {page === 4 && (
                <Review
                  navigateToAdvancedDiveForm={() =>
                    handleNavigateToAdvancedDiveLog(values as InitialValues)
                  }
                  formValues={values as InitialValues}
                  id={savedDiveLogId}
                />
              )}
            </ScrollView>
            {page === stages.length ? (
              <View />
            ) : (
              <Footer
                next={
                  page === stages.length - 1
                    ? () => {
                        // submit then navigate to review
                        submitLog(values as InitialValues);
                        next();
                      }
                    : next
                }
                disabled={!canMoveToNextPage(page, values as InitialValues)}
                text={
                  page === stages.length - 1 ? t('COMPLETE') : t('CONTINUE')
                }
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
    fontSize: isBelowWidthThreshold ? 20 : 22,
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

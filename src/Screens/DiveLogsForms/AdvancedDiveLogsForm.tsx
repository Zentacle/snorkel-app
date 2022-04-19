import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Form } from 'react-final-form';
import validate from 'validate.js';
import get from 'lodash/get';
import arrayMutators from 'final-form-arrays';
import { useTranslation } from 'react-i18next';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { FormApi } from 'final-form';
import { Stage } from './utils/interfaces';

import type {
  RootStackParamList,
  LogsFormStackParamList,
} from '_utils/interfaces';

import Footer from './components/FormFooter';
import FormStates from './components/FormStates';

import BasicInfo from './forms/advanced/BasicInfo';
import DateTimeDepth from './forms/advanced/DateTimeDepth';
import WaterOnshore from './forms/advanced/WaterOnshore';
import WearGear from './forms/advanced/WearGear';
import Review from './forms/advanced/Review';
import ExitModal from './components/ExitModal';

import type { AdvancedFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';
import { useAppDispatch, useAppSelector } from '_redux/hooks';
import { selectAuthCookie } from '_redux/slices/user';
import { editDiveLog } from '_redux/slices/dive-logs';
import {
  isBelowHeightThreshold,
  isBelowWidthThreshold,
} from '_utils/constants';
import { handleUpdateDiveLog } from '_redux/slices/dive-logs/api';

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
  const { t } = useTranslation();
  const authCookie = useAppSelector(selectAuthCookie);
  const [page, switchPage] = React.useState(1);
  const [modalIsOpen, toggleModal] = React.useState(false);
  const [logDate, setLogDate] = React.useState<Date>();

  let formRef = React.useRef<FormApi<InitialValues, Partial<InitialValues>>>();
  let scrollContainerRef = React.useRef<ScrollView | null>();
  const dispatch = useAppDispatch();

  const simpleDiveLogsForm: InitialValues = get(route, 'params.diveLog', {});

  const stages: Stage[] = [
    {
      id: 0,
      name: t('advancedFormStages._0'),
    },
    {
      id: 1,
      name: t('advancedFormStages._1'),
    },
    {
      id: 2,
      name: t('advancedFormStages._2'),
    },
    {
      id: 3,
      name: t('advancedFormStages._3'),
    },
  ];

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
    setLogDate(new Date());
  }, []);

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

  const submitLog = async (values: InitialValues, callback: () => void) => {
    const date = (values.startDate as Date).toDateString();
    const time = (values.startTime as Date).toTimeString();
    const dateConcat = `${date} ${time}`;
    const arrangedValues = {
      ...values,
      date_dived: new Date(dateConcat).toISOString(),
      beach_id: values.location?.beach_id,
    };
    delete arrangedValues.startDate;
    delete arrangedValues.startTime;
    delete arrangedValues.location;
    console.log('arranged', arrangedValues);
    console.log(typeof arrangedValues.date_dived);

    const response = await handleUpdateDiveLog(
      {
        ...arrangedValues,
        beach_id: values.location?.beach_id,
      },
      authCookie as string,
    );

    console.log('resp', response);

    callback();

    // console.log('full dl', response);
    // dispatch(
    //   editDiveLog({
    //     ...arrangedValues,
    //   }),
    // );
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
    dive_length: 45,
    max_depth: 40,
    water_temp: 14,
    air_temp: 20,
    visibility: 1,
    entry: t('SHORE').toLowerCase(),
    // @ts-ignore
    startDate: logDate,
    // @ts-ignore
    startTime: logDate,
    weight: 5,
    start_air: 40,
    end_air: 40,
    air_type: t('NORMAL').toLowerCase(),
    ...simpleDiveLogsForm,
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
          values.title &&
          values.text
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
      keepDirtyOnReinitialize
      mutators={{
        ...arrayMutators,
      }}
      render={({ values, handleSubmit, form }) => {
        formRef.current = form;

        return (
          <SafeAreaView style={styles.container}>
            <ExitModal
              subtext={t('diveLogForm.EXIT_MODAL_SUBTEXT_FOR_ADVANCED_FORM')}
              isVisible={modalIsOpen}
              modalAction={modalAction}
              modalCancelAction={modalCancelAction}
              actionText={t('EXIT')}
              cancelActionText={t('CANCEL')}
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
                  ? t('ADVANCED_DIVE_LOG_CREATED')
                  : t('FULL_DIVE_LOG')}
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
                  marginBottom: isBelowHeightThreshold ? 80 : 80,
                },
              ]}>
              {page === 0 && <BasicInfo values={values as InitialValues} />}
              {page === 1 && <DateTimeDepth />}
              {page === 2 && <WaterOnshore />}
              {page === 3 && <WearGear />}
              {page === 4 && (
                <Review
                  formValues={values as InitialValues}
                  navigateToDiveLogs={navigateToDiveLogs}
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
                        submitLog(values, next);
                        // next();
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
  formStatesContainer: {
    paddingBottom: 10,
    borderBottomColor: '#A8A8A8',
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default AdvancedDiveLogsForm;

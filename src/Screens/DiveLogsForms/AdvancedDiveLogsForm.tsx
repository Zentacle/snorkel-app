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
import { useAppSelector } from '_redux/hooks';
import { selectAuthToken } from '_redux/slices/user';
import {
  isBelowHeightThreshold,
  isBelowWidthThreshold,
} from '_utils/constants';
import { handleUpdateDiveLog } from '_redux/slices/dive-logs/api';
import { selectUser } from '_redux/slices/user';

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
  const authToken = useAppSelector(selectAuthToken);
  const user = useAppSelector(selectUser);
  const [page, switchPage] = React.useState(1);
  const [modalIsOpen, toggleModal] = React.useState(false);
  const [logDate, setLogDate] = React.useState<Date>();
  const [formSubmitting, setFormSubmitting] = React.useState(false);

  let formRef = React.useRef<FormApi<InitialValues, Partial<InitialValues>>>();
  let scrollContainerRef = React.useRef<ScrollView | null>();

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
    setFormSubmitting(true);
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
    delete arrangedValues.date_posted;

    await handleUpdateDiveLog(
      {
        ...arrangedValues,
        beach_id: values.location?.beach_id,
      },
      authToken as string,
    );
    setFormSubmitting(false);

    callback();
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
    id: simpleDiveLogsForm.id,
    dive_length: simpleDiveLogsForm.dive_length
      ? simpleDiveLogsForm.dive_length
      : 45,
    max_depth: simpleDiveLogsForm.max_depth
      ? simpleDiveLogsForm.max_depth
      : user?.unit === 'imperial'
      ? 40
      : 12.2,
    water_temp: simpleDiveLogsForm.water_temp
      ? simpleDiveLogsForm.water_temp
      : user?.unit === 'imperial'
      ? 57.2
      : 14,
    air_temp: simpleDiveLogsForm.air_temp
      ? simpleDiveLogsForm.air_temp
      : user?.unit === 'imperial'
      ? 60
      : 20,
    visibility: simpleDiveLogsForm.visibility
      ? simpleDiveLogsForm.visibility
      : 1,
    entry: simpleDiveLogsForm.entry
      ? simpleDiveLogsForm.entry
      : t('SHORE').toLowerCase(),
    // @ts-ignore
    startDate: simpleDiveLogsForm.date_dived
      ? new Date(simpleDiveLogsForm.date_dived)
      : logDate,
    // @ts-ignore
    startTime: simpleDiveLogsForm.date_dived
      ? new Date(simpleDiveLogsForm.date_dived)
      : logDate,
    weight: simpleDiveLogsForm.weight
      ? simpleDiveLogsForm.weight
      : user?.unit === 'imperial'
      ? 11
      : 5,
    start_air: simpleDiveLogsForm.start_air
      ? simpleDiveLogsForm.start_air
      : user?.unit === 'imperial'
      ? 3000
      : 200,
    end_air: simpleDiveLogsForm.end_air
      ? simpleDiveLogsForm.end_air
      : user?.unit === 'imperial'
      ? 800
      : 50,
    air_type: simpleDiveLogsForm.air_type
      ? simpleDiveLogsForm.air_type
      : t('NORMAL').toLowerCase(),
    rating: simpleDiveLogsForm.rating,
    difficulty: simpleDiveLogsForm.difficulty,
    location: simpleDiveLogsForm.location,
    activity_type: simpleDiveLogsForm.activity_type,
    images: simpleDiveLogsForm.images,
    title: simpleDiveLogsForm.title,
    text: simpleDiveLogsForm.text,
    // ...simpleDiveLogsForm,
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
      render={({ values, form }) => {
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
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
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
                  page === stages.length - 1
                    ? formSubmitting
                      ? t('COMPLETING')
                      : t('COMPLETE')
                    : t('CONTINUE')
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

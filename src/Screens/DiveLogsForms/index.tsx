import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Form } from 'react-final-form';
import validate from 'validate.js';
import get from 'lodash/get';
import arrayMutators from 'final-form-arrays';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';

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
import Review from './forms/simple/Review';
import ExitModal from './components/ExitModal';

import { useAppSelector } from '_redux/hooks';

import type { SimpleFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';
import {
  isBelowHeightThreshold,
  isBelowWidthThreshold,
} from '_utils/constants';
import { Stage } from './utils/interfaces';
import { selectAuthToken } from '_redux/slices/user';
import {
  handleCreateDiveLog,
  handleUploadDiveLogImages,
} from '_redux/slices/dive-logs/api';
import offlineManager from '_utils/functions/offline-manager';

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
  const authToken = useAppSelector(selectAuthToken);
  const [page, switchPage] = React.useState(0);
  const [modalIsOpen, toggleModal] = React.useState(false);
  const [savedDiveLogId, saveDiveLogId] = React.useState(0);
  const [formSubmitting, setFormSubmitting] = React.useState(false);
  const passedInLog: InitialValues = get(props.route, 'params.diveLogs', {});
  let formRef = React.useRef<FormApi>();

  const stages: Stage[] = [
    {
      id: 0,
      name: t('simpleformStages._0'),
    },
    {
      id: 1,
      name: t('simpleformStages._1'),
    },
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  const openModal = () => {
    toggleModal(true);
  };

  const goToLog = async () => {
    const connectionState = await NetInfo.fetch();
    if (!connectionState.isConnected) {
      // offline, cannot fetch details of created log
      props.navigation.navigate('Explore');
    } else {
      props.navigation.navigate('LogsStack', {
        screen: 'LogDetail',
        params: {
          diveLogId: savedDiveLogId,
        },
      });
    }
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
        diveLog: formvalues,
      },
    });
  };

  const handleNavigateToAdvancedDiveLog = (formvalues: InitialValues) => {
    navigateToAdvancedDiveForm({ ...formvalues, id: savedDiveLogId });
  };

  const submitLog = async (values: InitialValues, callback: () => void) => {
    try {
      setFormSubmitting(true);

      let arrangedValues: InitialValues = {
        ...values,
        beach_id: values.location?.beach_id,
        dive_shop_id: values.dive_shop?.shop_id,
        is_private: values.privacy === t('DIVE_LOG_PRIVATE').toLowerCase(),
        date_dived: new Date().toJSON(),
      };

      delete arrangedValues.location;
      delete arrangedValues.privacy;
      delete arrangedValues.dive_shop;

      const connectionState = await NetInfo.fetch();
      if (!connectionState.isConnected) {
        // offline save
        await offlineManager.saveItem<InitialValues>(
          'create-dive-log',
          arrangedValues,
        );
        Toast.show({
          type: 'info',
          text1: 'No network available',
          text2:
            "We'll upload your dive log as soon as You are connected to the internet",
        });
        setFormSubmitting(false);
        callback();
      } else {
        if (values.images) {
          const images = await handleUploadDiveLogImages(
            values.images,
            authToken as string,
          );

          arrangedValues = {
            ...arrangedValues,
            images,
          };
        }
        const response = await handleCreateDiveLog(
          arrangedValues,
          authToken as string,
        );

        if (response.msg) {
          setFormSubmitting(false);
          throw new Error(response.msg);
        }
        saveDiveLogId(response.review.id as number);
        setFormSubmitting(false);
        callback();
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'There was an error submitting this dive log!',
      });
      setFormSubmitting(false);
    }
  };

  const constraints = {};

  const initialValues: InitialValues = {
    // ignore overwritten propertied error
    // @ts-ignore
    // id: 0,
    // @ts-ignore
    rating: 0,
    // @ts-ignore
    difficulty: undefined,
    activity_type: 'scuba',
    location: undefined,
    // @ts-ignore
    // images: [],
    dive_shop: undefined,
    // @ts-ignore
    privacy: 'public',
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
          // values.location.lat &&
          // values.location.lng &&
          values.location.desc &&
          values.rating
        );
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
      onSubmit={() => { }}
      initialValues={initialValues}
      // keepDirtyOnReinitialize
      mutators={{
        ...arrayMutators,
      }}
      render={({ values, form }) => {
        formRef.current = form;

        return (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
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
                        : () => { };
                    }}
                    activeId={page}
                    stages={stages}
                  />
                )}

                {page === 0 && (
                  <Location
                    location={values.location}
                  />
                )}
                {page === 1 && <Rating dive_shop={values.dive_shop} />}
                {page === 2 && (
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
                        submitLog(values as InitialValues, next);
                        // next();
                      }
                      : next
                  }
                  disabled={!canMoveToNextPage(page, values as InitialValues) || formSubmitting}
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
          </KeyboardAvoidingView>
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

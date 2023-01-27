import React from 'react';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '_redux/hooks';
import {
  selectDiveSiteById,
  handleFetchDiveSite,
  isDiveSiteDetailinState,
} from '_redux/slices/dive-sites';
import { fetchNearby } from '_redux/slices/dive-sites/api';
import {
  handleFetchReviews,
  selectReviewById,
  isReviewInState,
} from '_redux/slices/reviews';

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
import type { Spot } from '_utils/interfaces/data/spot';

import { capitalize } from '_utils/functions';
import DiveSiteLoading from '_components/reusables/Placeholders/DiveSiteLoading';
import DiveSiteWithoutNavObject from './components/DiveSiteWithoutNavObject';
import DiveSiteWithtNavObject from './components/DiveSiteWithNavObject';

type DiveSiteNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ExploreStackParamList, 'DiveSite'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type DiveSiteRouteProps = RouteProp<ExploreStackParamList, 'DiveSite'>;

interface DiveSiteProps {
  navigation: DiveSiteNavigationProps;
  route: DiveSiteRouteProps;
}

export interface Activity {
  label: string;
  values: string[];
}

const DiveSite: FunctionComponent<DiveSiteProps> = ({ navigation, route }) => {
  const currentSpotId =
    typeof route.params.diveSpotId === 'number'
      ? route.params.diveSpotId
      : parseInt(route.params.diveSpotId, 10);
  const navObjectSpot = route.params.diveSpot;
  const { t } = useTranslation();
  const [nearby, setNearby] = React.useState<Spot[]>([]);
  const [seeFullDesc, setFullDesc] = React.useState(false);

  const diveSiteInState = useAppSelector(
    isDiveSiteDetailinState(currentSpotId),
  );

  const reviewInState = useAppSelector(isReviewInState(currentSpotId));

  const reviewObj = useAppSelector(selectReviewById(currentSpotId));
  const reviews = reviewInState ? Object.values(reviewObj) : [];
  const diveSite = useAppSelector(selectDiveSiteById(currentSpotId));

  const activities: Activity[] = [
    {
      label: t('ACTIVITY'),
      values: [t('SCUBA'), t('SNORKEL'), t('FREEDIVING')],
    },
    {
      label: t('ENTRY'),
      values: ((diveSite && diveSite.access) || []).map(
        access => capitalize(access.text)!,
      ),
    },
    {
      label: t('TAGS'),
      values: ((diveSite && diveSite.tags) || []).map(
        tag => capitalize(tag.text)!,
      ),
    },
  ];

  React.useEffect(() => {
    if (typeof route.params.diveSpotId === 'string' || route.params.wildcard) {
      if (!route.params.reset) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'App',
                state: {
                  routes: [
                    {
                      name: 'Explore',
                    },
                  ],
                },
              },
              {
                name: 'ExploreStack',
                state: {
                  key: navigation.getParent()?.getState().key,
                  routes: [
                    {
                      name: 'DiveSite',
                      key: navigation.getState().key,
                      params: {
                        ...route.params,
                        reset: true,
                      },
                    },
                  ],
                },
              },
            ],
          }),
        );
      }
    }
  }, [route, navigation]);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchNearby(currentSpotId).then(results => setNearby(results.data));
    // only fetch dive site and reviews if they don't already exist
    // in their respective redux slices.
    if (!reviewInState) {
      dispatch(handleFetchReviews(currentSpotId));
    }

    // just make call to fetch beach if no images, since we're only calling this hook once now
    dispatch(handleFetchDiveSite(currentSpotId));
  }, [currentSpotId]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigateToDiveSite = (diveSpotId: number, diveSpot: Spot) => {
    navigation.push('ExploreStack', {
      screen: 'DiveSite',
      params: {
        diveSpotId,
        diveSpot,
      },
    });
  };

  // const navigateToDiveShop = () => {
  //   navigation.navigate('ExploreStack', {
  //     screen: 'DiveShop',
  //   });
  // };

  const navigateToDiveLogForm = () => {
    navigation.navigate('App', {
      screen: 'LogsForm',
      params: {
        location: {
          lat: diveSite.latitude,
          lng: diveSite.longitude,
          desc: diveSite.name,
          location_city: diveSite.location_city,
          beach_id: diveSite.id,
        },
      },
    });
  };

  const navigateToMap = () => {
    diveSite &&
      navigation.navigate('ExploreStack', {
        screen: 'Map',
        params: {
          coords: {
            lat: diveSite.latitude,
            lng: diveSite.longitude,
          },
        },
      });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToReviews = () => {
    navigation.navigate('Reviews', {
      id: currentSpotId,
    });
  };

  const navigateToAuth = () => {
    navigation.navigate('Auth', {
      screen: 'Landing',
    });
  };

  if (!navObjectSpot && !diveSite) {
    return <DiveSiteLoading />;
  }

  if (!navObjectSpot && diveSite) {
    return (
      <DiveSiteWithoutNavObject
        diveSite={diveSite}
        navigateBack={navigateBack}
        seeFullDesc={seeFullDesc}
        setFullDesc={setFullDesc}
        navigateToMap={navigateToMap}
        navigateToReviews={navigateToReviews}
        navigateToAuth={navigateToAuth}
        navigateToDiveLogForm={navigateToDiveLogForm}
        navigateToDiveSite={navigateToDiveSite}
        activities={activities}
        reviews={reviews}
        nearby={nearby}
      />
    );
  }

  return (
    <DiveSiteWithtNavObject
      diveSite={diveSite}
      navigateBack={navigateBack}
      seeFullDesc={seeFullDesc}
      setFullDesc={setFullDesc}
      navigateToMap={navigateToMap}
      navigateToReviews={navigateToReviews}
      navigateToAuth={navigateToAuth}
      navigateToDiveLogForm={navigateToDiveLogForm}
      navigateToDiveSite={navigateToDiveSite}
      activities={activities}
      reviews={reviews}
      nearby={nearby}
      navObjectSpot={navObjectSpot as Spot}
      diveSiteInState={diveSiteInState}
    />
  );
};

DiveSite.sharedElements = (route: DiveSiteRouteProps) => {
  const { diveSpotId } = route.params;
  return [
    {
      id: `item.${diveSpotId}.image`,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: `item.${diveSpotId}.name`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${diveSpotId}.location`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${diveSpotId}.review`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${diveSpotId}.description`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

export default DiveSite;

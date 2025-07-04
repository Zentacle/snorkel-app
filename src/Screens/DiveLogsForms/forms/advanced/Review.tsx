import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Share,
  Alert,
} from 'react-native';
import IoIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import GradientCircle from '_components/ui/GradientCircle';
import GradientText from '_components/ui/GradientText';
import Button from '_components/ui/Buttons/Button';

import { FunctionComponent } from 'react';
import type { AdvancedFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';

import DivingPlaceholder from '_assets/diving-placeholder.jpeg';
import CopyIcon from '_assets/CopySimple.png';
import UploadIcon from '_assets/UploadSimple.png';
import DepthArrow from '_assets/ArrowsDownUp.png';
import DiveTimeClock from '_assets/ClockClockwise.png';
import Snorkel from '_assets/scuba_icons/snorkel.svg';
import Location from '_assets/scuba_icons/Location.svg';
import Shop from '_assets/scuba_icons/Shop.svg';

import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';
import {
  isBelowHeightThreshold,
  isBelowWidthThreshold,
  WIDTH,
} from '_utils/constants';

interface ReviewProps {
  navigateToDiveLogs: () => void;
  formValues: InitialValues;
}

const Review: FunctionComponent<ReviewProps> = ({
  navigateToDiveLogs,
  formValues,
}) => {
  const { t } = useTranslation();
  const [copyMessageSet, setCopymessage] = React.useState(false);
  const activeUser = useAppSelector(selectUser);
  const onShare = async () => {
    const url = `https://zentacle.com/dive-log/${formValues.id}`;
    try {
      const result = await Share.share({
        message: url,
        title: `${activeUser?.username} ${t(
          'diveLogForm.DIVE_LOG_SHARE_MESSAGE',
        )}`,
        url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of type result.activity type
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (err) {
      interface CaughtErr {
        message: string;
      }
      Alert.alert((err as CaughtErr).message);
    }
  };

  // const onCopyToClipboard = () => {
  //   const url = `https://zentacle.com/dive-log/${formValues.id}`;
  //   Clipboard.setString(url);
  //   setCopymessage(true);
  //   setTimeout(() => {
  //     setCopymessage(false);
  //   }, 1000);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.gradientContainer}>
        <GradientCircle style={styles.gradient}>
          <IoIcon name="checkmark-outline" size={40} color="#fff" />
        </GradientCircle>
      </View>
      <Text style={styles.mainText}>
        {t('diveLogForm.ADVANCED_LOG_CREATED_MSG')}
      </Text>

      <View style={styles.diveDetailsContainer}>
        <View style={styles.imageContainer}>
          {formValues.images && formValues.images.length ? (
            <>
              <Image
                style={styles.image}
                source={{ uri: formValues.images[0].uri }}
              />
              <View style={styles.imageCountContainer}>
                <Icon name="image-outline" size={18} color="#FFF" />
                <Text style={styles.imageCountText}>
                  {formValues.images.length}
                </Text>
              </View>
            </>
          ) : (
            <>
              <Image style={styles.image} source={DivingPlaceholder} />
              <View style={styles.imageCountContainer}>
                <Icon name="image-outline" size={18} color="#FFF" />
                <Text style={styles.imageCountText}>0</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.detailsTitle}>{formValues.title}</Text>
          <View style={styles.descContainer}>
            <Snorkel width={15} />
            <Text style={styles.descText}>{formValues.location?.desc}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Location width={15} />
            <Text style={styles.locationText}>
              {formValues.location?.location_city}
            </Text>
            {/* <View style={styles.dot} /> */}
            <Text style={styles.locationTimestamp}>
              {new Date(formValues.startDate as Date).toDateString()}
            </Text>
          </View>
          {formValues.dive_shop && (
            <View style={styles.diveShopContainer}>
              <Shop width={15} />
              <Text style={styles.diveShopText}>
                {formValues.dive_shop?.name}
              </Text>
            </View>
          )}
          <View style={styles.timeDepthContainer}>
            <View style={styles.timeDepthItem}>
              <Image source={DiveTimeClock} />
              <View style={styles.timeDepthTextContainer}>
                <Text style={styles.timeDepthLabel}>{t('DIVE_TIME')}</Text>
                <Text style={styles.timeDepthText}>
                  {formValues.dive_length} min
                </Text>
              </View>
            </View>
            <View style={styles.timeDepthItem}>
              <Image source={DepthArrow} />
              <View style={styles.timeDepthTextContainer}>
                <Text style={styles.timeDepthLabel}>{t('MAX_DEPTH')}</Text>
                <Text style={styles.timeDepthText}>
                  {formValues.max_depth} m
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.shareContainer}>
        <TouchableWithoutFeedback onPress={onShare}>
          <View style={styles.shareItems}>
            <Image style={styles.shareIcon} source={UploadIcon} />
            <GradientText
              gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 0.06,
                y: 1.8,
              }}
              gradientLocations={[0.01, 1, 1]}
              style={styles.shareText}>
              {t('SHARE')}
            </GradientText>
          </View>
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback onPress={onCopyToClipboard}> */}
        <TouchableWithoutFeedback>
          <View style={styles.shareItems}>
            <Image style={styles.shareIcon} source={CopyIcon} />
            <GradientText
              gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 0.06,
                y: 1.8,
              }}
              gradientLocations={[0.01, 1, 1]}
              style={styles.shareText}>
              {copyMessageSet ? t('COPIED') : t('COPY_LINK')}
            </GradientText>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View>
        <Button
          onPress={navigateToDiveLogs}
          gradient
          gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
          gradientLocations={[0.01, 1, 1]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0.06,
            y: 2.2,
          }}
          style={{
            container: styles.buttonContainer,
            text: styles.buttonText,
          }}>
          {t('COMPLETE')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 25,
  },
  mainText: {
    color: 'black',
    fontSize: isBelowHeightThreshold ? 18 : 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: '20%',
  },
  gradientContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  gradient: {
    width: isBelowHeightThreshold ? 80 : 100,
    height: isBelowHeightThreshold ? 80 : 100,
    borderRadius: isBelowHeightThreshold ? 40 : 50,
  },
  diveDetailsContainer: {
    backgroundColor: '#fff',
    width: isBelowWidthThreshold ? WIDTH * 0.85 : WIDTH * 0.9,
    marginTop: 30,
    borderRadius: 20,
  },
  imageContainer: {},
  image: {
    width: isBelowWidthThreshold ? WIDTH * 0.85 : WIDTH * 0.9,
    alignSelf: 'center',
    height: 210,
    borderRadius: 20,
  },
  imageCountContainer: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(131,131,131,0.5)',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
    alignItems: 'center',
  },
  imageCountText: {
    marginLeft: 5,
    opacity: 1,
  },
  details: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  descContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  descText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'flex-start',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
    maxWidth: '50%',
    color: 'black',
  },
  locationTimestamp: {
    color: 'grey',
    marginLeft: 5,
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginLeft: 10,
    marginTop: 4,
  },
  shareContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  shareItems: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '48%',
  },
  shareText: {
    fontSize: 17,
    fontWeight: '600',
  },
  shareIcon: {
    marginRight: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  timeDepthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 30,
    alignItems: 'center',
  },
  timeDepthItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeDepthTextContainer: {
    marginLeft: 20,
  },
  timeDepthText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  timeDepthLabel: {
    color: 'gray',
    marginBottom: 15,
  },
  diveShopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  diveShopText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
});

export default Review;

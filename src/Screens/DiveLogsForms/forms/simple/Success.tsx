import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Share,
  Alert,
} from 'react-native';
import Rate from 'react-native-rate'
import IoIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';

import GradientCircle from '_components/ui/GradientCircle';
import GradientText from '_components/ui/GradientText';
import Button from '_components/ui/Buttons/Button';

import type { FunctionComponent } from 'react';

import { sendEvent } from '_utils/functions/amplitude';
import type { SimpleFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';

import Snorkel from '_assets/scuba_icons/snorkel.svg';
import Location from '_assets/scuba_icons/Location.svg';
import CopyIcon from '_assets/CopySimple.png';
import UploadIcon from '_assets/UploadSimple.png';
import Shop from '_assets/scuba_icons/Shop.svg';
import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';
import {
  isBelowHeightThreshold,
  isBelowWidthThreshold,
  WIDTH,
} from '_utils/constants';

interface ReviewProps {
  navigateToAdvancedDiveForm: () => void;
  formValues: InitialValues;
  id: number;
}

const Review: FunctionComponent<ReviewProps> = ({
  navigateToAdvancedDiveForm,
  formValues,
  id,
}) => {
  const { t } = useTranslation();
  const [copyMessageSet, setCopymessage] = React.useState(false);
  const activeUser = useAppSelector(selectUser);
  const onShare = async () => {
    const url = `https://zentacle.com/dive-log/${id}`;
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

  const onCopyToClipboard = () => {
    const url = `https://zentacle.com/dive-log/${id}`;
    Clipboard.setString(url);
    setCopymessage(true);
    setTimeout(() => {
      setCopymessage(false);
    }, 1000);
  };

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'dive_log__simple_completion',
    });
  }, []);

  const options = {
    AppleAppID:"1611242564",
    preferInApp:true,
    openAppStoreIfInAppFails:true,
  }

  React.useEffect(() => {
    Rate.rate(options, (success, error) => {
      if (error) {
        console.error(error);
      }
    });
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gradientContainer}>
        <GradientCircle style={styles.gradient}>
          <IoIcon
            name="checkmark-outline"
            size={isBelowHeightThreshold ? 40 : 50}
            color="#fff"
          />
        </GradientCircle>
      </View>
      <Text style={styles.mainText}>
        {t('diveLogForm.SIMPLE_LOG_CREATED_MSG')}
      </Text>

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
          <></>
        )}
      </View>

      <View style={styles.details}>
        {/* <Text style={styles.detailsTitle}>{formValues.title}</Text> */}
        <Text style={styles.locationTimestamp}>
          {new Date().toDateString()}
        </Text>
        <View style={styles.descContainer}>
          <Snorkel width={15} />
          <Text style={styles.descText}>{formValues.location?.desc}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Location width={15} />
          <Text style={styles.locationText}>
            {formValues.location?.location_city}
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
      </View>

      {/* <View style={styles.shareContainer}>
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
        <TouchableWithoutFeedback onPress={onCopyToClipboard}>
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
      </View> */}

      <View>
        <Button
          onPress={navigateToAdvancedDiveForm}
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
          {t('ADD_MORE_DETAILS')}
        </Button>
      </View>
    </ScrollView>
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
    marginTop: 20,
    marginHorizontal: '20%',
  },
  gradientContainer: {
    alignItems: 'center',
  },
  gradient: {
    width: isBelowHeightThreshold ? 80 : 100,
    height: isBelowHeightThreshold ? 80 : 100,
    borderRadius: isBelowHeightThreshold ? 40 : 50,
  },
  imageContainer: {
    marginTop: 30,
  },
  image: {
    width: isBelowWidthThreshold ? WIDTH * 0.85 : WIDTH * 0.9,
    height: 210,
    borderRadius: 20,
    alignSelf: 'center',
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
  },
  detailsTitle: {
    fontSize: 18,
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
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
    maxWidth: '50%',
    color: 'black',
  },
  locationTimestamp: {
    color: 'grey',
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginLeft: 10,
    marginTop: 4,
    color: 'black',
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
    justifyContent: 'center',
    paddingVertical: 20,
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
  diveShopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  diveShopText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
});

export default Review;

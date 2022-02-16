import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import IoIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GradientCircle from '_components/ui/GradientCircle';
import GradientText from '_components/ui/GradientText';
import Button from '_components/ui/Buttons/Button';

import { FunctionComponent } from 'react';
import type { AdvancedFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';

import DiveSiteImg from '_assets/DiveSite3.jpg';
import LocationImage from '_assets/Location.png';
import DescIcon from '_assets/DescIcon.png';
import CopyIcon from '_assets/CopySimple.png';
import UploadIcon from '_assets/UploadSimple.png';
import DepthArrow from '_assets/ArrowsDownUp.png';
import DiveTimeClock from '_assets/ClockClockwise.png';

interface ReviewProps {
  navigateToDiveLogs: () => void;
  formValues: InitialValues;
}

const Review: FunctionComponent<ReviewProps> = ({
  navigateToDiveLogs,
  formValues,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.gradientContainer}>
        <GradientCircle style={styles.gradient}>
          <IoIcon name="checkmark-outline" size={50} color="#fff" />
        </GradientCircle>
      </View>
      <Text style={styles.mainText}>
        Your dive log has been successfully recorded!
      </Text>

      <View style={styles.diveDetailsContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={DiveSiteImg} />
          <View style={styles.imageCountContainer}>
            <Icon name="image-outline" size={18} color="#FFF" />
            <Text style={styles.imageCountText}>24</Text>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailsTitle}>{formValues.name}</Text>
          <View style={styles.descContainer}>
            <Image source={DescIcon} />
            <Text style={styles.descText}>{formValues.name}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Image source={LocationImage} />
            <Text style={styles.locationText}>East bali, Indonesia</Text>
            <View style={styles.dot} />
            <Text style={styles.locationTimestamp}>
              {new Date(formValues.startDate as Date).toDateString()}
            </Text>
          </View>
          <View style={styles.timeDepthContainer}>
            <View style={styles.timeDepthItem}>
              <Image source={DiveTimeClock} />
              <View style={styles.timeDepthTextContainer}>
                <Text style={styles.timeDepthLabel}>Dive time</Text>
                <Text style={styles.timeDepthText}>
                  {formValues.timeInWater} min
                </Text>
              </View>
            </View>
            <View style={styles.timeDepthItem}>
              <Image source={DepthArrow} />
              <View style={styles.timeDepthTextContainer}>
                <Text style={styles.timeDepthLabel}>Max depth</Text>
                <Text style={styles.timeDepthText}>
                  {formValues.maxDepth} m
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.shareContainer}>
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
            Share
          </GradientText>
        </View>
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
            Copy Link
          </GradientText>
        </View>
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
          Complete
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
    fontSize: 20,
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  diveDetailsContainer: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.9,
    marginTop: 30,
    borderRadius: 20,
  },
  imageContainer: {},
  image: {
    width: Dimensions.get('window').width * 0.9,
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
  },
  descContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  descText: {
    marginLeft: 5,
    fontSize: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
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
  },
  timeDepthLabel: {
    color: 'gray',
    marginBottom: 15,
  },
});

export default Review;

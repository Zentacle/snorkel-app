import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import config from 'react-native-config';
import type { FunctionComponent } from 'react';
import type { ViewStyle, ImageStyle } from 'react-native';

import type { User } from '_utils/interfaces/data/user';
import DiveBuddyImage from '_assets/DiveSite.jpg';
import Location from '_assets/scuba_icons/Location.svg';
import Button from '_components/ui/Buttons/Button';
import { selectAuthToken } from '_redux/slices/user';
import { useAppSelector } from '_redux/hooks';

interface DiveBuddyProps {
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  onPressContainer?: (diveSpotId: number) => void;
  buddy: User;
}

const DiveBuddy: FunctionComponent<DiveBuddyProps> = props => {
  const auth_token = useAppSelector(selectAuthToken);
  const [isMessaged, setIsMessaged] = React.useState<boolean>(false);
  const [seeFullDesc, setFullDesc] = React.useState(false);
  const [shouldSeeFullDesc, setShouldSeeFullDesc] = React.useState(false);
  const makeRequest = async (id: number) => {
    const uri = `${config.API_ENDPOINT}/buddy/connect`;
    await fetch(uri, {
      method: 'POST',
      body: JSON.stringify({
        userId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      },
    });
  };

  const onTextLayout = useCallback(e => {
    setShouldSeeFullDesc(e.nativeEvent.lines.length >= 5);
  }, []);

  const content = (
    <View style={[styles.container, props.containerStyle]}>
      <View style={[styles.imageContainer, props.imageContainerStyle]}>
        {props.buddy.profile_pic ? (
          <Image
            style={[styles.image, props.imageStyle]}
            source={{
              uri: props.buddy.profile_pic,
            }}
          />
        ) : (
          <Image
            style={[styles.image, props.imageStyle]}
            source={DiveBuddyImage}
          />
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={1} style={styles.descriptionText}>
          {props.buddy.display_name}
        </Text>
        <View style={styles.locationContainer}>
          <Location width={15} />
          <Text style={styles.locationText}>{props.buddy.hometown}</Text>
        </View>
        {shouldSeeFullDesc ? (
          seeFullDesc ? (
            <Pressable onPress={() => setFullDesc(false)}>
              <View style={styles.bioContainer}>
                <Text
                  onTextLayout={onTextLayout}
                  // numberOfLines={4}
                  style={styles.bioText}>
                  {props.buddy.bio}
                </Text>
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={() => setFullDesc(true)}>
              <View style={styles.bioContainer}>
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={4}
                  style={styles.bioText}>
                  {props.buddy.bio}
                </Text>
              </View>
            </Pressable>
          )
        ) : seeFullDesc ? (
          <Pressable onPress={() => setFullDesc(false)}>
            <View style={styles.bioContainer}>
              <Text
                onTextLayout={onTextLayout}
                // numberOfLines={4}
                style={styles.bioText}>
                {props.buddy.bio}
              </Text>
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={() => setFullDesc(true)}>
            <View style={styles.bioContainer}>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={4}
                style={styles.bioText}>
                {props.buddy.bio}
              </Text>
            </View>
          </Pressable>
        )}
        <Button
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
          }}
          onPress={() => {
            if (!isMessaged) {
              makeRequest(props.buddy.id!);
              setIsMessaged(true);
            }
          }}>
          {isMessaged ? 'Message Sent' : 'Message'}
        </Button>
      </View>
    </View>
  );

  if (props.onPressContainer && typeof props.onPressContainer === 'function') {
    return <TouchableOpacity activeOpacity={0.8}>{content}</TouchableOpacity>;
  }
  return content;
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 18,
    marginBottom: 15,
  },
  imageContainer: {
    width: 300,
    height: 169,
  },
  image: {
    width: 300,
    height: 169,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
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
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  descriptionText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  locationText: {
    color: 'black',
    marginLeft: 4,
  },
  bioContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 2,
    minHeight: 70,
  },
  bioText: {
    color: 'black',
    marginLeft: 4,
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginHorizontal: 8,
    marginTop: 2,
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
  seeMoreText: {
    marginTop: 3,
    color: '#AA00FF',
    fontWeight: '500',
  },
});

export default DiveBuddy;

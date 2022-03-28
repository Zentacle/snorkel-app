import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';

import { useAppSelector } from '_redux/hooks';
import { selectLoggedInState } from '_redux/slices/user';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { FunctionComponent } from 'react';
import type { RootStackParamList } from '_utils/interfaces';

import SadEmoji from '_assets/sad-emo.png';
import GradientText from '_components/ui/GradientText';

type NotFoundNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'NotFound'
>;

interface NotFoundProps {
  navigation: NotFoundNavigationProps;
}

const NotFound: FunctionComponent<NotFoundProps> = ({ navigation }) => {
  const loggedInState = useAppSelector(selectLoggedInState);

  const navigateToExplore = () => {
    navigation.navigate('App', {
      screen: 'Explore',
    });
  };

  const navigateToLogin = () => {
    navigation.navigate('Auth', {
      screen: 'SignIn',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.messageContainer}>
          <Image style={styles.image} source={SadEmoji} />
          <Text style={styles.message}>
            Sorry, the Screen you are looking for does not exist!
          </Text>
        </View>
        {loggedInState ? (
          <Pressable onPress={navigateToExplore}>
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
              style={styles.actionText}>
              Explore
            </GradientText>
          </Pressable>
        ) : (
          <Pressable onPress={navigateToLogin}>
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
              style={styles.actionText}>
              Log In
            </GradientText>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginTop: 25,
    marginHorizontal: 25,
    alignItems: 'center',
  },
  messageContainer: {
    marginTop: Dimensions.get('window').height * 0.15,
  },
  message: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  actionText: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default NotFound;

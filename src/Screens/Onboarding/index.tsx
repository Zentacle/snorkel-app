import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  // useColorScheme,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';

import type { ImageSourcePropType } from 'react-native';

import SMButton from './components/SM-Logins';
import Button from '_components/ui/Button';
import CoverImage from '_assets/main-screen.png';
import AppleLogo from '_assets/logos/apple-logo/AppleLogo.png';
import FacebookLogo from '_assets/logos/facebook-logo/FacebookLogo.png';
import GoogleLogo from '_assets/logos/google-logo/GoogleLogo.png';

const HEIGHT = Dimensions.get('window').width;

interface ActionButtons {
  name: string;
  icon: string;
  action: () => void;
  imageSource: ImageSourcePropType;
}

const App = () => {
  const actionButtons: ActionButtons[] = [
    {
      name: 'Apple',
      icon: '',
      action: () => {},
      imageSource: AppleLogo,
    },
    {
      name: 'Google',
      icon: '',
      action: () => {},
      imageSource: GoogleLogo,
    },
    {
      name: 'Facebook',
      icon: '',
      action: () => {},
      imageSource: FacebookLogo,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={CoverImage}>
        <View>
          <View style={styles.introTextContainer}>
            <Text style={styles.introText}>
              View dive locations and reviews all over the world
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            {actionButtons.map((actionButton, index) => (
              <SMButton
                key={index}
                imageSource={actionButton.imageSource}
                style={{
                  container: {
                    backgroundColor: 'white',
                  },
                  text: {
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '800',
                  },
                }}>
                Continue with {actionButton.name}
              </SMButton>
            ))}
            <View style={styles.altDirContainer}>
              <Text style={styles.altDirText}>OR</Text>
            </View>
            <Button
              style={{
                container: {
                  backgroundColor: 'white',
                  borderRadius: 7,
                  padding: 15,
                },
                text: {
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '800',
                },
              }}>
              Email
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 1,
  },
  backgroundImage: {
    flex: 1,
    opacity: 1,
    zIndex: 0,
  },
  introTextContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
    marginTop: HEIGHT * 0.4,
  },
  introText: {
    fontSize: 32,
    fontWeight: '600',
  },
  buttonsContainer: {
    marginTop: HEIGHT * 0.06,
    marginHorizontal: 15,
  },
  altDirContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  altDirText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default App;

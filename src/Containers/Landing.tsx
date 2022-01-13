import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Button from '../Components/Button';

import CoverImage from '../../assets/main-screen.png';
const HEIGHT = Dimensions.get('window').width;

interface ActionButtons {
  name: string;
  icon: string;
  action: () => void;
}

const App = () => {
  const actionButtons: ActionButtons[] = [
    {
      name: 'Apple',
      icon: '',
      action: () => {},
    },
    {
      name: 'Google',
      icon: '',
      action: () => {},
    },
    {
      name: 'Facebook',
      icon: '',
      action: () => {},
    },
  ];
  return (
    <SafeAreaView style={styles.backgroundImage}>
      <ImageBackground style={styles.backgroundImage} source={CoverImage}>
        <View>
          <View style={styles.introTextContainer}>
            <Text style={styles.introText}>
              View dive locations and reviews all over the world
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            {actionButtons.map((actionButton, index) => (
              <Button
                key={index}
                style={{
                  container: {
                    backgroundColor: 'white',
                  },
                  text: {
                    color: 'black',
                  },
                }}>
                Continue with {actionButton.name}
              </Button>
            ))}
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
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: HEIGHT * 0.4,
  },
  introText: {
    fontSize: 32,
    fontWeight: '600',
  },
  buttonsContainer: {
    marginTop: 20,
  },
});

export default App;

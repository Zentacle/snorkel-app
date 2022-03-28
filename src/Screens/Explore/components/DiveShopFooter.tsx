import React from 'react';
import { View, StyleSheet } from 'react-native';

import type { FunctionComponent } from 'react';

import Button from '_components/ui/Buttons/Button';
import { isBelowHeightThreshold } from '_utils/constants';

interface DiveShopFooterProps {
  navigateToWebsite: () => void;
}

const DiveShopFooter: FunctionComponent<DiveShopFooterProps> = ({
  navigateToWebsite,
}) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={navigateToWebsite}
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
        View Website
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: isBelowHeightThreshold ? 100 : 114,
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: isBelowHeightThreshold ? 10 : 15,
    paddingHorizontal: 20,
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
});

export default DiveShopFooter;

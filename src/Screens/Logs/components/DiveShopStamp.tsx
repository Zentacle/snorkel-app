import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Button from '_components/ui/Buttons/Button';
import { isBelowHeightThreshold } from '_utils/constants';
import StockDiveShopLogo from 'assets/stock-dive-shop-logo.png';
import NFTSymbol from 'assets/scuba_icons/nft-symbol.svg';
import GradientCircle from '_components/ui/GradientCircle';
import FullScreenDiveStamp from './FullScreenDiveStamp';
import { DiveShopFull } from '_utils/interfaces/data/shops';

interface DiveStampProps {
  diveShop: DiveShopFull;
  dateDived: string;
}

const DiveShopStampView: React.FunctionComponent<DiveStampProps> = ({
  diveShop,
  dateDived,
}) => {
  const [fullScreenStamp, toggleFullScreenStamp] = React.useState(false);

  const openFullScreenStamp = () => {
    toggleFullScreenStamp(true);
  };
  const closeFullScreenStamp = () => {
    toggleFullScreenStamp(false);
  };

  return (
    <View style={styles.container}>
      <FullScreenDiveStamp
        isVisible={fullScreenStamp}
        closeModal={closeFullScreenStamp}
        diveShop={diveShop}
        dateDived={dateDived}
      />

      <View style={styles.labelContainer}>
        <Image
          source={
            diveShop.logo_img ? { uri: diveShop.logo_img } : StockDiveShopLogo
          }
          style={styles.diveShopLogo}
        />
        <Text style={styles.label}>{diveShop.name}</Text>
      </View>
      {diveShop.stamp_uri ? (
        <>
          <View style={styles.contentContainer}>
            <Image
              resizeMode="contain"
              source={{ uri: diveShop.stamp_uri }}
              style={styles.diveShopImage}
            />
            <GradientCircle
              gradientColors={['#DFA4FC', '#ACF3FD', '#ACF3FD']}
              style={styles.nftSymbolOuterContainer}>
              <GradientCircle style={styles.nftSymbolContainer}>
                <NFTSymbol style={styles.nftSymbol} />
              </GradientCircle>
            </GradientCircle>
          </View>
          <Button
            onPress={openFullScreenStamp}
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
            View Stamp
          </Button>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 50,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    color: 'black',
  },
  contentContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#E6ECEF',
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 12,
    paddingVertical: isBelowHeightThreshold ? 12 : 16,
    marginHorizontal: 0,
    marginVertical: isBelowHeightThreshold ? 10 : 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  diveShopLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  diveShopImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  nftSymbol: {},
  nftSymbolContainer: {
    zIndex: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  nftSymbolOuterContainer: {
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
  },
});

export default DiveShopStampView;

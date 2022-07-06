import React from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import IoIcon from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import NFTSymbol from 'assets/scuba_icons/nft-symbol-large.svg';
import NFTLarge from 'assets/NFTLarge.png';
import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';
import StockDiveShopLogo from 'assets/stock-dive-shop-logo.png';
import OpenSea from 'assets/scuba_icons/opensea.svg';
import { DiveShopFull } from '_utils/interfaces/data/shops';

import { HEIGHT, WIDTH } from '_utils/constants';

interface FullScreenDiveStampProps {
  isVisible: boolean;
  closeModal(): void;
  diveShop: DiveShopFull;
  dateDived: string;
}

const FullScreenDiveStamp: React.FunctionComponent<
  FullScreenDiveStampProps
> = ({ isVisible, closeModal, diveShop, dateDived }) => {
  return (
    <Modal
      transparent
      style={styles.modal}
      onRequestClose={closeModal}
      visible={isVisible}>
      <View style={styles.contentContainer}>
        <IoIcon
          name="close-outline"
          style={styles.closeModalIcon}
          size={30}
          color="#fff"
          onPress={closeModal}
        />

        <View style={styles.nftSymbolOuterLine}>
          <GradientCircle
            gradientColors={['#EDC8FE', '#C8F8FF', '#C8F8FF']}
            style={styles.nftSymbolOuterContainer}>
            <GradientCircle style={styles.nftSymbolContainer}>
              <NFTSymbol style={styles.nftSymbol} />
            </GradientCircle>
          </GradientCircle>
        </View>

        <GradientBox style={styles.nftBoxContainer}>
          <Image source={{ uri: diveShop.stamp_uri }} style={styles.nftItem} />
        </GradientBox>

        <View style={styles.diveShopContainer}>
          <View style={styles.diveShopLabelContainer}>
            <Image source={StockDiveShopLogo} style={styles.diveShopLogo} />
            <Text style={styles.diveShopLabel}>{diveShop.name}</Text>
          </View>
          <View style={styles.diveShopSubTextContainer}>
            <Text style={styles.verifiedText}>Verified Dive Stamp</Text>
            <Text style={styles.dateStamp}>
              {format(new Date(dateDived), 'MM/dd/yyyy')}
            </Text>
          </View>
        </View>

        <View style={styles.openSeaContainer}>
          <OpenSea />
          <Text style={styles.openSeaText}>View on OpenSea</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  modal: {},
  contentContainer: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    flex: 1,
  },
  closeModalIcon: {
    alignSelf: 'flex-end',
    marginTop: 40,
    marginRight: 20,
    zIndex: 5,
  },
  nftSymbol: {},
  nftSymbolContainer: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nftSymbolOuterContainer: {
    padding: 5,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
  },
  nftSymbolOuterLine: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignSelf: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nftBoxContainer: {
    height: WIDTH - 30,
    padding: 3,
    width: WIDTH - 30,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: HEIGHT * 0.13,
  },
  nftItem: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  diveShopContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  diveShopLabel: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 15,
  },
  diveShopLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveShopLogo: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  diveShopSubTextContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    color: 'white',
    fontSize: 16,
  },
  dateStamp: {
    color: 'white',
    marginLeft: 20,
    fontSize: 16,
  },
  openSeaContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  openSeaText: {
    color: 'white',
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default FullScreenDiveStamp;

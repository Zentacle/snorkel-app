import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import DiveSiteImage from 'assets/DiveSite.jpg';
import { WIDTH, isBelowHeightThreshold } from '_utils/constants';
import Button from '_components/ui/Buttons/Button';

import type { FunctionComponent } from 'react';

interface Features {
  label: string;
  isFree: boolean;
  isPro: boolean;
}

const features: Features[] = [
  {
    label: 'Log dives manually',
    isFree: true,
    isPro: true,
  },
  {
    label: 'Reaearch 11k+ dive sites',
    isFree: true,
    isPro: true,
  },
  {
    label: 'Sync your dive computer',
    isFree: false,
    isPro: true,
  },
  {
    label: 'Keep dive logs private',
    isFree: false,
    isPro: true,
  },
  {
    label: 'Find a dive buddy',
    isFree: false,
    isPro: true,
  },
  {
    label: '1GB of photo/video uploads',
    isFree: false,
    isPro: true,
  },
  {
    label: 'Download offline details',
    isFree: false,
    isPro: true,
  },
];

interface ProUpsellDisplayProps {}

const ProUpsellDisplay: FunctionComponent<ProUpsellDisplayProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <Image source={DiveSiteImage} style={styles.image} />
        <View style={styles.introTextContainer}>
          <Text style={styles.mainText}>Your first week is on us</Text>
          <Text style={styles.subText}>
            Get 1 week free, then only $5/month
          </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeaderContainer}>
            <Text style={[styles.tableLabelHeaderText]}>FEATURES</Text>
            <View style={styles.tierHeader}>
              <View style={styles.freeHeaderContainer}>
                <Text style={styles.freeTableHeaderText}>FREE</Text>
              </View>
              <View style={styles.proContainer}>
                <Text style={styles.proTableHeaderText}>PRO</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableBodyContainer}>
            {features.map((feature, index) => (
              <View
                style={[
                  styles.tableBodyItem,
                  index % 2 === 0 && styles.tableBodyItemEven,
                ]}
                key={index}>
                <Text style={styles.tableBodyLabelText}>{feature.label}</Text>
                <View style={styles.tierBody}>
                  <View style={styles.freeBodyContainer}>
                    {!!feature.isFree && (
                      <Icon name="checkmark-circle" size={20} color="#26BC2A" />
                    )}
                  </View>
                  <View style={styles.proBodyContainer}>
                    {!!feature.isPro && (
                      <Icon name="checkmark-circle" size={20} color="#26BC2A" />
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          // onPress={disabled ? emptyFunc : next}
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
          Start your free trial
        </Button>
        <Text style={styles.cancelAnyTimeText}>
          Cancel anytime. We&apos;ll send you an email reminder the day before
          your trial ends
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  mainBody: {
    flex: 1,
  },
  image: {
    height: 250,
    width: Dimensions.get('window').width,
  },
  mainText: {
    color: 'black',
    fontSize: 31,
    fontWeight: '700',
    marginBottom: 10,
  },
  subText: {
    color: 'black',
    marginTop: 10,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },
  introTextContainer: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  tableContainer: {
    marginHorizontal: 25,
    marginTop: 20,
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
  tableLabelHeaderText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
  proTableHeaderText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  freeTableHeaderText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  freeHeaderContainer: {
    width: WIDTH * 0.12,
  },
  proContainer: {
    backgroundColor: '#DC4C2C',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 3,
    width: WIDTH * 0.12,
  },
  tableBodyContainer: {
    marginTop: 10,
  },
  tableBodyText: {
    color: 'black',
    fontSize: 14,
  },
  tierBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proBodyContainer: {
    width: WIDTH * 0.12,
    alignItems: 'center',
  },
  freeBodyContainer: {
    width: WIDTH * 0.12,
    alignItems: 'center',
  },
  tableBodyItem: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
  },
  tableBodyItemEven: {
    backgroundColor: '#D9D9D9',
  },
  tableBodyLabelText: {
    marginLeft: 7,
  },
  footer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 25,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    marginTop: 20,
    marginHorizontal: 0,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  cancelAnyTimeText: {
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default ProUpsellDisplay;

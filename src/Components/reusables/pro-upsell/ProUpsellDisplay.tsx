import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Purchases, {
  PurchasesOffering,
  PurchasesOfferings,
  PurchasesPackage,
  PACKAGE_TYPE,
} from 'react-native-purchases';

import DefaultHeroBackground from 'assets/default_hero_background.png';
import { WIDTH } from '_utils/constants';
import Button from '_components/ui/Buttons/Button';
import { sendEvent } from '_utils/functions/amplitude';
import { useAppDispatch } from '_redux/hooks';
import { getCurrentUser } from '_redux/slices/user';

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
    label: 'Research 11k+ dive sites',
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
    label: 'Upload logs while offline',
    isFree: false,
    isPro: true,
  },
  {
    label: 'Support development of the app 🙏',
    isFree: false,
    isPro: true,
  },
];

interface ProUpsellDisplayProps {
  isModal?: boolean;
  closeAction: () => void;
  closeText?: string;
  navigateToWebView: (url: string) => void;
  source: string;
}

const ProUpsellDisplay: FunctionComponent<ProUpsellDisplayProps> = ({
  isModal,
  closeAction,
  closeText,
  navigateToWebView,
  source,
}) => {
  const [selectedPackage, setSelectedPackage] =
    React.useState<PurchasesPackage | null>(null);
  const [proPackage, setPackage] = React.useState<PurchasesOffering | null>();
  const [purchaseError, setPurchaseError] = React.useState<string | null>();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    sendEvent('page_view', {
      type: 'pro_upsell',
      upsell: source,
    });

    fetchOfferings();
  }, [source]);

  const fetchOfferings = async () => {
    try {
      const offerings: PurchasesOfferings = await Purchases.getOfferings();
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        setPackage(offerings.current);
        setSelectedPackage(offerings.current.annual);
      }
    } catch (err: any) {
      Alert.alert('Error fetching offerings', err.message);
    }
  };

  const navigateToTerms = () => {
    navigateToWebView('https://www.zentacle.com/terms');
    if (isModal) {
      closeAction();
    }
  };

  const navigateToPolicy = () => {
    navigateToWebView('https://www.zentacle.com/legal.htm');
    if (isModal) {
      closeAction();
    }
  };

  const purchasePackage = async () => {
    try {
      setLoading(true);

      sendEvent('pro__click', {
        screen: 'pro_upsell',
        upsell: source,
      });

      await Purchases.purchasePackage(selectedPackage as PurchasesPackage);

      sendEvent('pro__register', {
        screen: 'pro_upsell',
        upsell: source,
      });

      setPurchaseError(null);
      await dispatch(getCurrentUser());
      closeAction();
    } catch (err: any) {
      setPurchaseError(err.message);

      setTimeout(() => {
        setPurchaseError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!proPackage) {
    return (
      <ActivityIndicator
        style={{
          marginTop: Dimensions.get('window').height * 0.4,
        }}
        size="large"
        color="black"
      />
    );
  }

  const standardPrice = proPackage.monthly?.product.price || 5;

  return (
    <View style={styles.container}>
      {isModal ? (
        <Pressable
          style={props => ({
            opacity: props.pressed ? 0.7 : 1,
            ...styles.closeIconContainer,
          })}
          onPress={closeAction}>
          <Icon name="close" size={25} color="gray" />
        </Pressable>
      ) : (
        <Pressable
          style={props => ({
            opacity: props.pressed ? 0.7 : 1,
            ...styles.closeTextContainer,
          })}
          onPress={closeAction}>
          <Text style={styles.closeText}>{closeText || 'Skip'}</Text>
        </Pressable>
      )}
      <ScrollView style={styles.mainBody} showsVerticalScrollIndicator={false}>
        <Image source={DefaultHeroBackground} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.introTextContainer}>
            <Text style={styles.mainText}>{proPackage.serverDescription}</Text>
            <Text style={styles.subText}>
              {`Start with a free trial today! Cancel anytime.`}
            </Text>
          </View>

          <View style={styles.packageSectionContainer}>
            {proPackage.availablePackages.map(pkg => {
              const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              });
              const percentFormatter = new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
              });
              const monthsInPeriod: Record<PACKAGE_TYPE, number> = {
                [PACKAGE_TYPE.ANNUAL]: 12,
                [PACKAGE_TYPE.MONTHLY]: 1,
                [PACKAGE_TYPE.SIX_MONTH]: 6,
                [PACKAGE_TYPE.THREE_MONTH]: 3,
                [PACKAGE_TYPE.TWO_MONTH]: 2,
                [PACKAGE_TYPE.WEEKLY]: 0.25,
                [PACKAGE_TYPE.LIFETIME]: 36,
                [PACKAGE_TYPE.CUSTOM]: 1,
                [PACKAGE_TYPE.UNKNOWN]: 1,
              };
              const monthlyPrice =
                pkg.product.price / monthsInPeriod[pkg.packageType];

              return (
                <Pressable
                  style={[
                    styles.proPackageContainer,
                    selectedPackage?.identifier == pkg.identifier &&
                      styles.selectedPackage,
                  ]}
                  key={pkg.identifier}
                  onPress={() => setSelectedPackage(pkg)}>
                  {pkg.packageType === PACKAGE_TYPE.ANNUAL && (
                    <View style={styles.proMostPopularContainer}>
                      <Text style={styles.proMostPopularText}>
                        Most Popular
                      </Text>
                    </View>
                  )}
                  <View style={styles.proHeader}>
                    <Text style={styles.proHeaderText}>{pkg.packageType}</Text>
                  </View>
                  <View style={styles.proText}>
                    <Text style={styles.proPrice}>
                      {pkg.product.priceString}
                    </Text>
                    <Text style={styles.proPriceMonthly}>
                      ({formatter.format(monthlyPrice)}
                      /mo)
                    </Text>
                    {pkg.packageType !== PACKAGE_TYPE.MONTHLY && (
                      <Text style={styles.proDiscount}>
                        SAVE{' '}
                        {percentFormatter.format(
                          (monthlyPrice / standardPrice) * 100,
                        )}
                        %
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
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
                        <Icon
                          name="checkmark-circle"
                          size={20}
                          color="#26BC2A"
                        />
                      )}
                    </View>
                    <View style={styles.proBodyContainer}>
                      {!!feature.isPro && (
                        <Icon
                          name="checkmark-circle"
                          size={20}
                          color="#26BC2A"
                        />
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.termsContainer}>
            <Pressable
              style={state => ({
                opacity: state.pressed ? 0.7 : 1,
              })}
              onPress={navigateToPolicy}>
              <Text style={styles.terms}>Privacy Policy</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable
              style={state => ({
                opacity: state.pressed ? 0.7 : 1,
              })}
              onPress={navigateToTerms}>
              <Text style={styles.terms}>Terms of Service</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          onPress={purchasePackage}
          disabled={!proPackage || loading}
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
          {proPackage && !loading ? (
            'Start your free trial'
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
        </Button>
        {!!purchaseError && (
          <Text style={styles.purhaseError}>{purchaseError}</Text>
        )}
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
    height: 150,
    width: Dimensions.get('window').width,
    // backgroundColor: 'black',
  },
  contentContainer: {
    paddingHorizontal: 25,
  },
  mainText: {
    color: 'black',
    fontSize: 31,
    fontWeight: '700',
  },
  subText: {
    color: 'black',
    marginTop: 4,
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 5,
  },
  introTextContainer: {
    marginTop: 30,
  },
  tableContainer: {
    marginTop: 10,
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
    color: 'black',
  },
  footer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 25,
    // position: 'absolute',
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
    color: 'black',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeTextContainer: {
    position: 'absolute',
    top: 55,
    right: 25,
    zIndex: 1,
    backgroundColor: 'whitesmoke',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  closeText: {
    color: 'black',
    fontSize: 17,
  },
  purhaseError: {
    color: 'red',
    fontSize: 14,
    marginVertical: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  terms: {
    fontSize: 12,
    color: 'black',
  },
  divider: {
    borderLeftColor: 'black',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'black',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    marginHorizontal: 5,
    height: 10,
  },
  packageSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
  },
  proPackageContainer: {
    borderRadius: 10,
    flexBasis: 150,
    position: 'relative',
    borderColor: '#cecece',
    borderWidth: 2,
  },
  proHeader: {
    borderTopEndRadius: 8,
    borderTopLeftRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#AA00FF',
  },
  proHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  proText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  proPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  proPriceMonthly: {
    marginTop: 4,
    textAlign: 'center',
  },
  proDiscount: {
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
    overflow: 'hidden',
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  selectedPackage: {
    borderColor: '#AA00FF',
    borderWidth: 2,
  },
  proMostPopularContainer: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    zIndex: 999,
    textAlign: 'center',
  },
  proMostPopularText: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 20,
    overflow: 'hidden',
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProUpsellDisplay;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import FEIcon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';

import type { FunctionComponent } from 'react';

import SadEmoji from '_assets/sad-emo.png';

interface NoLogProps {
  goBack: () => void;
}

const NoLog: FunctionComponent<NoLogProps> = ({ goBack }) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={goBack}>
          <FEIcon name="chevron-left" color="black" size={25} />
        </TouchableWithoutFeedback>
        <View style={styles.messageContainer}>
          <Image style={styles.image} source={SadEmoji} />
          <Text style={styles.message}>{t('diveLogs.DIVE_LOG_NOT_EXIST')}</Text>
        </View>
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
  },
  messageContainer: {
    marginTop: Dimensions.get('window').height * 0.15,
  },
  message: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default NoLog;

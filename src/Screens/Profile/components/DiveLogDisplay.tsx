import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';

import LogCarousel from './LogCarousel';

import type { FunctionComponent } from 'react';
import { AdvancedFormInitialValues } from '_utils/interfaces/data/logs';

interface DiveLogDisplayProps {
  diveLog: AdvancedFormInitialValues;
  navigateToDiveLog: (diveLogId: number) => void;
}

const DiveLogDisplay: FunctionComponent<DiveLogDisplayProps> = ({
  diveLog,
  navigateToDiveLog,
}) => {
  const { t } = useTranslation();
  const handleNavigateToDiveLog = () => navigateToDiveLog(diveLog.id as number);
  return (
    <View style={styles.container}>
      { diveLog.images.length > 0 && <LogCarousel images={diveLog.images} /> }
      <Text style={styles.diveLogLabel}>{diveLog.title}</Text>
      <View style={styles.diveLogLinkContainer}>
        <TouchableWithoutFeedback onPress={handleNavigateToDiveLog}>
          <Text style={styles.diveLogLink}>{t('VIEW_DIVE_LOG')}</Text>
        </TouchableWithoutFeedback>
        <View style={styles.diveLogDot} />
        <Text style={styles.diveLogDate}>{diveLog.date_dived || diveLog.date_posted}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  diveLogLabel: {
    fontWeight: '800',
    fontSize: 17,
    marginTop: 15,
    color: 'black',
  },
  diveLogLinkContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveLogLink: {
    fontWeight: '700',
    fontSize: 15,
    marginRight: 5,
    color: '#1693D3',
  },
  diveLogDate: {
    marginLeft: 5,
    color: 'grey',
  },
  diveLogDot: {
    marginVertical: 2,
    backgroundColor: 'grey',
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
  },
});

export default DiveLogDisplay;

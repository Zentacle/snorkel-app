import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import formatDuration from 'format-duration';
import { useTranslation } from 'react-i18next';

import GradientBox from '_components/ui/GradientBox';

import LogColor from '_assets/log-color-lar.png';
import Location from '_assets/location-lar.png';
import Clock from '_assets/clock-lar.png';

import type { FunctionComponent } from 'react';
import { AdvancedFormInitialValues } from '_utils/interfaces/data/logs';

interface DiveLogSummaryProps {
  diveLogs: AdvancedFormInitialValues[];
}

function calculateTotalDiveTime(diveLogs: AdvancedFormInitialValues[]) {
  let total = 0;
  for (let log of diveLogs) {
    if (log.timeInWater) {
      total += log.timeInWater;
    }
  }

  if (!total) return 0;
  return formatDuration(total * 60000);
}

function calculateVisitedSites(diveLogs: AdvancedFormInitialValues[]): number {
  let locationHashMap: { [key: string]: string } = {};
  let total = 0;

  for (let log of diveLogs) {
    if (log.location?.desc) {
      if (!locationHashMap[log.location?.desc]) {
        locationHashMap[log.location.desc] = log.location.desc;
        total += 1;
      }
    }
  }

  return total;
}

const DiveLogSummary: FunctionComponent<DiveLogSummaryProps> = ({
  diveLogs,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <GradientBox style={styles.diveLogSummaryGradient}>
        <View style={styles.diveLogSummaryBox}>
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Image
                style={{ width: 25, height: 25, marginBottom: 5 }}
                source={Clock}
              />
              <Text style={styles.summaryValue}>
                {calculateTotalDiveTime(diveLogs) || '0:00:00'}
              </Text>
              <Text style={styles.summaryLabel}>{t('TOTAL_DIVE_TIME')}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Image
                style={{ width: 25, height: 25, marginBottom: 5 }}
                source={LogColor}
              />
              <Text style={styles.summaryValue}>{diveLogs.length}</Text>
              <Text style={styles.summaryLabel}>{t('DIVE_LOGS')}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Image
                style={{ width: 20, height: 25, marginBottom: 5 }}
                source={Location}
              />
              <Text style={styles.summaryValue}>
                {calculateVisitedSites(diveLogs)}
              </Text>
              <Text style={styles.summaryLabel}>
                {calculateVisitedSites(diveLogs) === 1
                  ? t('VISITED_SITE')
                  : t('VISITED_SITES')}
              </Text>
            </View>
          </View>
        </View>
      </GradientBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  diveLogSummaryGradient: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
  },
  diveLogSummaryBox: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    // height: '100%',
  },
  summary: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 20,
  },
  summaryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  summaryLabel: {
    marginVertical: 3,
    color: 'black',
    textAlign: 'center',
  },
  summaryValue: {
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 3,
    color: 'black',
    textAlign: 'center',
  },
});

export default DiveLogSummary;

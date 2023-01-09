import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import formatDuration from 'format-duration';
import { useTranslation } from 'react-i18next';

import GradientBox from '_components/ui/GradientBox';

import Snorkel from '_assets/scuba_icons/snorkel.svg';
import Location from '_assets/scuba_icons/Location.svg';
import Clock from '_assets/clock-lar.png';

import type { FunctionComponent } from 'react';
import { DiveLogsState } from '_utils/interfaces/data/logs';

interface DiveLogSummaryProps {
  diveLogs: DiveLogsState[];
}

function calculateTotalDiveTime(diveLogs: DiveLogsState[]) {
  let total = 0;
  for (let log of diveLogs) {
    if (log.dive_length) {
      total += log.dive_length;
    }
  }

  if (!total) return 0;
  return formatDuration(total * 60000);
}

function calculateVisitedSites(diveLogs: DiveLogsState[]): number {
  let locationHashMap: { [key: string]: string } = {};
  let total = 0;

  for (let log of diveLogs) {
    if (log.spot.name) {
      if (!locationHashMap[log.spot.name]) {
        locationHashMap[log.spot.name] = log.spot.name;
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
              <View style={styles.iconContainer}>
                <Image
                  style={{ width: 25, height: 25, marginBottom: 5 }}
                  source={Clock}
                />
              </View>
              <Text style={styles.summaryValue}>
                {calculateTotalDiveTime(diveLogs) || '0:00:00'}
              </Text>
              <Text style={styles.summaryLabel}>{t('TOTAL_DIVE_TIME')}</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={styles.iconContainer}>
                <Snorkel width={25} height={25} />
              </View>
              <Text style={styles.summaryValue}>{diveLogs.length}</Text>
              <Text style={styles.summaryLabel}>{t('DIVE_LOGS')}</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={styles.iconContainer}>
                <Location width={25} height={25} />
              </View>

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
    justifyContent: 'space-between',
    width: '30%',
  },
  summaryLabel: {
    color: 'black',
    textAlign: 'center',
    height: 40,
    marginTop: 4,
  },
  summaryValue: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 4,
    color: 'black',
    textAlign: 'center',
  },
  iconContainer: {
    height: 30,
  },
});

export default DiveLogSummary;

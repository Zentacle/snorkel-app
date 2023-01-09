import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import type { FunctionComponent } from 'react';
import type { DiveLogsState } from '_utils/interfaces/data/logs';

import LogItem from './LogItem';
import { isBelowHeightThreshold } from '_utils/constants';

interface LogListProps {
  navigateToDetail: (diveLogId: number) => void;
  diveLogs: DiveLogsState[];
}
const LogsList: FunctionComponent<LogListProps> = ({
  navigateToDetail,
  diveLogs,
}) => {
  return (
    <View style={styles.container}>
      {diveLogs.map(diveLog => (
        <Pressable
          key={diveLog.id}
          onPress={() => navigateToDetail(diveLog.id as number)}>
          <LogItem diveLog={diveLog} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});

export default LogsList;

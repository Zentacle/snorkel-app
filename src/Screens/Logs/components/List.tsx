import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import type { FunctionComponent } from 'react';
import type { AdvancedFormInitialValues as DiveLog } from '_utils/interfaces/data/logs';

import LogItem from './LogItem';
import { isBelowHeightThreshold } from '_utils/constants';

interface LogListProps {
  navigateToDetail: (diveLogId: number) => void;
  diveLogs: DiveLog[];
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
    paddingTop: isBelowHeightThreshold ? 10 : 10,
  },
});

export default LogsList;

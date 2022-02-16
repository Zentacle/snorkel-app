import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import type { FunctionComponent } from 'react';
import type { AdvancedFormInitialValues as DiveLog } from '_utils/interfaces/data/logs';

import LogItem from './LogItem';

interface LogListProps {
  navigateToDetail: (diveLog: DiveLog) => void;
  diveLogs: DiveLog[];
}
const LogsList: FunctionComponent<LogListProps> = ({
  navigateToDetail,
  diveLogs,
}) => {
  return (
    <View style={styles.container}>
      {diveLogs.map(diveLog => (
        <TouchableOpacity
          key={diveLog.id}
          onPress={() => navigateToDetail(diveLog)}>
          <LogItem diveLog={diveLog} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margonTop: 30,
    paddingTop: 20,
  },
});

export default LogsList;

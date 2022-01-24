import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { LogsFormStackParamList } from '_utils/interfaces';

const LogsFormNavigator: React.FC = () => {
  const LogsStack = createNativeStackNavigator<LogsFormStackParamList>();

  return (
    <LogsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <LogsStack.Screen name="SimpleLogsForm" component={DiveLogsForm} /> */}
    </LogsStack.Navigator>
  );
};

export default LogsFormNavigator;

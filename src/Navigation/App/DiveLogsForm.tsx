import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { LogsFormStackParamList } from '_utils/interfaces';

import DiveLogsForm from '_screens/DiveLogsForms';

const LogsFormNavigator: React.FC = () => {
  const LogsStack = createNativeStackNavigator<LogsFormStackParamList>();

  return (
    <LogsStack.Navigator
      initialRouteName="SimpleLogsForm"
      screenOptions={{
        headerShown: false,
      }}>
      <LogsStack.Screen name="SimpleLogsForm" component={DiveLogsForm} />
    </LogsStack.Navigator>
  );
};

export default LogsFormNavigator;

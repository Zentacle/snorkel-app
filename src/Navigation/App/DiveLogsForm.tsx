import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SimpleDiveLogsForms from '_screens/DiveLogsForms';
import AdvancedDiveLogsForm from '_screens/DiveLogsForms/AdvancedDiveLogsForm';

import type { LogsFormStackParamList } from '_utils/interfaces';

const LogsFormNavigator: React.FC = () => {
  const LogsStack = createNativeStackNavigator<LogsFormStackParamList>();

  return (
    <LogsStack.Navigator
      initialRouteName="SimpleDiveLogsForm"
      screenOptions={{
        headerShown: false,
      }}>
      <LogsStack.Screen
        name="SimpleDiveLogsForm"
        component={SimpleDiveLogsForms}
      />
      <LogsStack.Screen
        name="AdvancedDiveLogsForm"
        component={AdvancedDiveLogsForm}
      />
    </LogsStack.Navigator>
  );
};

export default LogsFormNavigator;

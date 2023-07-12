import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdvancedDiveLogsForm from '_screens/DiveLogsForms/AdvancedDiveLogsForm';

import type { LogsFormStackParamList } from '_utils/interfaces';
import NewDiveSite from '_screens/DiveLogsForms/NewDiveSite';

const LogsFormNavigator: React.FC = () => {
  const LogsStack = createNativeStackNavigator<LogsFormStackParamList>();

  return (
    <LogsStack.Navigator
      initialRouteName="AdvancedDiveLogsForm"
      screenOptions={{
        headerShown: false,
      }}>
      <LogsStack.Screen
        name="AdvancedDiveLogsForm"
        component={AdvancedDiveLogsForm}
      />
      <LogsStack.Screen
        name="NewDiveSite"
        component={NewDiveSite}
        options={{ headerShown: false }}
      />
    </LogsStack.Navigator>
  );
};

export default LogsFormNavigator;

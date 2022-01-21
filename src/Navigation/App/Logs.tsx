import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { LogsStackParamList } from '_utils/interfaces';

import Logs from '_screens/Logs';

const LogsNavigator: React.FC = () => {
  const LogsStack = createNativeStackNavigator<LogsStackParamList>();

  return (
    <LogsStack.Navigator
      initialRouteName="Logs"
      screenOptions={{
        headerShown: false,
      }}>
      <LogsStack.Screen name="Logs" component={Logs} />
    </LogsStack.Navigator>
  );
};

export default LogsNavigator;

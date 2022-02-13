import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logs from '_screens/Logs';

import type { LogsStackParamList } from '_utils/interfaces';

const LogsNavigator: React.FC = () => {
  const LogsStack = createNativeStackNavigator<LogsStackParamList>();

  return (
    <LogsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LogList">
      <LogsStack.Screen name="LogList" component={Logs} />
    </LogsStack.Navigator>
  );
};

export default LogsNavigator;

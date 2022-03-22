import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Log from '_screens/Logs/Log';

import type { LogsStackParamList } from '_utils/interfaces';

const LogsNavigator: React.FC = () => {
  const LogsStack = createNativeStackNavigator<LogsStackParamList>();

  return (
    <LogsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LogDetail">
      <LogsStack.Screen name="LogDetail" component={Log} />
    </LogsStack.Navigator>
  );
};

export default LogsNavigator;

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SettingStackParamList } from '_utils/interfaces';

import Settings from '_screens/Settings';
import ChangePassword from '_screens/Settings/ChangePassword';
import ProfileSettings from '_screens/Settings/ProfileSettings';
import TypeUnits from '_screens/Settings/TypeUnits';
import DiveActivities from '_screens/Settings/DiveActivities';
import TermsAndConditions from '_screens/Settings/TermsAndConditions';
import PrivacyPolicy from '_screens/Settings/PrivacyPolicy';
import HelpCenter from '_screens/Settings/HelpCenter';
import Language from '_screens/Settings/Language';

const SettingNavigator: React.FC = () => {
  const SettingStack = createNativeStackNavigator<SettingStackParamList>();
  return (
    <SettingStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <SettingStack.Screen name="Settings" component={Settings} />
      <SettingStack.Screen name="ChangePassword" component={ChangePassword} />
      <SettingStack.Screen name="ProfileSettings" component={ProfileSettings} />
      <SettingStack.Screen name="TypeUnits" component={TypeUnits} />
      <SettingStack.Screen name="DiveActivities" component={DiveActivities} />
      <SettingStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <SettingStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <SettingStack.Screen name="HelpCenter" component={HelpCenter} />
      <SettingStack.Screen name="Language" component={Language} />
    </SettingStack.Navigator>
  );
};

export default SettingNavigator;

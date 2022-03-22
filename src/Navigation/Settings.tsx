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

const OnboardingNavigator: React.FC = () => {
  const OnboardingStack = createNativeStackNavigator<SettingStackParamList>();
  return (
    <OnboardingStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <OnboardingStack.Screen name="Settings" component={Settings} />
      <OnboardingStack.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
      <OnboardingStack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
      />
      <OnboardingStack.Screen name="TypeUnits" component={TypeUnits} />
      <OnboardingStack.Screen
        name="DiveActivities"
        component={DiveActivities}
      />
      <OnboardingStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <OnboardingStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <OnboardingStack.Screen name="HelpCenter" component={HelpCenter} />
      <OnboardingStack.Screen name="Language" component={Language} />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigator;

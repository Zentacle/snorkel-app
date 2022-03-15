import { SettingStackParamList } from '_utils/interfaces';

export interface Page {
  label: string;
  icon: string;
  component: keyof SettingStackParamList;
}
export const accountPages: Page[] = [
  {
    label: 'Profile Settings',
    icon: 'account-outline',
    component: 'ProfileSettings',
  },
  {
    label: 'Change Password',
    icon: 'lock-outline',
    component: 'ChangePassword',
  },
  {
    label: 'Type Units',
    icon: 'alpha-t-box-outline',
    component: 'TypeUnits',
  },
  {
    label: 'Dive Activities',
    icon: 'diving-snorkel',
    component: 'DiveActivities',
  },
];

export const morePages: Page[] = [
  {
    label: 'Terms & Conditions',
    icon: 'check-circle-outline',
    component: 'TermsAndConditions',
  },

  {
    label: 'Privacy Policy',
    icon: 'shield-alert-outline',
    component: 'PrivacyPolicy',
  },
  {
    label: 'Help',
    icon: 'help-circle-outline',
    component: 'HelpCenter',
  },
  {
    label: 'Language',
    icon: 'translate',
    component: 'Language',
  },
];

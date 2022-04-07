import { useTranslation } from 'react-i18next';

import { SettingStackParamList } from '_utils/interfaces';

export interface Page {
  label: string;
  icon: string;
  component: keyof SettingStackParamList;
}

export function usePages() {
  const { t } = useTranslation();
  const accountPages: Page[] = [
    {
      label: t('PROFILE_SETTINGS'),
      icon: 'account-outline',
      component: 'ProfileSettings',
    },
    {
      label: t('CHANGE_PASSWORD'),
      icon: 'lock-outline',
      component: 'ChangePassword',
    },
    {
      label: t('TYPE_UNITS'),
      icon: 'alpha-t-box-outline',
      component: 'TypeUnits',
    },
    {
      label: t('DIVE_ACTIVITIES'),
      icon: 'diving-snorkel',
      component: 'DiveActivities',
    },
  ];

  const morePages: Page[] = [
    {
      label: t('TERMS_AND_CONDITIONS'),
      icon: 'check-circle-outline',
      component: 'TermsAndConditions',
    },

    {
      label: t('PRIVACY_POLICY'),
      icon: 'shield-alert-outline',
      component: 'PrivacyPolicy',
    },
    {
      label: t('HELP'),
      icon: 'help-circle-outline',
      component: 'HelpCenter',
    },
    {
      label: t('LANGUAGE'),
      icon: 'translate',
      component: 'Language',
    },
  ];

  return { accountPages, morePages };
}

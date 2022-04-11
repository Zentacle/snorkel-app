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

export interface Language {
  name: string;
  label: string;
}

export const languages: Language[] = [
  {
    name: 'en',
    label: 'English',
  },
  {
    name: 'es',
    label: 'Espanol',
  },
  {
    name: 'fr',
    label: 'Francais',
  },
  {
    name: 'nl',
    label: 'Deutsch',
  },
  {
    name: 'it',
    label: 'Italiano',
  },
  {
    name: 'nn',
    label: 'Nynorsk',
  },
  {
    name: 'fi',
    label: 'Suomi',
  },
  {
    name: 'hu',
    label: 'Magyar',
  },

  {
    name: 'tr',
    label: 'Turkey',
  },
  {
    name: 'pl',
    label: 'Polski',
  },
  {
    name: 'ro',
    label: 'Romana',
  },
];

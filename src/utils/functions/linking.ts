import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '_utils/interfaces';

const config = {
  screens: {
    Auth: {
      screens: {
        SignIn: 'login',
      },
    },
    LogsStack: {
      screens: {
        LogDetail: 'dive-log/:diveLogId',
      },
    },
    App: {
      screens: {
        Explore: '*',
        LogsForm: 'Log',
      },
    },
    ExploreStack: {
      screens: {
        DiveSite: {
          path: 'Beach/:diveSpotId/:wildcard?',
        },
      },
    },
  },
};

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    'zentacle://',
    'https://zentacle.com/',
    'https://zentacle.app.link/',
  ],
  config,
};

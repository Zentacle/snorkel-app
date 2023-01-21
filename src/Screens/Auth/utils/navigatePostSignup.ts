import { CompositeNavigationProp } from '@react-navigation/native';
import { LoginResponse } from '_utils/interfaces/data/user';

const navigateToFirstPro = (navigation: CompositeNavigationProp<any, any>) => {
  navigation.navigate('OnBoarding', {
    screen: 'ProUpsellFirst',
  });
};

const navigateToApp = (navigation: CompositeNavigationProp<any, any>) => {
  navigation.navigate('App', {
    screen: 'Explore',
  });
};

const navigateToOnBoarding = (navigation: CompositeNavigationProp<any, any>) => {
  navigation.navigate('OnBoarding', {
    screen: 'ChooseAvatar',
  });
};

const navigatePostSignup = (payload: LoginResponse, navigation: CompositeNavigationProp<any, any>) => {
  if (payload.data.type === 'login') {
    if (!payload.user.has_pro) {
      navigateToFirstPro(navigation);
    } else {
      navigateToApp(navigation);
    }
    return;
  }

  if (!payload.user.has_pro) {
    navigateToFirstPro(navigation);
  } else {
    navigateToOnBoarding(navigation);
  }
}

export default navigatePostSignup;

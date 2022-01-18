import AppleLogo from '_assets/logos/apple-logo/AppleLogo.png';
import FacebookLogo from '_assets/logos/facebook-logo/FacebookLogo.png';
import GoogleLogo from '_assets/logos/google-logo/GoogleLogo.png';
import type { ActionButtons } from './interfaces';

export const actionButtons: ActionButtons[] = [
  {
    name: 'Apple',
    icon: '',
    action: () => {},
    imageSource: AppleLogo,
  },
  {
    name: 'Google',
    icon: '',
    action: () => {},
    imageSource: GoogleLogo,
  },
  {
    name: 'Facebook',
    icon: '',
    action: () => {},
    imageSource: FacebookLogo,
  },
];

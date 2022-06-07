import type { User } from './user';
export interface DiveShopSimple {
  id: number;
  name: string;
  url: string;
  logo_img: string;
  fareharbor_url: string;
  city: string;
  state: string;
  address1: string;
  address2: string;
}

export interface DiveShopFull extends DiveShopSimple {
  latitude: number;
  longitude: number;
  stamp_uri: string;
  owner_user_id: number;
  owner: User;
}

export interface DiveShopInitialValues {
  name: string;
  city: string;
  state: string;
  address1: string;
  address2: string;
  imageObj: {};
  logo_img: string;
}

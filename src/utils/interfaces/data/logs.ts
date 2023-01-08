import { Spot } from './spot';
import { User } from './user';
import { DiveShopFull } from './shops';
export interface FormImages {
  uri: string;
  type?: string;
  name: string;
}

export interface DiveShopSearchResult {
  shop_id: number;
  name: string;
  location_city: string;
}
export interface SimpleFormInitialValues {
  id: number;
  rating: number;
  difficulty: string;
  title?: string;
  text?: string;
  activity_type?: string;
  location?: {
    lat: number;
    lng: number;
    desc: string;
    location_city: string;
    beach_id: number;
  };
  beach_id?: number;
  images: FormImages[];
  dive_shop?: DiveShopSearchResult;
  dive_shop_id?: number;
  privacy?: string;
  is_private?: boolean;
  date_dived?: string;
}

export interface AdvancedFormInitialValues extends SimpleFormInitialValues {
  startDate?: Date | string; // date type for form, string type for redux. Will handle api value types later
  startTime?: Date | string; // date type for form, string type for redux. Will handle api value types later
  dive_length?: number;
  max_depth?: number;
  water_temp?: number;
  air_temp?: number;
  visibility?: number;
  entry?: string;
  weight?: number;
  start_air?: number;
  end_air?: number;
  air_type?: string;
  date_dived?: string;
  date_posted?: string;
}

interface DiveLogDetailReview extends AdvancedFormInitialValues {
  user?: User;
}

export interface AdvancedDiveLogReturnValues {
  review: DiveLogDetailReview;
  spot: Spot;
  msg: string;
  dive_shop?: DiveShopFull;
}

export interface SimpleDiveLogReturnValues {
  review: SimpleFormInitialValues;
  spot: Spot;
  msg: string;
  dive_shop?: DiveShopSearchResult;
}

type DiveLogsStateStarter = Omit<
  AdvancedFormInitialValues,
  'location' | 'startDate' | 'startTime' | 'beach_id'
>;

export interface DiveLogsState extends DiveLogsStateStarter {
  spot: Spot;
  user?: User;
}

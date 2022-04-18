import { Spot } from './spot';
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
    beach_id: number;
  };
  beach_id?: number;
  images: {
    uri: string;
    type?: string;
    name: string;
  }[];
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
}

export interface AdvancedDiveLogReturnValues {
  review: AdvancedFormInitialValues;
  spot: Spot;
  msg: string;
}

export interface SimpleDiveLogReturnValues {
  review: SimpleFormInitialValues;
  spot: Spot;
  msg: string;
}

type DiveLogsStateStarter = Omit<
  AdvancedFormInitialValues,
  'location' | 'startDate' | 'startTime' | 'beach_id'
>;

export interface DiveLogsState extends DiveLogsStateStarter {
  spot: Spot;
}

import { Spot } from './spot';
export interface SimpleFormInitialValues {
  id: number | string;
  rating: number;
  difficulty: string;
  title?: string;
  text?: string;
  activity_type?: string;
  location?: {
    lat: number;
    lng: number;
    desc: string;
  };
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
  visibility?: string;
  entry?: string;
  weight?: number;
  start_air?: number;
  end_air?: number;
  air_type?: string;
  date_dived?: string;
}

export interface DiveLogReturnValues extends AdvancedFormInitialValues {
  spot: Spot;
}

export interface SimpleFormInitialValues {
  id: number | string;
  rating: number;
  difficulty: string;
  name?: string;
  note?: string;
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
  timeInWater?: number;
  maxDepth?: number;
  waterTemp?: number;
  airTemp?: number;
  visibility?: string;
  diveActivity?: string;
  entry?: string;
  weight?: number;
  airTankStart?: number;
  airTankEnd?: number;
  nitrox?: string;
}

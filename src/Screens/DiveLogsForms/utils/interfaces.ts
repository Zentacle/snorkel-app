export interface Stage {
  id: number;
  name: string;
}

export enum DateTimeMode {
  date = 'date',
  time = 'time',
}

export interface SimpleFormInitialValues {
  rating: number;
  difficulty: string;
  name?: string;
  note?: string;
}

export interface AdvancedFormInitialValues {
  rating?: number;
  difficulty?: string;
  name?: string;
  note?: string;
  startDate?: Date;
  startTime?: Date;
  timeInWater?: number;
  maxDepth?: number;
  waterTemp?: number;
  airTemp?: number;
  visibility?: number;
  diveActivity?: string;
  entry?: string;
}

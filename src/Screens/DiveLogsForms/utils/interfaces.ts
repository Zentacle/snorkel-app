export interface Stage {
  id: number;
  name: string;
}

export enum DateTimeMode {
  date = 'date',
  time = 'time',
  datetime = 'datetime',
}

export interface PhotoOptions {
  name: string;
  action: () => Promise<void>;
}

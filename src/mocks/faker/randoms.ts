export {};

enum SortSpots {
  latest = 'latest',
  most_reviewed = 'most_reviewed',
  top = 'top',
}

interface SpotParams {
  id: string;
  locality: string;
  area_one: string;
  area_two: string;
  country: string;
  sort: SortSpots;
  limit: number; // ?? check
}

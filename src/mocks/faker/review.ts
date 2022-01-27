interface Review {
  beach_id: number;
  visibility: number;
  activity_type: string;
  rating: number;
  text: string;
  images?: string[];
}

export const review: Review[] = [
  {
    beach_id: 1,
    visibility: 5,
    activity_type: 'scuba',
    rating: 5,
    text: 'Entry can be challenging depending on the tide, be careful and wear booties. Tons of turtles though!',
  },
  {
    beach_id: 2,
    visibility: 5,
    activity_type: 'scuba',
    rating: 5,
    text: 'Swim out to the right side past the parking lot. Just keep the wall on your right side going out, and on your left side when swimming back in',
    images: ['', ''],
  },
  {
    beach_id: 1,
    visibility: 5,
    activity_type: 'scuba',
    rating: 5,
    text: 'Love this place! Make sure to rent booties though. the entry is tough',
  },
];

import { User } from './user';

export interface Review {
  activity_type: string;
  author_id: number;
  beach_id: number;
  date_dived: Date;
  date_posted: Date;
  id: number;
  images: string[];
  rating: number;
  shorediving_data: any;
  signedUrls: string[];
  text: string;
  visibility: number;
  user: User;
}

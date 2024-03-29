export interface Spot {
  activity?: Tag[];
  access: Tag[];
  area_one_id: number;
  area_two_id: number;
  country_id: number;
  description: string;
  difficulty: string;
  entry_map: string;
  google_place_id: string;
  hero_img: string;
  id: number;
  is_verified: boolean;
  last_review_date: Date;
  last_review_viz: number;
  latitude: number;
  locality_id: number;
  location_city: string;
  location_google: string;
  longitude: number;
  max_depth?: number;
  name: string;
  noaa_station_id: string;
  num_reviews: number;
  rating: string;
  shorediving_data?: any;
  submitter_id?: number;
  tags?: Tag[];
  url: string;
  sd_url: string;
  ratings?: {
    [rating: string]: number;
  };
  images?: Image[];
}

export interface RecommendedArgs {
  token: string;
  longitude?: number;
  latitude?: number;
}

interface Image {
  caption?: string;
  id?: number;
  review_id?: number | null;
  signedurl: string;
  url?: string;
}

export interface ResponseWithImages {
  data: Image[];
  msg: string;
}

interface Tag {
  id: number;
  short_name: string;
  text: string;
  type: string;
}

export interface Bench {
  id: string;
  image: string;
  description: string;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
  name: string;
  submissionDate?: string;
  reviewed?: boolean;
}

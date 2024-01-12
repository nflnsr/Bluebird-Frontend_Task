export type Car = {
  id: string;
  vehicle: string;
  imageURL: string;
  price: string;
  description: string[];
  likes: number;
  isLiked: boolean;
  map(
    arg0: (item: { id: string; likes: number; isLiked: boolean }) => void,
  ): unknown;
};

export type Vehicles = {
  id: string;
  category_id: string;
  car_type: Car[];
};

export type VehicleCategory = {
  id: string;
  name: string;
  description: string;
  imageURL: string;
};

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string;
  distance: number;
  menu: MenuItem[];
};

export type RestaurantsData = {
  restaurants: Restaurant[];
};

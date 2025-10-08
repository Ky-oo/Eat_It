export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string;
  menu: MenuItem[];
}

export interface RestaurantsData {
  restaurants: Restaurant[];
}

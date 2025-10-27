import type { User } from "../User";

export type Order = {
  id: string;
  user: Omit<User, "password">;
  date: string;
  total: number;
  status: string;
  restaurantId: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
};

export type OrdersData = {
  orders: Order[];
};

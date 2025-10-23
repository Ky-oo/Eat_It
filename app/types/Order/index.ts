export type Order = {
  id: string;
  userId: string;
  date: Date;
  total: number;
  status: string;
  restaurant?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
};

export type OrdersData = {
  orders: Order[];
};

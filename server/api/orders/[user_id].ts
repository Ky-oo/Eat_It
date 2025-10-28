import { defineEventHandler } from "h3";
import orders from "../../data/orders.json";
import type { Order } from "~~/app/types/Order";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<Order[] | []> => {
  const params = event.context.params;
  const userId = params?.user_id;

  const userOrder = orders.filter(
    (order) => order.user && String(order.user.id) === userId
  ) as Order[];

  return {
    data: userOrder ?? [],
    status: "success",
    message: `Order de l'utilisateur ${userId} récupéré avec succès`,
  };
});

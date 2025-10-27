import { defineEventHandler, createError } from "h3";
import orders from "../../data/orders.json";
import type { Order } from "~~/app/types/Order";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<Order[] | []> => {
  const params = event.context.params;
  const userId = params?.user_id;
  const userOrder = (orders as Order[])?.filter?.(
    (order) => order.userId == userId
  );

  return {
    data: userOrder ?? [],
    status: "success",
    message: `Order de l'utilisateur ${userId} récupéré avec succès`,
  };
});

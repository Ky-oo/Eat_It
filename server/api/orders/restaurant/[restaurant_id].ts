import { defineEventHandler, createError } from "h3";
import orders from "~~/server/data/orders.json";
import type { Order } from "~~/app/types/Order";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<Order[] | []> => {
  const params = event.context.params;
  const restaurantId = params?.restaurant_id;
  const restaurantOrder = (orders as Order[])?.filter?.(
    (order) => order.restaurantId == restaurantId
  );

  return {
    data: restaurantOrder ?? [],
    status: "success",
    message: `Order du restaurant ${restaurantId} récupéré avec succès`,
  };
});

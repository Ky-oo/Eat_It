import { defineEventHandler, createError } from "h3";
import orders from "../../data/orders.json";
import type { Order } from "~~/app/types/Order";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<Order> => {
  const params = event.context.params;
  const orderId = Number(params?.order_id);
  const foundOrder = (orders as Order[])?.find?.(
    (order) => order.id == orderId
  );
  if (!foundOrder) {
    throw createError({
      statusCode: 404,
      statusMessage: "Order non trouvé",
    });
  }

  return {
    data: foundOrder,
    status: "success",
    message: `Order ${foundOrder.id} récupéré avec succès`,
  };
});

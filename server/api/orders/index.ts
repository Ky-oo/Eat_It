import { defineEventHandler } from "h3";
import orders from "../../data/orders.json";
import type { Order } from "~~/app/types/Order";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<Order[]> => {
  return {
    data: orders as Order[],
    status: "success",
    message: "Orders récupérés avec succès",
  };
});

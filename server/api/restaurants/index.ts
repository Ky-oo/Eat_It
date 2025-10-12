import { defineEventHandler } from "h3";
import restaurants from "../../data/restaurants.json";
import type { Restaurant } from "~~/app/types/Restaurant";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<Restaurant[]> => {
  return {
    data: restaurants as Restaurant[],
    status: "success",
    message: "Restaurants récupérés avec succès",
  };
});

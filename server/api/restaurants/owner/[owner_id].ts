import { defineEventHandler, createError } from "h3";
import restaurants from "~~/server/data/restaurants.json";
import type { Restaurant } from "~~/app/types/Restaurant";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<Restaurant | null> => {
  const params = event.context.params;
  const ownerId = Number(params?.owner_id);
  const foundRestaurant = (restaurants as Restaurant[])?.filter.(
    (restaurant) => restaurant.userId == ownerId
  );

  return {
    data: foundRestaurant ?? null,
    status: "success",
    message: `Restaurants du user ${ownerId} récupéré avec succès`,
  };
});

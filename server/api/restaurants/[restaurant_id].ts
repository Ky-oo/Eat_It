import restaurants from "../../data/restaurants.json";
import type { Restaurant } from "~~/app/types/Restaurant";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<Restaurant> => {
  const params = event.context.params;
  const restaurantId = Number(params?.restaurant_id);
  const foundRestaurant = (restaurants as Restaurant[])?.find?.(
    (restaurant) => restaurant.id == restaurantId
  );
  if (!foundRestaurant) {
    throw createError({
      status: 404,
      statusMessage: "Restaurant non trouvé",
    });
  }

  return {
    data: foundRestaurant,
    status: "success",
    message: `Restaurant ${foundRestaurant.name} récupéré avec succès`,
  };
});

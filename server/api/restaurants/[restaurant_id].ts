import restaurants from "../../data/restaurants.json";
import type { Restaurant } from "~~/app/types/Restaurant";

export default defineEventHandler((event) => {
  const params = event.context.params;
  const restaurantId = Number(params?.restaurant_id);
  const foundRestaurant = (restaurants as Restaurant[])?.find?.(
    (restaurant) => restaurant.id == restaurantId
  );
  if (!foundRestaurant) {
    throw createError({
      status: 404,
    });
  }

  return foundRestaurant;
});

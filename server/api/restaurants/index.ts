import restaurants from "../../data/restaurants.json";
import type { Restaurant } from "~~/app/types/Restaurant";

export default defineEventHandler((event) => {
  return restaurants as Restaurant[];
});

import restaurants from "../../data/restaurants.json";
import type { Restaurant } from "~~/modules/restaurant/types";

export default defineEventHandler((event) => {
  return restaurants as Restaurant[];
});

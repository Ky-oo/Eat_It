import users from "../../data/users.json";
import type { User } from "~~/modules/restaurant/types";

export default defineEventHandler((event) => {
  return users as User[];
});

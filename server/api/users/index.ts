import users from "../../data/users.json";
import type { User } from "~~/app/types/User";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<User[]> => {
  return {
    data: users as User[],
    status: "success",
    message: "Utilisateurs récupérés avec succès",
  };
});

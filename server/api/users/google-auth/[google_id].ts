import { defineEventHandler, createError } from "h3";
import users from "~~/server/data/users.json";
import type { User } from "~~/app/types/User";
import type { ApiResponse } from "~~/app/types/Utils";

export default defineEventHandler((event): ApiResponse<User> => {
  const params = event.context.params;
  const googleId = Number(params?.google_id);
  const foundUser = (users as User[])?.find?.(
    (user) => user.googleId == googleId
  );

  if (!foundUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "User non trouvé par googleId",
    });
  }

  return {
    data: foundUser,
    status: "success",
    message: `User ${foundUser.id} récupéré avec succès`,
  };
});

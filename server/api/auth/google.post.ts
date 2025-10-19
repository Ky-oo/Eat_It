import {
  defineEventHandler,
  readBody,
  createError,
  setResponseHeaders,
} from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (event.node.req.method === "OPTIONS") {
    setResponseHeaders(event, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return "";
  }

  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Méthode non autorisée",
    });
  }

  try {
    const body = await readBody(event);
    const code = body.code;

    if (!code) {
      throw createError({
        statusCode: 400,
        statusMessage: "Code Google manquant",
      });
    }

    const config = useRuntimeConfig();

    const tokenResponse = await $fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code: code,
        client_id: config.public.googleClientId,
        client_secret: config.googleClientSecret,
        grant_type: "authorization_code",
        redirect_uri: config.googleRedirectUri,
      }).toString(),
    });

    const accessToken = (tokenResponse as any).access_token;
    const userInfo = await $fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Définir les headers CORS pour la réponse
    setResponseHeaders(event, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });

    return {
      access_token: accessToken,
      refresh_token: (tokenResponse as any).refresh_token,
      user: userInfo,
    };
  } catch (err: any) {
    console.error("Erreur Google Auth:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'authentification Google",
    });
  }
});

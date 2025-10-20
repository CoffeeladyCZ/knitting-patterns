import { API_ROUTES } from "./constants";
import { type PatternResponse } from "./types";

export const getPatterns = async (): Promise<PatternResponse> => {
  const url = `${import.meta.env.VITE_API_URL}/${API_ROUTES.LIST_PATTERNS}`;

  const base64Credentials = `${import.meta.env.VITE_API_USERNAME}:${import.meta.env.VITE_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP chyba! Stav: ${response.status}. Zpráva: ${errorBody.substring(0, 100)}...`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Při volání API došlo k chybě:", (error as Error).message);

    throw error as Error;
  }
};

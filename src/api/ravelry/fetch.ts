export const fetcher = async <TResponse>(
  endpoint: string,
  options: RequestInit = {},
): Promise<TResponse> => {
  const baseUrl = import.meta.env.VITE_RAVELRY_URL;
  const url = `${baseUrl}/${endpoint}`;

  const base64Credentials = btoa(
    `${import.meta.env.VITE_RAVELRY_USERNAME}:${import.meta.env.VITE_RAVELRY_KEY}`,
  );

  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP chyba! Stav: ${response.status}. Zpráva: ${errorBody.substring(0, 100)}...`,
      );
    }

    const data = await response.json();
    return data as TResponse;
  } catch (error) {
    console.error(
      "Při volání Ravelry API došlo k chybě:",
      (error as Error).message,
    );
    throw error as Error;
  }
};

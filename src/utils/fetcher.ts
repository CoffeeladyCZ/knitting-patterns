export const getGithubFetcher = async <TData, TVariables = unknown>(
  query: string,
  variables: TVariables = {} as TVariables,
): Promise<TData> => {
  const url = `${import.meta.env.VITE_GITHUB_URL}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP chyba! Stav: ${response.status}. Zpráva: ${errorBody.substring(0, 100)}...`,
      );
    }

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
      const errorMessages = result.errors
        .map((error: { message: string }) => error.message)
        .join(", ");
      throw new Error(`GraphQL chyby: ${errorMessages}`);
    }

    return result.data;
  } catch (error) {
    console.error("Při volání API došlo k chybě:", (error as Error).message);

    throw error as Error;
  }
};

import type { CreateIssueVariables, CreateIssueResult } from "./types";

export const createIssue = async (query: string, variables: CreateIssueVariables): Promise<CreateIssueResult> => {
  const url = `${import.meta.env.VITE_GITHUB_URL}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP chyba! Stav: ${response.status}. Zpráva: ${errorBody.substring(0, 100)}...`);
  }

  const data = await response.json();

  return data;
};
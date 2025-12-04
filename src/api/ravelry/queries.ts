import { API_ROUTES } from "./constants";
import type {
  PatternCategoriesResponse,
  PatternResponse,
  YarnResponse,
} from "./types";
import { fetcher } from "./fetch";

export const getPatternCategories =
  async (): Promise<PatternCategoriesResponse> => {
    return fetcher<PatternCategoriesResponse>(API_ROUTES.PATTERNS_CATEGORIES);
  };

export const getYarns = async (): Promise<YarnResponse> => {
  return fetcher<YarnResponse>(API_ROUTES.YARNS);
};

export const getPatterns = async (
  query?: string,
  page: number = 1,
  pageSize: number = 9,
): Promise<PatternResponse> => {
  const queryParams: Record<string, string> = {
    page: page.toString(),
    page_size: pageSize.toString(),
  };
  if (query) {
    queryParams.query = query;
  }
  return fetcher<PatternResponse>(API_ROUTES.PATTERNS, {}, queryParams);
};

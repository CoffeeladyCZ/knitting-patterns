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

export const getPatterns = async (): Promise<PatternResponse> => {
  return fetcher<PatternResponse>(API_ROUTES.PATTERNS);
};

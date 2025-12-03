import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./constants";
import { getPatterns, getPatternCategories, getYarns } from "./queries";

export const useGetPatterns = () =>
  useQuery({
    queryFn: getPatterns,
    queryKey: [QUERY_KEYS.LIST],
  });

export const useGetYarns = () =>
  useQuery({
    queryFn: getYarns,
    queryKey: [QUERY_KEYS.YARNS],
  });

export const useGetPatternsCategories = () =>
  useQuery({
    queryFn: getPatternCategories,
    queryKey: [QUERY_KEYS.PATTERNS_CATEGORIES],
  });

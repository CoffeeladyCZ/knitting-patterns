import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./constants";
import { getPatterns } from "./queries";

export const useGetPatterns = () =>
  useQuery({
    queryFn: getPatterns,
    queryKey: [QUERY_KEYS.LIST],
  });
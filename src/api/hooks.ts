import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_VIEWER_REPOSITORIES, GET_REPOSITORY_ISSUES } from "./gql/queries";
import type {
  CreateIssueResult,
  CreateIssueVariables,
  RepositoriesData,
  RepositoriesVariables,
  RepositoryIssuesData,
  RepositoryIssuesVariables,
} from "./types";
import { getGithubFetcher } from "./queries";
import { QUERY_KEYS } from "./constants";
import { createIssue } from "./mutations";
import { CREATE_ISSUE_MUTATION } from "./gql/mutations";

export const useViewerRepositories = (limit: number) => {
  return useQuery<RepositoriesData, Error>({
    queryKey: [QUERY_KEYS.VIEWER_REPOSITORIES, limit],
    queryFn: () =>
      getGithubFetcher<RepositoriesData, RepositoriesVariables>(
        GET_VIEWER_REPOSITORIES,
        { first: limit },
      ),
    staleTime: 1000 * 60 * 5, // 5 minut
  });
};

export const useRepositoryIssues = (
  owner: string,
  name: string,
  limit: number = 20,
) => {
  return useQuery<RepositoryIssuesData, Error>({
    queryKey: [QUERY_KEYS.ISSUES, owner, name, limit],
    queryFn: () =>
      getGithubFetcher<RepositoryIssuesData, RepositoryIssuesVariables>(
        GET_REPOSITORY_ISSUES,
        { owner, name, first: limit },
      ),
    staleTime: 1000 * 60 * 5, // 5 minut
    enabled: !!owner && !!name, // Pouze pokud jsou owner a name definované
  });
};

export const useCreateIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateIssueResult, Error, CreateIssueVariables>({
    mutationFn: (variables) => createIssue(CREATE_ISSUE_MUTATION, variables),

    onSuccess: () => {
      // Invaliduje všechny dotazy, které začínají klíčem 'issues'
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};

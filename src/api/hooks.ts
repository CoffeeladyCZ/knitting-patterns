import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GET_VIEWER_REPOSITORIES,
  GET_REPOSITORY_ISSUES,
  GET_USER_REPOSITORIES,
} from "./gql/queries";
import type {
  CreateIssueMutationVariables,
  CreateIssueMutation,
  GetViewerRepositoriesQuery,
  GetRepositoryIssuesQuery,
} from "./gql/generated/types";
import type { GetUserRepositoriesQuery } from "./gql/generated/graphql";
import { getGithubFetcher } from "./fetcher";
import { QUERY_KEYS } from "./constants";
import { CREATE_ISSUE_MUTATION } from "./gql/mutations";

export const useViewerRepositories = (limit: number) =>
  useQuery<GetViewerRepositoriesQuery>({
    queryKey: [QUERY_KEYS.VIEWER_REPOSITORIES, limit],
    queryFn: () =>
      getGithubFetcher<GetViewerRepositoriesQuery>(GET_VIEWER_REPOSITORIES, {
        first: limit,
      }),
    staleTime: 1000 * 60 * 5, // 5 minut
  });

export const useUserRepositories = (login: string | null, limit: number) =>
  useQuery<GetUserRepositoriesQuery>({
    queryKey: [QUERY_KEYS.USER_REPOSITORIES, login, limit],
    queryFn: async () => {
      try {
        return await getGithubFetcher<GetUserRepositoriesQuery>(
          GET_USER_REPOSITORIES,
          {
            login,
            first: limit,
          },
        );
      } catch (error) {
        if (
          error instanceof Error &&
          /Could not resolve to a User/i.test(error.message)
        ) {
          return { user: null };
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!login,
  });

export const useRepositoryIssues = (
  owner: string,
  name: string,
  limit: number = 20,
) => {
  return useQuery<GetRepositoryIssuesQuery>({
    queryKey: [QUERY_KEYS.ISSUES, owner, name, limit],
    queryFn: () =>
      getGithubFetcher(GET_REPOSITORY_ISSUES, { owner, name, first: limit }),
    staleTime: 1000 * 60 * 5, // 5 minut
    enabled: !!owner && !!name, // Pouze pokud jsou owner a name definované
  });
};

export const useCreateIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateIssueMutation, Error, CreateIssueMutationVariables>({
    mutationFn: (variables) =>
      getGithubFetcher(CREATE_ISSUE_MUTATION, variables),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};

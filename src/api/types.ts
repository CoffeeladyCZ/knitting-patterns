import type { GetViewerRepositoriesQuery } from "./gql/generated/types";

export interface RepositoriesVariables {
  first: number;
}

export interface CreateIssueVariables {
  repoId: string;
  title: string;
  body: string;
}

export type RepositoryNode = NonNullable<
  GetViewerRepositoriesQuery["viewer"]["repositories"]["nodes"]
>[0];

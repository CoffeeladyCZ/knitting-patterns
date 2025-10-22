export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  JSON: { input: Record<string, any>; output: Record<string, any> };
  URI: { input: any; output: any };
};

export type Actor = {
  __typename?: "Actor";
  avatarUrl: Scalars["URI"]["output"];
  login: Scalars["String"]["output"];
};

export type CreateIssueInput = {
  body?: InputMaybe<Scalars["String"]["input"]>;
  repositoryId: Scalars["ID"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateIssuePayload = {
  __typename?: "CreateIssuePayload";
  issue: Maybe<Issue>;
};

export type Issue = {
  __typename?: "Issue";
  author: Maybe<Actor>;
  body: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  labels: LabelConnection;
  number: Scalars["Int"]["output"];
  state: IssueState;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  url: Scalars["URI"]["output"];
};

export type IssueLabelsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

export type IssueConnection = {
  __typename?: "IssueConnection";
  nodes: Maybe<Array<Maybe<Issue>>>;
};

export type IssueOrder = {
  direction: OrderDirection;
  field: IssueOrderField;
};

export type IssueOrderField = "COMMENTS" | "CREATED_AT" | "UPDATED_AT";

export type IssueState = "CLOSED" | "OPEN";

export type Label = {
  __typename?: "Label";
  color: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type LabelConnection = {
  __typename?: "LabelConnection";
  nodes: Maybe<Array<Maybe<Label>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createIssue: CreateIssuePayload;
};

export type MutationCreateIssueArgs = {
  input: CreateIssueInput;
};

export type OrderDirection = "ASC" | "DESC";

export type Query = {
  __typename?: "Query";
  repository: Maybe<Repository>;
  viewer: User;
};

export type QueryRepositoryArgs = {
  name: Scalars["String"]["input"];
  owner: Scalars["String"]["input"];
};

export type Repository = {
  __typename?: "Repository";
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isPrivate: Scalars["Boolean"]["output"];
  issues: IssueConnection;
  name: Scalars["String"]["output"];
  owner: RepositoryOwner;
  url: Scalars["URI"]["output"];
};

export type RepositoryIssuesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<IssueOrder>;
};

export type RepositoryConnection = {
  __typename?: "RepositoryConnection";
  nodes: Maybe<Array<Maybe<Repository>>>;
};

export type RepositoryOrder = {
  direction: OrderDirection;
  field: RepositoryOrderField;
};

export type RepositoryOrderField =
  | "CREATED_AT"
  | "NAME"
  | "PUSHED_AT"
  | "STARGAZERS"
  | "UPDATED_AT";

export type RepositoryOwner = {
  __typename?: "RepositoryOwner";
  avatarUrl: Scalars["URI"]["output"];
  id: Scalars["ID"]["output"];
  login: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  avatarUrl: Scalars["URI"]["output"];
  id: Scalars["ID"]["output"];
  login: Scalars["String"]["output"];
  repositories: RepositoryConnection;
};

export type UserRepositoriesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RepositoryOrder>;
};

export type CreateIssueMutationVariables = Exact<{
  repoId: Scalars["ID"]["input"];
  title: Scalars["String"]["input"];
  body?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type CreateIssueMutation = {
  __typename?: "Mutation";
  createIssue: {
    __typename?: "CreateIssuePayload";
    issue: {
      __typename?: "Issue";
      id: string;
      number: number;
      title: string;
      url: any;
    } | null;
  };
};

export type GetViewerRepositoriesQueryVariables = Exact<{
  first: Scalars["Int"]["input"];
}>;

export type GetViewerRepositoriesQuery = {
  __typename?: "Query";
  viewer: {
    __typename?: "User";
    repositories: {
      __typename?: "RepositoryConnection";
      nodes: Array<{
        __typename?: "Repository";
        id: string;
        name: string;
        description: string | null;
        url: any;
        isPrivate: boolean;
        owner: { __typename?: "RepositoryOwner"; avatarUrl: any };
      } | null> | null;
    };
  };
};

export type GetRepositoryIssuesQueryVariables = Exact<{
  owner: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  first: Scalars["Int"]["input"];
}>;

export type GetRepositoryIssuesQuery = {
  __typename?: "Query";
  repository: {
    __typename?: "Repository";
    id: string;
    name: string;
    description: string | null;
    url: any;
    owner: { __typename?: "RepositoryOwner"; login: string; avatarUrl: any };
    issues: {
      __typename?: "IssueConnection";
      nodes: Array<{
        __typename?: "Issue";
        id: string;
        number: number;
        title: string;
        body: string | null;
        url: any;
        createdAt: string;
        updatedAt: string;
        state: IssueState;
        author: { __typename?: "Actor"; login: string; avatarUrl: any } | null;
        labels: {
          __typename?: "LabelConnection";
          nodes: Array<{
            __typename?: "Label";
            id: string;
            name: string;
            color: string;
          } | null> | null;
        };
      } | null> | null;
    };
  } | null;
};

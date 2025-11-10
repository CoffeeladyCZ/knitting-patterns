/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateIssue($repoId: ID!, $title: String!, $body: String) {\n    createIssue(input: { repositoryId: $repoId, title: $title, body: $body }) {\n      issue {\n        id\n        number\n        title\n        url\n      }\n    }\n  }\n": typeof types.CreateIssueDocument,
    "\n  query GetViewerRepositories($first: Int!) {\n    viewer {\n      repositories(\n        first: $first\n        orderBy: { field: CREATED_AT, direction: DESC }\n      ) {\n        nodes {\n          id\n          name\n          owner {\n            avatarUrl\n          }\n          description\n          url\n          isPrivate\n        }\n      }\n    }\n  }\n": typeof types.GetViewerRepositoriesDocument,
    "\n  query GetRepositoryIssues($owner: String!, $name: String!, $first: Int!) {\n    repository(owner: $owner, name: $name) {\n      id\n      name\n      owner {\n        login\n        avatarUrl\n      }\n      description\n      url\n      issues(first: $first, orderBy: { field: CREATED_AT, direction: DESC }) {\n        nodes {\n          id\n          number\n          title\n          body\n          url\n          createdAt\n          updatedAt\n          state\n          author {\n            login\n            avatarUrl\n          }\n          labels(first: 10) {\n            nodes {\n              id\n              name\n              color\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetRepositoryIssuesDocument,
};
const documents: Documents = {
    "\n  mutation CreateIssue($repoId: ID!, $title: String!, $body: String) {\n    createIssue(input: { repositoryId: $repoId, title: $title, body: $body }) {\n      issue {\n        id\n        number\n        title\n        url\n      }\n    }\n  }\n": types.CreateIssueDocument,
    "\n  query GetViewerRepositories($first: Int!) {\n    viewer {\n      repositories(\n        first: $first\n        orderBy: { field: CREATED_AT, direction: DESC }\n      ) {\n        nodes {\n          id\n          name\n          owner {\n            avatarUrl\n          }\n          description\n          url\n          isPrivate\n        }\n      }\n    }\n  }\n": types.GetViewerRepositoriesDocument,
    "\n  query GetRepositoryIssues($owner: String!, $name: String!, $first: Int!) {\n    repository(owner: $owner, name: $name) {\n      id\n      name\n      owner {\n        login\n        avatarUrl\n      }\n      description\n      url\n      issues(first: $first, orderBy: { field: CREATED_AT, direction: DESC }) {\n        nodes {\n          id\n          number\n          title\n          body\n          url\n          createdAt\n          updatedAt\n          state\n          author {\n            login\n            avatarUrl\n          }\n          labels(first: 10) {\n            nodes {\n              id\n              name\n              color\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetRepositoryIssuesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateIssue($repoId: ID!, $title: String!, $body: String) {\n    createIssue(input: { repositoryId: $repoId, title: $title, body: $body }) {\n      issue {\n        id\n        number\n        title\n        url\n      }\n    }\n  }\n"): typeof import('./graphql').CreateIssueDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetViewerRepositories($first: Int!) {\n    viewer {\n      repositories(\n        first: $first\n        orderBy: { field: CREATED_AT, direction: DESC }\n      ) {\n        nodes {\n          id\n          name\n          owner {\n            avatarUrl\n          }\n          description\n          url\n          isPrivate\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetViewerRepositoriesDocument;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRepositoryIssues($owner: String!, $name: String!, $first: Int!) {\n    repository(owner: $owner, name: $name) {\n      id\n      name\n      owner {\n        login\n        avatarUrl\n      }\n      description\n      url\n      issues(first: $first, orderBy: { field: CREATED_AT, direction: DESC }) {\n        nodes {\n          id\n          number\n          title\n          body\n          url\n          createdAt\n          updatedAt\n          state\n          author {\n            login\n            avatarUrl\n          }\n          labels(first: 10) {\n            nodes {\n              id\n              name\n              color\n            }\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetRepositoryIssuesDocument;


export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

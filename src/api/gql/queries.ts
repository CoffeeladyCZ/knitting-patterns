import { gql } from "./helpers";

export const GET_VIEWER_REPOSITORIES = gql`
  query GetViewerRepositories($first: Int!) {
    viewer {
      repositories(
        first: $first
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          id
          name
          owner {
            avatarUrl
          }
          description
          url
          isPrivate
        }
      }
    }
  }
`;

export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues($owner: String!, $name: String!, $first: Int!) {
    repository(owner: $owner, name: $name) {
      id
      name
      owner {
        login
        avatarUrl
      }
      description
      url
      issues(first: $first, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          id
          number
          title
          body
          url
          createdAt
          updatedAt
          state
          author {
            login
            avatarUrl
          }
          labels(first: 10) {
            nodes {
              id
              name
              color
            }
          }
        }
      }
    }
  }
`;

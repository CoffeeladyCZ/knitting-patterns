import { gql } from "./helpers";

export const CREATE_ISSUE_MUTATION = gql`
  mutation CreateIssue($repoId: ID!, $title: String!, $body: String) {
    createIssue(input: { repositoryId: $repoId, title: $title, body: $body }) {
      issue {
        id
        number
        title
        url
      }
    }
  }
`;

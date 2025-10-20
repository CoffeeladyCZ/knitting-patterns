import { gql } from "./helpers";

export const CREATE_ISSUE_MUTATION = gql`
mutation CreateIssue($repoId: ID!, $title: String!, $body: String) {
    createIssue(input: {repositoryId: $repoId, title: $title, body: $body}) {
      issue {
        id
        number
        title
        url
      }
    }
  }
}`;

//proč gql? 
// V tomto případě je jediným účelem této funkce fungovat jako identifikátor 
// pro Váš kód, který editorům a nástrojům říká: "Obsah uvnitř je jazyk GraphQL."
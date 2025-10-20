export interface RepositoryNode {
  id: string;
  name: string;
  owner: {
    avatarUrl: string;
  };
  description: string | null;
  url: string;
  isPrivate: boolean;
}

export interface RepositoriesData {
  data: {
    viewer: {
      repositories: {
        nodes: RepositoryNode[];
      };
    };
  };
}

export interface RepositoriesVariables {
  first: number;
}

export interface LabelNode {
  id: string;
  name: string;
  color: string;
}

export interface IssueNode {
  id: string;
  number: number;
  title: string;
  body: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
  state: string;
  author: {
    login: string;
    avatarUrl: string;
  } | null;
  labels: {
    nodes: LabelNode[];
  };
}

export interface RepositoryIssuesData {
  data: {
    repository: {
      id: string;
      name: string;
      owner: {
        login: string;
        avatarUrl: string;
      };
      description: string | null;
      url: string;
      issues: {
        nodes: IssueNode[];
      };
    };
  };
}

export interface RepositoryIssuesVariables {
  owner: string;
  name: string;
  first: number;
}

export interface CreateIssueResult {
  createIssue: {
    issue: {
      id: string;
      number: number;
      title: string;
      url: string;
    };
  };
}

export interface CreateIssueVariables {
  repoId: string;
  title: string;
  body: string;
}

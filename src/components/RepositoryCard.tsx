import type { GetViewerRepositoriesQuery } from "../api/gql/generated/types";
import { Card } from "./component-library/Card";

type RepositoryNode = NonNullable<
  GetViewerRepositoriesQuery["viewer"]["repositories"]["nodes"]
>[0];

interface Props {
  repository: RepositoryNode;
  onClick: () => void;
}

export const RepositoryCard = ({ repository, onClick }: Props) => {
  if (!repository) return null;

  return (
    <Card
      className="border-secondary bg-secondary gap-2"
      variant="content"
      onClick={onClick}
    >
      <Card.Header>
        <Card.Header.Title className="text-accent-50">{repository.name}</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <p className="text-surface pb-2">{repository.description}</p>
      </Card.Content>
    </Card>
  );
};

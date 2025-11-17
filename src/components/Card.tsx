import type { GetViewerRepositoriesQuery } from "../api/gql/generated/types";

type RepositoryNode = NonNullable<
  GetViewerRepositoriesQuery["viewer"]["repositories"]["nodes"]
>[0];

interface CardProps {
  repository: RepositoryNode;
  onClick: () => void;
}

export const Card = ({ repository, onClick }: CardProps) => {
  if (!repository) return null;

  return (
    <div
      className="border border-gray-300 rounded-md p-4 flex flex-col items-center w-fit max-w-[320px] cursor-pointer hover:shadow-lg transition-shadow hover:animate-wingle"
      onClick={onClick}
    >
      <p className="text-lg font-bold">{repository.name}</p>
      <p className="text-sm text-gray-500">{repository.description}</p>
      <p className="text-sm text-gray-500">{repository.url}</p>
    </div>
  );
};

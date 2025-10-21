import { type RepositoryNode } from "../api/types";

interface CardProps {
  repository: RepositoryNode;
  onClick: () => void;
}

export const Card = ({ repository, onClick }: CardProps) => {
  return (
    <div
      className="border border-gray-300 rounded-md p-4 flex flex-col items-center w-fit max-w-[320px] cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <p className="text-lg font-bold">{repository.name}</p>
      <p className="text-sm text-gray-500">{repository.description}</p>
      <p className="text-sm text-gray-500">{repository.url}</p>
      <p className="text-sm text-gray-500">{repository.url}</p>
    </div>
  );
};

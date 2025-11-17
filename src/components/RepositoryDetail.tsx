import { useRepositoryIssues } from "../api/hooks";
import IssueDialog from "./IssueDialog";
import { IssueCard } from "./IssueCard";

interface Props {
  owner: string;
  name: string;
  onBack: () => void;
}

export const RepositoryDetail = ({ owner, name, onBack }: Props) => {
  const { data, isLoading, isError, error } = useRepositoryIssues(
    owner,
    name,
    50,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Načítání issues...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          Chyba při načítání issues: {error?.message}
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Zpět na Dashboard
        </button>
      </div>
    );
  }

  const repository = data?.repository;
  const issues = repository?.issues?.nodes || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          ← Zpět na Dashboard
        </button>

        <div className="flex items-center space-x-4 mb-4">
          {repository?.owner?.avatarUrl && (
            <img
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 animate-heart-pulse">
              {repository?.name}
            </h1>
            <p className="text-gray-600">
              {repository?.owner?.login} • {issues.length} issues
            </p>
            {repository?.description && (
              <p className="text-gray-500 mt-1">{repository.description}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <IssueDialog repoId={repository?.id} />
          <a
            href={repository?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Zobrazit na GitHub
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Issues ({issues.length})
        </h2>

        {issues.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Tento repozitář nemá žádné issues.
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {issues.map(
              (issue) => issue && <IssueCard key={issue.id} issue={issue} />,
            )}
          </div>
        )}
      </div>
    </div>
  );
};

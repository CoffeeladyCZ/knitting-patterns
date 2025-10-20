import { useRepositoryIssues } from "../api/hooks";
import type { IssueNode } from "../api/types";
import IssueDialog from "./IssueDialog";

interface RepositoryDetailProps {
  owner: string;
  name: string;
  onBack: () => void;
}

const IssueCard = ({ issue }: { issue: IssueNode }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStateColor = (state: string) => {
    return state === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
          #{issue.number} {issue.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStateColor(issue.state)}`}>
          {issue.state}
        </span>
      </div>
      
      {issue.body && (
        <p className="text-gray-600 mb-3 line-clamp-3">
          {issue.body.length > 200 ? `${issue.body.substring(0, 200)}...` : issue.body}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {issue.author && (
            <div className="flex items-center space-x-1">
              <img 
                src={issue.author.avatarUrl} 
                alt={issue.author.login}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-sm text-gray-600">{issue.author.login}</span>
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          Vytvořeno: {formatDate(issue.createdAt)}
        </div>
      </div>

      {issue.labels.nodes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {issue.labels.nodes.map((label) => (
            <span
              key={label.id}
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `#${label.color}`,
                color: getContrastColor(label.color)
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3">
        <a
          href={issue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Zobrazit na GitHub →
        </a>
      </div>
    </div>
  );
};

// Pomocná funkce pro kontrastní barvu textu
const getContrastColor = (hexColor: string) => {
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

export const RepositoryDetail = ({ owner, name, onBack }: RepositoryDetailProps) => {
  const { data, isLoading, isError, error } = useRepositoryIssues(owner, name, 50);

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
        <div className="text-red-600 mb-4">Chyba při načítání issues: {error?.message}</div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Zpět na Dashboard
        </button>
      </div>
    );
  }

  const repository = data?.data?.repository;
  const issues = repository?.issues?.nodes || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
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
            <h1 className="text-3xl font-bold text-gray-900">
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

      {/* Issues List */}
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
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

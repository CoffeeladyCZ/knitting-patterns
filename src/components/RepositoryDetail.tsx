import { useRepositoryIssues } from "../api/hooks";
import IssueDialog from "./IssueDialog";
import { IssueCard } from "./IssueCard";
import { useNavigate, useParams } from "react-router";
import { Button } from "./component-library/Button";

export const RepositoryDetail = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const { data, isLoading, isError, error } = useRepositoryIssues(
    owner!,
    name!,
    50,
  );

  const navigate = useNavigate();

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
        <Button variant="primary" onClick={() => navigate("/")}>
          Zpět na Dashboard
        </Button>
      </div>
    );
  }

  const repository = data?.repository;
  const issues = repository?.issues?.nodes || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(repository?.url, "_blank")}
          >
            Zobrazit na GitHub
          </Button>
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

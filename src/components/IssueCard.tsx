import type { GetRepositoryIssuesQuery } from "../api/gql/generated/types";
import { Badge } from "./component-library/Badge";

type IssueNode = NonNullable<
  NonNullable<
    NonNullable<GetRepositoryIssuesQuery["repository"]>["issues"]["nodes"]
  >[0]
>;

interface IssueCardProps {
  issue: IssueNode;
}

export const IssueCard = ({ issue }: IssueCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("cs-CZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="border border-primary-500 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-text flex-1 mr-4">
          #{issue.number} {issue.title}
        </h3>
        <Badge
          variant={issue.state === "OPEN" ? "primary" : "outline"}
          size="sm"
        >
          {issue.state}
        </Badge>
      </div>

      {issue.body && (
        <p className="text-text mb-3 line-clamp-3">
          {issue.body.length > 200
            ? `${issue.body.substring(0, 200)}...`
            : issue.body}
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
              <span className="text-sm text-text">{issue.author.login}</span>
            </div>
          )}
        </div>

        <div className="text-sm text-text/50">
          Vytvořeno: {formatDate(issue.createdAt)}
        </div>
      </div>

      {issue?.labels?.nodes && issue.labels.nodes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {issue.labels.nodes
            .filter(
              (label): label is NonNullable<typeof label> => label !== null,
            )
            .map((label) => (
              <Badge key={label.id} variant="outline" size="sm">
                {label.name}
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};

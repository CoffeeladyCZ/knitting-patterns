import type { GetRepositoryIssuesQuery } from "../api/gql/generated/types";

type IssueNode = NonNullable<
  NonNullable<
    NonNullable<GetRepositoryIssuesQuery["repository"]>["issues"]["nodes"]
  >[0]
>;

interface IssueCardProps {
  issue: IssueNode;
}

const getContrastColor = (hexColor: string) => {
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#FFFFFF";
};

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

  const getStateColor = (state: string) => {
    return state === "OPEN"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
          #{issue.number} {issue.title}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStateColor(issue.state)}`}
        >
          {issue.state}
        </span>
      </div>

      {issue.body && (
        <p className="text-gray-600 mb-3 line-clamp-3">
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
              <span className="text-sm text-gray-600">
                {issue.author.login}
              </span>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500">
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
              <span
                key={label.id}
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `#${label.color}`,
                  color: getContrastColor(label.color),
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

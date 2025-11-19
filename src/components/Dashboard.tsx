// import { useGetPatterns } from "../api/ravelry/hooks";
import { useNavigate } from "react-router";
import { useViewerRepositories } from "../api/hooks";
import { Card } from "./Card";
import { GitHubIcon } from "./GitHubIcon";

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading: isLoadingRepositories,
    isError: isErrorRepositories,
    error: errorRepositories,
  } = useViewerRepositories(10);

  if (isLoadingRepositories) return <div>Loading...</div>;

  if (isErrorRepositories) return <div>Error: {errorRepositories.message}</div>;

  const findedRepositories = data?.viewer?.repositories?.nodes || [];

  return (
    <>
      <div className="flex items-center">
        <span className="mr-2">
          <GitHubIcon width={24} height={24} />
        </span>
        <h1 className="text-2xl font-bold animate-fade-in">
          GitHub repositories
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {findedRepositories?.map((repo) => (
          <Card
            key={repo?.id}
            repository={repo}
            onClick={() => {
              const urlParts = repo?.url?.split("/") || [];
              const owner = urlParts[urlParts.length - 2] || ""; // předposlední část URL
              navigate(`/repository/${owner}/${repo?.name || ""}`);
            }}
          />
        ))}
      </div>
    </>
  );
};

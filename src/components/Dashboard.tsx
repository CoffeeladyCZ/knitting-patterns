// import { useGetPatterns } from "../api/ravelry/hooks";
import { useNavigate } from "react-router";
import { useViewerRepositories } from "../api/hooks";
import { Card } from "./Card";
import { GitHubIcon } from "./GitHubIcon";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import type { RepositoryNode } from "../api/types";

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading: isLoadingRepositories,
    isError: isErrorRepositories,
    error: errorRepositories,
  } = useViewerRepositories(10);

  useEffect(() => {
    ReactGA.send({
      hitType: "dashboard",
      page: "/",
      title: "Dashboard",
    });
  });

  if (isLoadingRepositories) return <div>Loading...</div>;

  if (isErrorRepositories) return <div>Error: {errorRepositories.message}</div>;

  const findedRepositories = data?.viewer?.repositories?.nodes || [];

  const handleRepositoryClick = (repo: RepositoryNode) => {
    const urlParts = repo?.url?.split("/") || [];
    const owner = urlParts[urlParts.length - 2] || ""; // předposlední část URL
    navigate(`/repository/${owner}/${repo?.name || ""}`);

    ReactGA.send({
      hitType: "repository",
      page: `/repository/${owner}/${repo?.name}`,
      title: repo?.name || "",
    });
  };

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
            onClick={() => handleRepositoryClick(repo)}
          />
        ))}
      </div>
    </>
  );
};

// import { useGetPatterns } from "../api/ravelry/hooks";
import { useNavigate } from "react-router";
import { useViewerRepositories } from "../api/hooks";
import { RepositoryCard } from "./RepositoryCard";
import { GitHubIcon } from "./GitHubIcon";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import type { RepositoryNode } from "../api/types";
import { Icon } from "./component-library/Icon";

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
    const owner = urlParts[urlParts.length - 2] || "";
    navigate(`/repository/${owner}/${repo?.name || ""}`);

    ReactGA.event({
      category: "Repository",
      action: "Open detail",
      label: repo?.name || "unknown",
      value: Number(repo?.id) || 0,
    });
  };

  return (
    <>
      <div className="flex items-center mb-5">
        <span className="mr-2">
          <Icon as={GitHubIcon} size="xl" className="text-primary" />
        </span>
        <h1 className="text-3xl font-semibold text-primary">
          GitHub repositories
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {findedRepositories?.map((repo) => (
          <RepositoryCard
            key={repo?.id}
            repository={repo}
            onClick={() => handleRepositoryClick(repo)}
          />
        ))}
      </div>
    </>
  );
};

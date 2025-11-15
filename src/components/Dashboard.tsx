import { useState } from "react";
import { useViewerRepositories, useUserRepositories } from "../api/hooks";
import type { RepositoryNode } from "../api/types";
import { Card } from "./Card";
import { SearchField } from "./SearchField";

interface Props {
  onRepositoryClick: (owner: string, name: string) => void;
}

export const Dashboard = ({ onRepositoryClick }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedLogin, setSearchedLogin] = useState<string | null>(null);

  const {
    data: viewerData,
    isLoading: isLoadingViewerRepositories,
    isError: isErrorViewerRepositories,
    error: errorViewerRepositories,
  } = useViewerRepositories(10);

  const {
    data: userData,
    isLoading: isLoadingUserRepositories,
    isError: isErrorUserRepositories,
    error: errorUserRepositories,
  } = useUserRepositories(searchedLogin, 10);

  const isSearching = Boolean(searchedLogin);

  const isLoadingRepositories = isSearching
    ? isLoadingUserRepositories
    : isLoadingViewerRepositories;
  const isErrorRepositories = isSearching
    ? isErrorUserRepositories
    : isErrorViewerRepositories;
  const errorRepositories = isSearching
    ? errorUserRepositories
    : errorViewerRepositories;

  if (isLoadingRepositories) return <div>Loading...</div>;

  if (isErrorRepositories) return <div>Error: {errorRepositories?.message}</div>;

  const viewerRepositories =
    viewerData?.viewer?.repositories?.nodes ?? ([] as Array<RepositoryNode | null>);
  const userRepositories =
    userData?.user?.repositories?.nodes ?? ([] as Array<RepositoryNode | null>);

  const repositories = (isSearching ? userRepositories : viewerRepositories) as Array<
    RepositoryNode | null
  >;

  const repositoryNodes: RepositoryNode[] = repositories.filter(
    (repo): repo is RepositoryNode => repo !== null,
  );

  const handleSearchSubmit = () => {
    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      setSearchedLogin(null);
      return;
    }
    setSearchedLogin(trimmedValue);
  };

  const noUserFound =
    isSearching &&
    !isLoadingUserRepositories &&
    !isErrorUserRepositories &&
    !userData?.user;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">GitHub Users</h1>
      <div className="flex justify-between items-center p-4">
        <SearchField
          placeholder="Search username"
          value={searchValue}
          onValueChange={setSearchValue}
          onSubmit={handleSearchSubmit}
        />
      </div>
      <p className="text-lg text-gray-500 text-start p-4 pb-2">Repositories</p>
      {noUserFound ? (
        <div className="p-4 text-red-500">
          User "{searchedLogin}" was not found on GitHub.
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 p-4">
          {repositoryNodes.map((repo: RepositoryNode) => (
            <Card
              key={repo?.id}
              repository={repo}
              onClick={() => {
                const urlParts = repo?.url?.split("/") || [];
                const owner = urlParts[urlParts.length - 2] || ""; // předposlední část URL
                onRepositoryClick(owner, repo?.name || "");
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

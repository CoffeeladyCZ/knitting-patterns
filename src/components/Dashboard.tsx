// import { useGetPatterns } from "../api/ravelry/hooks";
import { useViewerRepositories } from "../api/hooks";
import { Card } from "./Card";

interface DashboardProps {
  onRepositoryClick: (owner: string, name: string) => void;
}

export const Dashboard = ({ onRepositoryClick }: DashboardProps) => {
  // const { data, isLoading, isError, error } = useRepositoryId("coffeeladyCZ", "todo-app");
  const { data: repositories, isLoading: isLoadingRepositories, isError: isErrorRepositories, error: errorRepositories } = useViewerRepositories(10);

  if (isLoadingRepositories) return <div>Loading...</div>;

  if (isErrorRepositories) return <div>Error: {errorRepositories.message}</div>;

  const findedRepositories = repositories?.data?.viewer.repositories.nodes || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Knitting Patterns</h1>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {findedRepositories?.map((repo) => (
          <Card 
            key={repo.id} 
            repository={repo} 
            onClick={() => {
              // Extrahujeme owner z URL nebo použijeme viewer jako owner
              const urlParts = repo.url.split('/');
              const owner = urlParts[urlParts.length - 2]; // předposlední část URL
              onRepositoryClick(owner, repo.name);
            }}
          />
        ))}
      </div>
    </>
  )
};


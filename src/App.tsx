import { Dashboard } from "./components/Dashboard";
import { RepositoryDetail } from "./components/RepositoryDetail";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";

import "./App.css";
import * as Sentry from "@sentry/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

type View = 'dashboard' | 'repository';

interface RepositoryViewState {
  owner: string;
  name: string;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [repositoryState, setRepositoryState] = useState<RepositoryViewState | null>(null);

  const logError = (error: Error) => {
    Sentry.captureException(error);
  };

  const navigateToRepository = (owner: string, name: string) => {
    setRepositoryState({ owner, name });
    setCurrentView('repository');
  };

  const navigateToDashboard = () => {
    setCurrentView('dashboard');
    setRepositoryState(null);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallbackRender={() => null} onError={logError}>
        {currentView === 'dashboard' ? (
          <Dashboard onRepositoryClick={navigateToRepository} />
        ) : (
          repositoryState && (
            <RepositoryDetail
              owner={repositoryState.owner}
              name={repositoryState.name}
              onBack={navigateToDashboard}
            />
          )
        )}
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;

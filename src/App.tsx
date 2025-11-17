import { Dashboard } from "./components/Dashboard";
import { RepositoryDetail } from "./components/RepositoryDetail";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route, BrowserRouter } from "react-router";

import "./App.css";
import * as Sentry from "@sentry/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  const logError = (error: Error) => {
    Sentry.captureException(error);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallbackRender={() => null} onError={logError}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/repository/:owner/:name" element={<RepositoryDetail />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;

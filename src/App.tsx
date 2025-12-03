import { Yarns } from "./components/yarns/Dashboard";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route, BrowserRouter } from "react-router";

import * as Sentry from "@sentry/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Patterns } from "./components/patterns/Dashboard";

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
            <Route path="/" element={<Patterns />} />
            <Route path="/yarns" element={<Yarns />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;

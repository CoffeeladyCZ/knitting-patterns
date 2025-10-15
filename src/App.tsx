import { Dashboard } from "./components/Dashboard";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import * as Sentry from "@sentry/react";

function App() {
  const logError = (error: Error) => {
    Sentry.captureException(error);
  };

  return (
    <>
      <ErrorBoundary fallbackRender={() => null} onError={logError}>
        <Dashboard />
      </ErrorBoundary>
    </>
  );
}

export default App;

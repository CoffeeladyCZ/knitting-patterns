import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/global.css";
import App from "./App.tsx";
import "../sentry.js";
import ReactGA from "react-ga4";
import "../i18n";

ReactGA.initialize(import.meta.env.VITE_GA4_MEASURENT_ID);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

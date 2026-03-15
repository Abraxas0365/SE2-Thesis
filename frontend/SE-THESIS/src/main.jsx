import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "../src/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import { ServerStatusProvider } from "./context/serverStatusContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ServerStatusProvider>
      <App />
      <Toaster richColors position="bottom-right" />
    </ServerStatusProvider>
  </BrowserRouter>,
);

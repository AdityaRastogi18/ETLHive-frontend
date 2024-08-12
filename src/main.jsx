import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/authContext";

const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);

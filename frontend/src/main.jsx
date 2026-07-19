// window.global = window;
// window.process = { env: {} };

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NotificationProvider } from "./context/NotificationContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <NotificationProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </NotificationProvider>
    </BrowserRouter>

);
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GeneralProvider } from "./context/GeneralContext";
import { FirebaseProvider } from "./context/GeneralFirabesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <GeneralProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GeneralProvider>
    </FirebaseProvider>
  </React.StrictMode>
);

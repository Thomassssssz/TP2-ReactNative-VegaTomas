import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { JuegosProvider } from "./context/JuegosContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JuegosProvider>
      <App />
    </JuegosProvider>
  </React.StrictMode>,
);

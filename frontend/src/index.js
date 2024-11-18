import React from "react";
import ReactDOM from "react-dom/client"; // Zmieniono import na nowy moduł React DOM
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Tworzymy root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
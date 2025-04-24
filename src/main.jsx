import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; //Default postoji
// import { App } from './App.jsx' //Default ne postoji
import "../scss/styles.scss";

createRoot(document.getElementById("root")).render(
  <>
    <App number={10} title="Title from main file" text="Text from main file" />
  </>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import DictionaryDashboard from "./components/dict-dashboard/dictionaryDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DictionaryList } from "./components/dict-list/dictionaryList";
import DictionaryAddLanguage from "./components/dict-add-language/dictionaryAddLanguage";
import DictionaryAddDefinition from "./components/dict-add-definition/dictionaryAddDefinition";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DictionaryDashboard />}>
          <Route path="list" element={<DictionaryList />} />
          <Route path="addLanguage" element={<DictionaryAddLanguage />} />
          <Route path="addDefinition" element={<DictionaryAddDefinition />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

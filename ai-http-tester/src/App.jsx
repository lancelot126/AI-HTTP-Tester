import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./pages/Sidebar";
import { Editor } from "./pages/Editor";
import { History } from "./pages/History";
import "./App.css";
import axios from "axios";

function App() {
  const [rawRequest, setRawRequest] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  
  return (
    <>
      <Header />
      <div className="app-container">
        <div className="sidebar-col">
          <Sidebar />
        </div>

        <div className="editor-col">
          <Editor />
        </div>

        <div className="history-col">
          <History />
        </div>
      </div>
    </>
  );
}

export default App;

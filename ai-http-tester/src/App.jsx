import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./pages/Sidebar";
import { Editor } from "./pages/Editor";
import { History } from "./pages/History";
import "./App.css";

function App() {
  const [rawRequest, setRawRequest] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  return (
    <>
      <Header />
      <div className="app-container">
        <div className="sidebar-col">
          <Sidebar 
            rawRequest={rawRequest}
            setRawRequest={setRawRequest}
          />
        </div>

        <div className="editor-col">
          <Editor rawRequest={rawRequest}
                  setRawRequest={setRawRequest}
                  response = {response}
                  setResponse={setResponse}
          />
        </div>

        <div className="history-col">
          <History history={history} setHistory = {setHistory} />
        </div>
      </div>
    </>
  );
}

export default App;

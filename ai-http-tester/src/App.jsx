import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./pages/Sidebar";
import { Editor } from "./pages/Editor";
import { History } from "./pages/History";
import "./App.css";

function App() {
  const [rawRequest, setRawRequest] = useState("");

  return (
    <>
      <p>hello world</p>
      <Header />
      <Sidebar />
      <Editor />
      <History />
    </>
  );
}

export default App;

import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./pages/Sidebar";
import { Editor } from "./pages/Editor";
import { History } from "./pages/History";
import "./App.css";
import axios from 'axios';


function App() {
  const [rawRequest, setRawRequest] = useState("");
  const [ response, setResponse ] = useState("");
  
  return (
    <>
      <Header />
      <Sidebar />
      <Editor />
      <History />
    </>
  );
}

export default App;

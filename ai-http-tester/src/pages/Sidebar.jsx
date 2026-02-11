import "./Sidebar.css";
import { useState } from "react";

export function Sidebar({ rawRequest, setRawRequest }) {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [instruction, setInstruction] = useState("");

  const injectPayload = (param, payload) => {
    // This regex finds "param": "anything" and keeps the structure but swaps the "anything"
    const jsonRegex = new RegExp(`("${param}"\\s*:\\s*")([^"]+)(")`, "g");

    // This regex finds param=anything (for standard URLs)
    const urlRegex = new RegExp(`(${param}=)([^&\\s]+)`, "g");

    let updatedRequest = rawRequest;

    if (rawRequest.includes(`"${param}"`)) {
      // If it looks like JSON, use the JSON swap
      updatedRequest = rawRequest.replace(jsonRegex, `$1${payload}$3`);
    } else {
      // Otherwise, use the URL swap
      updatedRequest = rawRequest.replace(urlRegex, `$1${payload}`);
    }

    setRawRequest(updatedRequest);
  };
  const handleAIResponse = async () => {
    if (!rawRequest) {
      alert("Please enter a raw HTTP request first");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/generate-payloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawRequest, instruction }),
      });

      const data = await res.json();
      setVulnerabilities(data.vulnerabilities || []);
    } catch (err) {
      console.error("AI generation failed", err);
      alert("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card sidebar">
        <div className="section-title">💬 AI Chat</div>
        <div className="muted">
          {loading ? "Analyzing Request..." : "Find Injection Points"}
        </div>

        <div className="muted">
          AI: I found {vulnerabilities.length} vulnerable parameters:
          {vulnerabilities.map((vun, idx) => (
            <div key={idx} className="vulnerability-group">
              <div className="vun-header">
                <span className="param-label">
                  Target: <strong>{vun.parameter}</strong>
                </span>
                <span className="vun-type">{vun.type}</span>
              </div>

              <div className="payload-grid">
                {vun.payloads?.map((payload, pIdx) => (
                  <button
                    key={pIdx}
                    className="payload-pill"
                    onClick={() => injectPayload(vun.parameter, payload)}
                  >
                    {payload}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="muted">
          Generated{" "}
          {vulnerabilities.reduce(
            (acc, v) => acc + (v.payloads?.length || 0),
            0,
          )}{" "}
          payloads for testing
        </div>
      </div>

      <div className="card">
        <div className="prompt-row">
          <input
            className="prompt-input"
            placeholder="Type prompt..."
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
          <button className="btn" onClick={handleAIResponse}>
            Ask AI
          </button>
        </div>
      </div>
    </>
  );
}

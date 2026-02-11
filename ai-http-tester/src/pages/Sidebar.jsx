import "./Sidebar.css";

export function Sidebar() {
  return (
    <>
      <div className="card sidebar">
        <div className="section-title">💬 AI Chat</div>
        <div className="muted">You: give me path traversal payloads</div>
        <div className="muted">
          AI: I found 3 vulnerable parameters: filename (HIGH), id (MEDIUM)
        </div>
        <div className="muted">Generated 8 payloads for testing</div>
      </div>

      <div className="card">
        <div className="prompt-row">
          <input className="prompt-input" placeholder="Type prompt..." />
          <button className="btn">Ask AI</button>
        </div>
      </div>
    </>
  );
}

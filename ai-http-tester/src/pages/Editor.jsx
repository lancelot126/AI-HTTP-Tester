import "./Editor.css";

export function Editor() {
  return <>
    <div className="card editor-block">
      <div className="section-title">📝 REQUEST</div>
      <div className="mono small">POST /api/download
Host: example.com
Cookie: session=abc123
filename: [VALUE]
Payload: ../../etc/passwd
      </div>
      <div className="send-row">
        <button className="btn">🚀 Send Request</button>
      </div>
    </div>

    <div className="card editor-block">
      <div className="section-title">📨 RESPONSE</div>
      <div className="mono small">HTTP/1.1 200 OK
file: /var/www/...
✅ EXPLOIT WORKED
Confidence: 95%
Evidence: Path traversal found
      </div>
      <div className="send-row">
        <button className="btn">Analyze Response</button>
      </div>
    </div>
  </>;
}

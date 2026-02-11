import "./Editor.css";
import { parseRawHTTP } from "../utils/parseRawHTTP";

export function Editor({ rawRequest, setRawRequest, response, setResponse }) {
  const handleSendRequest = async () => {
    const parsedRequest = parseRawHTTP(rawRequest);
    if (!parsedRequest) {
      alert("Invalid raw HTTP request");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedRequest),
      });

      const result = await res.json();
      // 3. Put the answer in the right-hand panel!
      setResponse(JSON.stringify(result.data, null, 2));

    } catch (err) {
      console.error("Request to Node server failed", err);
    }
  };
  return (
    <>
      <div className="card editor-block">
        <div className="section-title">📝 REQUEST</div>
        <div className="mono small">
          <textarea
            value={rawRequest}
            onChange={(e) => setRawRequest(e.target.value)}
            placeholder="Paste your raw HTTP request here"
          ></textarea>
        </div>
        <div className="send-row">
          <button className="btn" onClick={handleSendRequest}>
            🚀 Send Request
          </button>
        </div>
      </div>

      <div className="card editor-block">
        <div className="section-title">📨 RESPONSE</div>
        <div className="mono small">
          {response} hello
        </div>
        <div className="send-row">
          <button className="btn">Analyze Response</button>
        </div>
      </div>
    </>
  );
}

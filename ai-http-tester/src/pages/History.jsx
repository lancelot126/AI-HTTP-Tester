import "./History.css";

export function History({ history, setHistory }) {
  return (
    <>
      <div className="card">
        <div className="section-title">📊 HISTORY</div>
        <div className="history-list">
          <div className="history-item">
            <div>#1 report.pdf</div>
            <div className="meta">200 · 1KB · ❌ Normal</div>
          </div>
          <div className="history-item">
            <div>#2 ../report.pdf</div>
            <div className="meta">403 · 0.3KB · ❌ Blocked</div>
          </div>
          <div className="history-item">
            <div>#3 ../../etc/passwd</div>
            <div className="meta">200 · 1KB · ✅ SUCCESS</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  return <>
    <div className="sidebar">
      💬 AI Chat
    </div>
    <div>
      You: give me path traversal payloads
      AI: I found 3 vulnerable parameters:
      filename (HIGH risk)
      • id (MEDIUM risk) 
      Generated 8 payloads for testing 
    </div>
    <div>
      [Type prompt...                            ] [Ask AI]
    </div>
  </>;
}

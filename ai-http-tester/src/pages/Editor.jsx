export function Editor() {
  return <>
    <div>
      📝 REQUEST
      POST /api/download
      Host: example.com
      Cookie: session=abc123
      filename: [VALUE]│
      Payload:
      [../../etc/passwd     ▼] 
      [🚀 Send Request] 
    </div>
    
    <div>
      📨 RESPONSE 
      HTTP/1.1 200 OK
      file": "/var/www/...
      ✅ EXPLOIT WORKED 
      Confidence: 95% 
      Evidence: 
      Path traversal found
       Server path exposed 
      [Analyze Response]   
    </div>
  </>;
}

export const parseRawHTTP = (raw) => {
  try {
    const lines = raw.split("\n");
    const firstLine = lines[0].split(" ");
    const method = firstLine[0];
    let url = firstLine[1];

    // If the URL in the first line is already full (starts with http), 
    // DON'T add the host header to it.
    if (!url.startsWith("http")) {
      const hostLine = lines.find(l => l.toLowerCase().startsWith("host:"));
      const host = hostLine ? hostLine.split(":")[1].trim() : "";
      url = `https://${host}${url}`;
    }

    // ... rest of your parsing logic for headers and data
    return { method, url, headers: {}, data: null }; 
  } catch (err) {
    return null;
  }
};
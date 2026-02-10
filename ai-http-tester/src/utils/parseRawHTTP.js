export const parseRawHTTP = (rawText) => {
  try {
    const lines = rawText.split("\n");

    // 1. Get the Method and Path from the first line (e.g., "POST /api/data HTTP/1.1")
    const [method, path] = lines[0].split(" ");

    // 2. Find the Host header to build the full URL
    const hostLine = lines.find((line) =>
      line.toLowerCase().startsWith("host:"),
    );
    const host = hostLine ? hostLine.split(": ")[1].trim() : "";

    // We assume https for security, but you can change this
    const fullUrl = `https://${host}${path}`;

    // 3. Separate Headers and Body (separated by a blank line)
    const blankLineIndex = lines.indexOf("");
    const headerLines =
      blankLineIndex === -1 ? lines.slice(1) : lines.slice(1, blankLineIndex);
    const body =
      blankLineIndex === -1 ? "" : lines.slice(blankLineIndex + 1).join("\n");

    // 4. Turn header lines into an object
    const headers = {};
    headerLines.forEach((line) => {
      const [key, value] = line.split(": ");
      if (key && value) headers[key.trim()] = value.trim();
    });

    return { method, url: fullUrl, headers, data: body };
  } catch (err) {
    console.error("Parsing failed", err);
    return null;
  }
};

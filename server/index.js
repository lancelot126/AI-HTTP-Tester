const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  const { url, method, headers, data } = req.body;
  console.log(`Proxying ${method} request to ${url}`);

  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
      timeout: 10000,
      validateStatus: () => true,
    });

    res.json({
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
  } catch (error) {
    console.log(`Error proxying request: ${error.message}`);
    res
      .status(500)
      .json({ error: "The proxy failed to reach the target site." });
  }
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/generate-payloads", async (req, res) => {
  const { rawRequest, instruction } = req.body;
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a web security expert. Analyze the provided raw HTTP request.
          1. Identify injection points (parameters or headers).
          2. Suggest 5 specific payloads for Path Traversal or SQLi.
          3. Return the response as a JSON object only.
          Format: {"vulnerabilities": [{"parameter": "name", "type": "SQLi", "payloads": ["...", "..."]}]}`,
        },
        {
          role: "user",
          content: `
            REQUEST TO ANALYZE: ${rawRequest}
            USER PRIORITIES: ${instruction || "Perform a general security scan."}
          `,
        },
      ],
      model: "llama-3.3-70b-versatile", // This is their strongest free model
      response_format: {
        type: "json_object",
      },
    });

    const airesponse = JSON.parse(completion.choices[0].message.content);
    res.json(airesponse);
  } catch (err) {
    console.error("Error generating payloads", err);
    res.status(500).json({ error: "AI analysis failed." });
  }
});

app.post("/analyze-responses", async (req, res) => {
  const { payload, status, responseData } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a Vulnerability Validation AI. 
          Analyze the HTTP response to determine if the attack payload was successful.
          Look for:
          1. System file content (e.g., /etc/passwd contents like 'root:x:0:0').
          2. Database error strings (e.g., 'SQL syntax error', 'PDOException').
          3. Information disclosure (e.g., internal IP addresses, stack traces).
          4. Logic bypass (e.g., a 200 OK status when a 403 Forbidden was expected).
          
          Return a JSON object: 
          {"success": true/false, "explanation": "Briefly why", "finding": "The specific data leaked or error found"}`
        },
        {
          role: "user",
          content: `Payload Sent: ${payload}
                    Response Status: ${status}
                    Response Body: ${JSON.stringify(responseData).substring(0, 2000)}` 
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: {
        type: "json_object",
      }
    });

    res.json(JSON.parse(completion.choices[0].message.content));
  } catch (err) {
    res.status(500).json({ error: "AI Analysis failed." });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

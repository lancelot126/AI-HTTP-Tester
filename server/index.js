const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { GROQ } = require("groq-sdk");
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

const groq = new GROQ({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/generate-payloads", async (req, res) => {
  const { rawRequest } = req.body;
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
            content: rawRequest
        }
      ],
      model: "llama-3.3-70b-versatile", // This is their strongest free model
      response_format: {
        type: "json_object",
      }
    });

    const airesponse = JSON.parse(completion.choices[0].message.content);
    res.json(airesponse);
  } catch (err) {
    console.error("Error generating payloads", err);
    res.status(500).json({ error: "AI analysis failed." });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

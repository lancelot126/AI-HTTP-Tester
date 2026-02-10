const express = require("express");
const cors = require("cors");
const axios = require("axios");

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

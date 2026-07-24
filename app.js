const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Watch Fox is running",
    time: new Date().toISOString()
  });
});

// Simple health check endpoint - useful later for monitoring/deploys
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Watch Fox listening on port ${PORT}`);
});

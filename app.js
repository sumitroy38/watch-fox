const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

// Serves the dashboard (index.html) and logo image from the public/ folder.
// A request to "/" will automatically be served index.html.
app.use(express.static(path.join(__dirname, "public")));

// Keep a plain JSON root response too, reachable at /api so the dashboard
// and the original JSON status check can both exist.
app.get("/api", (req, res) => {
  res.json({
    message: "Watch Fox is running",
    time: new Date().toISOString()
  });
});

// Simple health check endpoint - useful later for monitoring/deploys
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Simulates a failure - lets us test the CloudWatch -> Lambda -> Claude
// alert pipeline on demand, without waiting for a real bug.
app.get("/simulate-error", (req, res) => {
  console.error("ERROR: Failed to connect to database - connection timed out after 5000ms at host db.watchfox.internal:5432");
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Watch Fox listening on port ${PORT}`);
});

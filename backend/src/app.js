const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const positionRoutes = require("./routes/positionRoutes");
const riskRoutes = require("./routes/riskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const snapshotRoutes = require("./routes/snapshotRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "test" ? "tiny" : "dev"));

app.use("/api", rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 200,
  standardHeaders: true,
  legacyHeaders: false
}));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "RiskGuard Portfolio API",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/risk", riskRoutes);
app.use("/api/snapshots", snapshotRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
const mongoose = require("mongoose");

const portfolioSnapshotSchema = new mongoose.Schema({
  portfolioValue: { type: Number, required: true, min: 0 },
  cashValue: { type: Number, default: 0, min: 0 },
  investedValue: { type: Number, default: 0, min: 0 },
  totalRisk: { type: Number, default: 0, min: 0 },
  date: { type: Date, default: Date.now, required: true }
}, { timestamps: true });

module.exports = mongoose.model("PortfolioSnapshot", portfolioSnapshotSchema);
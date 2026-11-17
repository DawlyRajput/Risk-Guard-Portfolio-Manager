const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  symbol: { type: String, required: true, trim: true, uppercase: true, maxlength: 20 },
  assetName: { type: String, required: true, trim: true, maxlength: 100 },
  side: { type: String, enum: ["LONG", "SHORT"], default: "LONG" },
  quantity: { type: Number, required: true, min: 0.000001 },
  entryPrice: { type: Number, required: true, min: 0 },
  currentPrice: { type: Number, required: true, min: 0 },
  stopLoss: { type: Number, required: true, min: 0 },
  targetPrice: { type: Number, default: null, min: 0 },
  accountSize: { type: Number, required: true, min: 0 },
  riskPercent: { type: Number, required: true, min: 0, max: 100 },
  notes: { type: String, default: "", maxlength: 500 }
}, { timestamps: true });

module.exports = mongoose.model("Position", positionSchema);
const Position = require("../models/Position");
const {
  calculatePositionRisk,
  calculatePositionSize,
  calculateStressTest
} = require("../services/riskService");

const calculateRisk = async (req, res) => {
  res.json({ success: true, data: calculatePositionRisk(req.body) });
};

const calculatePosition = async (req, res) => {
  res.json({ success: true, data: calculatePositionSize(req.body) });
};

const stressTest = async (req, res) => {
  const positions = await Position.find().lean();
  res.json({
    success: true,
    data: calculateStressTest({ positions, dropPercent: req.body.dropPercent })
  });
};

module.exports = { calculateRisk, calculatePosition, stressTest };
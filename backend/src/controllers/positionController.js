const Position = require("../models/Position");
const { calculatePositionRisk } = require("../services/riskService");

const enrich = position => ({
  ...position,
  risk: calculatePositionRisk({
    side: position.side,
    quantity: position.quantity,
    entryPrice: position.entryPrice,
    currentPrice: position.currentPrice,
    stopLoss: position.stopLoss,
    targetPrice: position.targetPrice,
    accountSize: position.accountSize
  })
});

const getPositions = async (req, res) => {
  const positions = await Position.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, count: positions.length, data: positions.map(enrich) });
};

const getPosition = async (req, res) => {
  const position = await Position.findById(req.params.id).lean();
  if (!position) {
    const error = new Error("Position not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ success: true, data: enrich(position) });
};

const createPosition = async (req, res) => {
  const position = await Position.create(req.body);
  res.status(201).json({
    success: true,
    message: "Position created successfully",
    data: enrich(position.toObject())
  });
};

const deletePosition = async (req, res) => {
  const position = await Position.findByIdAndDelete(req.params.id);
  if (!position) {
    const error = new Error("Position not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ success: true, message: "Position deleted successfully" });
};

module.exports = { getPositions, getPosition, createPosition, deletePosition };
const PortfolioSnapshot = require("../models/PortfolioSnapshot");

const getSnapshots = async (req, res) => {
  const snapshots = await PortfolioSnapshot.find().sort({ date: 1 }).lean();
  res.json({ success: true, count: snapshots.length, data: snapshots });
};

const createSnapshot = async (req, res) => {
  const snapshot = await PortfolioSnapshot.create(req.body);
  res.status(201).json({
    success: true,
    message: "Portfolio snapshot created",
    data: snapshot
  });
};

module.exports = { getSnapshots, createSnapshot };
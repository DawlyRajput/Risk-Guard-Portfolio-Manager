const Position = require("../models/Position");
const PortfolioSnapshot = require("../models/PortfolioSnapshot");
const {
  calculatePositionRisk,
  calculateMaxDrawdown
} = require("../services/riskService");

const getDashboard = async (req, res) => {
  const [positions, snapshots] = await Promise.all([
    Position.find().sort({ createdAt: -1 }).lean(),
    PortfolioSnapshot.find().sort({ date: 1 }).lean()
  ]);

  let totalExposure = 0;
  let totalRisk = 0;
  let unrealizedPnL = 0;

  const enrichedPositions = positions.map(position => {
    const risk = calculatePositionRisk({
      side: position.side,
      quantity: position.quantity,
      entryPrice: position.entryPrice,
      currentPrice: position.currentPrice,
      stopLoss: position.stopLoss,
      targetPrice: position.targetPrice,
      accountSize: position.accountSize
    });
    totalExposure += risk.currentValue;
    totalRisk += risk.totalRisk;
    unrealizedPnL += risk.unrealizedPnL;
    return { ...position, risk };
  });

  const portfolioValue = snapshots.length
    ? snapshots[snapshots.length - 1].portfolioValue
    : totalExposure;

  let riskLevel = "LOW";
  const riskRatio = portfolioValue ? totalRisk / portfolioValue : 0;
  if (riskRatio >= 0.05) riskLevel = "HIGH";
  else if (riskRatio >= 0.02) riskLevel = "MEDIUM";

  res.json({
    success: true,
    data: {
      portfolioValue,
      totalExposure,
      totalRisk,
      unrealizedPnL,
      maxDrawdown: calculateMaxDrawdown(snapshots),
      riskLevel,
      positionCount: positions.length,
      positions: enrichedPositions,
      chart: snapshots.map(snapshot => ({
        date: snapshot.date,
        value: snapshot.portfolioValue
      }))
    }
  });
};

module.exports = { getDashboard };
const round = (value, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const calculatePositionRisk = ({
  side, quantity, entryPrice, currentPrice,
  stopLoss, targetPrice, accountSize
}) => {
  if (quantity <= 0 || entryPrice <= 0 || currentPrice < 0 || stopLoss < 0 || accountSize <= 0) {
    throw new Error("Invalid financial values");
  }

  const riskPerUnit = side === "SHORT"
    ? stopLoss - entryPrice
    : entryPrice - stopLoss;

  const unrealizedPnL = side === "SHORT"
    ? (entryPrice - currentPrice) * quantity
    : (currentPrice - entryPrice) * quantity;

  const rewardPerUnit = targetPrice == null
    ? null
    : side === "SHORT"
      ? entryPrice - targetPrice
      : targetPrice - entryPrice;

  if (riskPerUnit <= 0) {
    throw new Error("Stop-loss must represent a real risk for the selected position side");
  }

  const positionValue = entryPrice * quantity;
  const currentValue = currentPrice * quantity;
  const totalRisk = riskPerUnit * quantity;
  const riskPercentage = (totalRisk / accountSize) * 100;

  const riskRewardRatio = rewardPerUnit != null && rewardPerUnit > 0
    ? rewardPerUnit / riskPerUnit
    : null;

  let riskLevel = "LOW";
  if (riskPercentage >= 5) riskLevel = "HIGH";
  else if (riskPercentage >= 2) riskLevel = "MEDIUM";

  return {
    positionValue: round(positionValue),
    currentValue: round(currentValue),
    riskPerUnit: round(riskPerUnit),
    totalRisk: round(totalRisk),
    riskPercentage: round(riskPercentage),
    riskRewardRatio: riskRewardRatio == null ? null : round(riskRewardRatio),
    unrealizedPnL: round(unrealizedPnL),
    unrealizedPnLPercentage: positionValue ? round((unrealizedPnL / positionValue) * 100) : 0,
    riskLevel
  };
};

const calculatePositionSize = ({ accountSize, riskPercent, entryPrice, stopLoss }) => {
  const riskAmount = accountSize * (riskPercent / 100);
  const riskPerUnit = Math.abs(entryPrice - stopLoss);
  if (riskAmount <= 0 || riskPerUnit <= 0) throw new Error("Invalid calculator values");
  const quantity = riskAmount / riskPerUnit;
  return {
    riskAmount: round(riskAmount),
    riskPerUnit: round(riskPerUnit),
    quantity: round(quantity, 6),
    positionValue: round(quantity * entryPrice)
  };
};

const calculateStressTest = ({ positions, dropPercent }) => {
  if (![10, 20, 30].includes(Number(dropPercent))) {
    throw new Error("Stress test supports 10%, 20%, or 30% market drops");
  }

  const percentage = Number(dropPercent) / 100;
  let currentPortfolioValue = 0;
  let stressedPortfolioValue = 0;

  const results = positions.map(position => {
    const currentValue = position.currentPrice * position.quantity;
    const stressedPrice = position.currentPrice * (1 - percentage);
    const stressedValue = stressedPrice * position.quantity;
    const impact = stressedValue - currentValue;

    currentPortfolioValue += currentValue;
    stressedPortfolioValue += stressedValue;

    return {
      symbol: position.symbol,
      currentPrice: round(position.currentPrice),
      stressedPrice: round(stressedPrice),
      currentValue: round(currentValue),
      stressedValue: round(stressedValue),
      impact: round(impact)
    };
  });

  return {
    dropPercent: Number(dropPercent),
    currentPortfolioValue: round(currentPortfolioValue),
    stressedPortfolioValue: round(stressedPortfolioValue),
    totalImpact: round(stressedPortfolioValue - currentPortfolioValue),
    results
  };
};

const calculateMaxDrawdown = snapshots => {
  if (!snapshots.length) return 0;
  let peak = snapshots[0].portfolioValue;
  let maxDrawdown = 0;

  for (const snapshot of snapshots) {
    peak = Math.max(peak, snapshot.portfolioValue);
    if (peak > 0) {
      maxDrawdown = Math.max(maxDrawdown, ((peak - snapshot.portfolioValue) / peak) * 100);
    }
  }
  return round(maxDrawdown);
};

module.exports = {
  calculatePositionRisk,
  calculatePositionSize,
  calculateStressTest,
  calculateMaxDrawdown
};
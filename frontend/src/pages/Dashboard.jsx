import MetricCard from "../components/MetricCard";
import PortfolioChart from "../components/PortfolioChart";
import PositionTable from "../components/PositionTable";
import RiskBadge from "../components/RiskBadge";

const money = n => `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export default function Dashboard({ dashboard, onDelete }) {
  const d = dashboard || {};
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Risk Dashboard</h1>
        <p className="text-slate-500 mt-1">Monitor portfolio exposure and risk in real time.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <MetricCard label="Portfolio Value" value={money(d.portfolioValue)} />
        <MetricCard label="Total Exposure" value={money(d.totalExposure)} />
        <MetricCard label="Total Risk" value={money(d.totalRisk)} danger={d.riskLevel === "HIGH"} />
        <MetricCard label="Max Drawdown" value={`${d.maxDrawdown || 0}%`} />
        <MetricCard label="Overall Risk" value={<RiskBadge level={d.riskLevel || "LOW"} />} />
      </div>

      <section className="rounded-2xl border border-line bg-panel p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold">Portfolio Value</h2>
            <p className="text-xs text-slate-500 mt-1">Historical portfolio snapshots</p>
          </div>
          <div className="text-emerald-400 text-sm">P&L {money(d.unrealizedPnL)}</div>
        </div>
        <PortfolioChart data={d.chart} />
      </section>

      <section className="rounded-2xl border border-line bg-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Open Positions</h2>
          <span className="text-xs text-slate-500">{d.positionCount || 0} positions</span>
        </div>
        <PositionTable positions={d.positions} onDelete={onDelete} />
      </section>
    </div>
  );
}
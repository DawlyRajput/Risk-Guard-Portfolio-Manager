import { Trash2 } from "lucide-react";
import RiskBadge from "./RiskBadge";

const money = n => `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export default function PositionTable({ positions, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-slate-500 border-b border-line">
          <tr>
            {["Asset", "Side", "Qty", "Entry", "Current", "Risk", "P&L", ""].map(h => (
              <th key={h} className="text-left py-3 px-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {positions?.map(p => (
            <tr key={p._id} className="border-b border-line/70 hover:bg-white/[0.02]">
              <td className="py-4 px-3">
                <div className="font-semibold">{p.symbol}</div>
                <div className="text-xs text-slate-500">{p.assetName}</div>
              </td>
              <td className="px-3">
                <span className={p.side === "LONG" ? "text-emerald-400" : "text-red-400"}>{p.side}</span>
              </td>
              <td className="px-3">{p.quantity}</td>
              <td className="px-3">{money(p.entryPrice)}</td>
              <td className="px-3">{money(p.currentPrice)}</td>
              <td className="px-3">
                <div><RiskBadge level={p.risk.riskLevel} /></div>
                <div className="text-xs text-slate-500 mt-1">{p.risk.riskPercentage}% / {money(p.risk.totalRisk)}</div>
              </td>
              <td className={`px-3 font-medium ${p.risk.unrealizedPnL >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {money(p.risk.unrealizedPnL)}
              </td>
              <td className="px-3">
                <button onClick={() => onDelete(p._id)} className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {!positions?.length && (
            <tr><td colSpan="8" className="py-12 text-center text-slate-500">No open positions yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
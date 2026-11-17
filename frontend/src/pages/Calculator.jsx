import { useState } from "react";
import { calculateRisk, calculatePositionSize } from "../services/api";

export default function Calculator() {
  const [form, setForm] = useState({
    side: "LONG", quantity: 100, entryPrice: 2500, currentPrice: 2630,
    stopLoss: 2400, targetPrice: 2800, accountSize: 100000, riskPercent: 2
  });
  const [result, setResult] = useState(null);
  const [size, setSize] = useState(null);
  const [error, setError] = useState("");

  const update = e => setForm({ ...form, [e.target.name]: e.target.name === "side" ? e.target.value : Number(e.target.value) });

  const calculate = async e => {
    e.preventDefault();
    setError("");
    try {
      const [risk, position] = await Promise.all([
        calculateRisk({ ...form, targetPrice: form.targetPrice || null }),
        calculatePositionSize({
          accountSize: form.accountSize,
          riskPercent: form.riskPercent,
          entryPrice: form.entryPrice,
          stopLoss: form.stopLoss
        })
      ]);
      setResult(risk.data.data);
      setSize(position.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const fields = [
    ["quantity","Quantity"],["entryPrice","Entry Price"],["currentPrice","Current Price"],
    ["stopLoss","Stop Loss"],["targetPrice","Target Price"],["accountSize","Account Size"],["riskPercent","Risk %"]
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Risk Calculator</h1>
        <p className="text-slate-500 mt-1">Calculate position sizing, risk exposure and risk/reward.</p>
      </div>

      <div className="grid xl:grid-cols-[1.2fr_.8fr] gap-6">
        <form onSubmit={calculate} className="rounded-2xl border border-line bg-panel p-6 grid sm:grid-cols-2 gap-4">
          <label className="space-y-1.5 sm:col-span-2"><span className="text-xs text-slate-400">Position Side</span>
            <select name="side" value={form.side} onChange={update} className="w-full rounded-xl border border-line bg-ink px-3 py-2.5">
              <option>LONG</option><option>SHORT</option>
            </select>
          </label>
          {fields.map(([name,label]) => (
            <label key={name} className="space-y-1.5"><span className="text-xs text-slate-400">{label}</span>
              <input name={name} type="number" step="any" value={form[name]} onChange={update} className="w-full rounded-xl border border-line bg-ink px-3 py-2.5" />
            </label>
          ))}
          <button className="sm:col-span-2 rounded-xl bg-accent py-3 font-semibold">Calculate Risk</button>
          {error && <div className="sm:col-span-2 text-red-400 text-sm">{error}</div>}
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-panel p-6">
            <h2 className="font-semibold mb-4">Risk Result</h2>
            {result ? (
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Risk Level", result.riskLevel],
                  ["Risk %", `${result.riskPercentage}%`],
                  ["Total Risk", `₹${result.totalRisk.toLocaleString()}`],
                  ["R:R", result.riskRewardRatio ? `${result.riskRewardRatio}:1` : "—"],
                  ["P&L", `₹${result.unrealizedPnL.toLocaleString()}`],
                  ["P&L %", `${result.unrealizedPnLPercentage}%`]
                ].map(([k,v]) => <div key={k} className="rounded-xl bg-ink border border-line p-4"><div className="text-xs text-slate-500">{k}</div><div className="mt-1 font-semibold">{v}</div></div>)}
              </div>
            ) : <p className="text-slate-500 text-sm">Enter values and calculate.</p>}
          </div>

          <div className="rounded-2xl border border-line bg-panel p-6">
            <h2 className="font-semibold mb-4">Recommended Position Size</h2>
            {size ? (
              <div className="space-y-3">
                <div className="text-4xl font-bold text-accent">{size.quantity}</div>
                <div className="text-sm text-slate-500">units/shares</div>
                <div className="flex justify-between text-sm"><span>Maximum risk</span><b>₹{size.riskAmount.toLocaleString()}</b></div>
                <div className="flex justify-between text-sm"><span>Position value</span><b>₹{size.positionValue.toLocaleString()}</b></div>
              </div>
            ) : <p className="text-slate-500 text-sm">Calculated position size appears here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
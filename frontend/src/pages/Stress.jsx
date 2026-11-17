import { useState } from "react";
import { stressTest } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Stress() {
  const [drop, setDrop] = useState(20);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const run = async () => {
    setError("");
    try {
      const response = await stressTest({ dropPercent: Number(drop) });
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const data = result?.results?.map(r => ({
    symbol: r.symbol,
    current: r.currentValue,
    stressed: r.stressedValue
  })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stress Tester</h1>
        <p className="text-slate-500 mt-1">Simulate portfolio performance under a broad market decline.</p>
      </div>

      <section className="rounded-2xl border border-line bg-panel p-6">
        <div className="flex flex-wrap gap-3">
          {[10,20,30].map(v => (
            <button key={v} onClick={() => setDrop(v)} className={`px-5 py-2.5 rounded-xl border ${drop === v ? "border-accent bg-accent/15" : "border-line"}`}>
              Market -{v}%
            </button>
          ))}
          <button onClick={run} className="px-5 py-2.5 rounded-xl bg-accent font-semibold">Run Test</button>
        </div>
        {error && <div className="text-red-400 text-sm mt-4">{error}</div>}
      </section>

      {result && (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-line bg-panel p-5"><div className="text-slate-500 text-sm">Current</div><div className="text-2xl font-bold mt-2">₹{result.currentPortfolioValue.toLocaleString()}</div></div>
            <div className="rounded-2xl border border-line bg-panel p-5"><div className="text-slate-500 text-sm">Stressed</div><div className="text-2xl font-bold mt-2">₹{result.stressedPortfolioValue.toLocaleString()}</div></div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5"><div className="text-slate-500 text-sm">Impact</div><div className="text-2xl font-bold mt-2 text-red-400">₹{result.totalImpact.toLocaleString()}</div></div>
          </div>

          <section className="rounded-2xl border border-line bg-panel p-5">
            <h2 className="font-semibold mb-4">Position Impact</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid stroke="#26324a" strokeDasharray="3 3" />
                  <XAxis dataKey="symbol" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ background: "#111a2d", border: "1px solid #26324a" }} />
                  <Bar dataKey="current" fill="#7c5cff" />
                  <Bar dataKey="stressed" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
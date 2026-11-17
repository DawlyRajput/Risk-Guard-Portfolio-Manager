export default function MetricCard({ label, value, sub, danger }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5 shadow-glow">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`mt-3 text-2xl font-bold ${danger ? "text-red-400" : "text-white"}`}>{value}</div>
      {sub && <div className="mt-2 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}
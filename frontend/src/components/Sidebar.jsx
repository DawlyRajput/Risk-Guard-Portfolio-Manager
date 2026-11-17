import { LayoutDashboard, Calculator, BriefcaseBusiness, ShieldAlert, Activity } from "lucide-react";

const items = [
  ["dashboard", "Dashboard", LayoutDashboard],
  ["calculator", "Risk Calculator", Calculator],
  ["positions", "Positions", BriefcaseBusiness],
  ["stress", "Stress Tester", ShieldAlert]
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 border-r border-line bg-panel/70 min-h-screen p-5 flex-col">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 grid place-items-center text-accent">
          <Activity size={22} />
        </div>
        <div>
          <div className="font-bold tracking-tight">RiskGuard</div>
          <div className="text-xs text-slate-500">Portfolio Manager</div>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {items.map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition ${
              page === id
                ? "bg-accent/15 text-white border border-accent/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-line bg-ink/70 p-4">
        <div className="text-xs text-slate-500">Risk Engine</div>
        <div className="mt-1 text-sm font-semibold">Operational</div>
        <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-full bg-emerald-400 rounded-full" />
        </div>
      </div>
    </aside>
  );
}
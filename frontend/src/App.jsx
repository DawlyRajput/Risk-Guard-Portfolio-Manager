import { useEffect, useState } from "react";
import { Menu, RefreshCw } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import Positions from "./pages/Positions";
import Stress from "./pages/Stress";
import {
  getDashboard, createPosition, deletePosition
} from "./services/api";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [dashboard, setDashboard] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getDashboard();
      setDashboard(response.data.data);
    } catch (err) {
      setError("Cannot connect to backend. Start the API on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const add = async payload => {
    try {
      await createPosition(payload);
      await load();
      setPage("positions");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const remove = async id => {
    if (!confirm("Delete this position?")) return;
    try {
      await deletePosition(id);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const content = {
    dashboard: <Dashboard dashboard={dashboard} onDelete={remove} />,
    calculator: <Calculator />,
    positions: <Positions positions={dashboard?.positions || []} onCreate={add} onDelete={remove} />,
    stress: <Stress />
  }[page];

  return (
    <div className="min-h-screen bg-ink text-white flex">
      <Sidebar page={page} setPage={setPage} />

      {mobile && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobile(false)}>
          <div className="w-72 h-full bg-panel p-5" onClick={e => e.stopPropagation()}>
            <div className="font-bold text-lg mb-6">RiskGuard</div>
            {["dashboard","calculator","positions","stress"].map(id => (
              <button key={id} onClick={() => { setPage(id); setMobile(false); }} className="block w-full text-left py-3 text-slate-300">
                {id[0].toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0">
        <header className="h-16 border-b border-line bg-panel/50 backdrop-blur flex items-center justify-between px-4 sm:px-8">
          <button onClick={() => setMobile(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5"><Menu size={20} /></button>
          <div className="text-sm text-slate-500 hidden sm:block">Portfolio risk intelligence</div>
          <button onClick={load} className="p-2 rounded-lg hover:bg-white/5 text-slate-400" title="Refresh">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </header>

        <div className="p-4 sm:p-8 max-w-[1500px] mx-auto">
          {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 px-4 py-3 text-sm">{error}</div>}
          {content}
        </div>
      </main>
    </div>
  );
}
import PositionForm from "../components/PositionForm";
import PositionTable from "../components/PositionTable";

export default function Positions({ positions, onCreate, onDelete }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Positions</h1>
        <p className="text-slate-500 mt-1">Add and manage current open positions.</p>
      </div>

      <section className="rounded-2xl border border-line bg-panel p-6">
        <h2 className="font-semibold mb-5">Add New Position</h2>
        <PositionForm onSubmit={onCreate} />
      </section>

      <section className="rounded-2xl border border-line bg-panel p-5">
        <h2 className="font-semibold mb-4">Risk Log</h2>
        <PositionTable positions={positions} onDelete={onDelete} />
      </section>
    </div>
  );
}
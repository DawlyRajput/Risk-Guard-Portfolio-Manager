import { useState } from "react";

const initial = {
  symbol: "", assetName: "", side: "LONG", quantity: "",
  entryPrice: "", currentPrice: "", stopLoss: "", targetPrice: "",
  accountSize: "100000", riskPercent: "2", notes: ""
};

export default function PositionForm({ onSubmit }) {
  const [form, setForm] = useState(initial);

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    const numeric = ["quantity","entryPrice","currentPrice","stopLoss","targetPrice","accountSize","riskPercent"];
    const payload = { ...form };
    numeric.forEach(k => payload[k] = payload[k] === "" ? null : Number(payload[k]));
    await onSubmit(payload);
    setForm(initial);
  };

  const fields = [
    ["symbol","Symbol","e.g. RELIANCE"],
    ["assetName","Asset Name","Reliance Industries"],
    ["quantity","Quantity","100"],
    ["entryPrice","Entry Price","2500"],
    ["currentPrice","Current Price","2630"],
    ["stopLoss","Stop Loss","2400"],
    ["targetPrice","Target Price","2800"],
    ["accountSize","Account Size","100000"],
    ["riskPercent","Risk %","2"]
  ];

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      {fields.map(([name, label, placeholder]) => (
        <label key={name} className="space-y-1.5">
          <span className="text-xs text-slate-400">{label}</span>
          <input
            required={name !== "targetPrice"}
            name={name}
            value={form[name]}
            onChange={update}
            placeholder={placeholder}
            type={["quantity","entryPrice","currentPrice","stopLoss","targetPrice","accountSize","riskPercent"].includes(name) ? "number" : "text"}
            step="any"
            className="w-full rounded-xl border border-line bg-ink px-3 py-2.5 outline-none focus:border-accent"
          />
        </label>
      ))}

      <label className="space-y-1.5">
        <span className="text-xs text-slate-400">Side</span>
        <select name="side" value={form.side} onChange={update} className="w-full rounded-xl border border-line bg-ink px-3 py-2.5">
          <option>LONG</option>
          <option>SHORT</option>
        </select>
      </label>

      <label className="md:col-span-2 space-y-1.5">
        <span className="text-xs text-slate-400">Notes</span>
        <textarea name="notes" value={form.notes} onChange={update} className="w-full rounded-xl border border-line bg-ink px-3 py-2.5 min-h-20" />
      </label>

      <button className="md:col-span-2 rounded-xl bg-accent px-4 py-3 font-semibold hover:opacity-90">
        Add Position
      </button>
    </form>
  );
}
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

export default function PortfolioChart({ data }) {
  const chartData = data?.length
    ? data.map(item => ({ date: new Date(item.date).toLocaleDateString(), value: item.value }))
    : [{ date: "Now", value: 0 }];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c5cff" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#7c5cff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#26324a" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip contentStyle={{ background: "#111a2d", border: "1px solid #26324a", borderRadius: 12 }} />
          <Area type="monotone" dataKey="value" stroke="#8b72ff" fill="url(#riskFill)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
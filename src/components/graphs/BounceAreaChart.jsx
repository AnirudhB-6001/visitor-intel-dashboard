import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function BounceAreaChart({ data }) {
  const bounceData = data.map((entry, index) => ({
    time: index + 1,
    bounced: entry.derived_bounced === "Yes" ? 1 : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={bounceData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
        <defs>
          <linearGradient id="colorBounce" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="time" tick={{ fill: '#ccc' }} />
        <YAxis tick={{ fill: '#ccc' }} />
        <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
        <Legend wrapperStyle={{ color: '#ccc' }} />
        <Area
          type="monotone"
          dataKey="bounced"
          stroke="#f87171"
          fillOpacity={1}
          fill="url(#colorBounce)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default BounceAreaChart;
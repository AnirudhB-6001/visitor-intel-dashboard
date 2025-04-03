import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#60a5fa", "#818cf8", "#f472b6", "#34d399", "#fbbf24", "#f87171"];

function CountryPieChart({ data }) {
  const countryCounts = data.reduce((acc, curr) => {
    acc[curr.country] = (acc[curr.country] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(countryCounts).map(([country, count]) => ({
    name: country,
    value: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="value"
          label={({ name }) => name}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
        <Legend wrapperStyle={{ color: '#ccc' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CountryPieChart;
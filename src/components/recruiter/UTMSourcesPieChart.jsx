// components/recruiter/UTMSourcesPieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#38bdf8", // sky
  "#818cf8", // indigo
  "#34d399", // green
  "#fbbf24", // yellow
  "#f472b6", // pink
  "#fb7185", // red
];

function UTMSourcesPieChart({ data }) {
  // Filter only those visits that have a utm_source
  const recruiterData = data.filter((d) => d.utm_source);

  // Group by utm_source
  const sourceMap = recruiterData.reduce((acc, curr) => {
    const key = curr.utm_source.toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(sourceMap).map(([key, value]) => ({
    name: key,
    value,
  }));

  if (chartData.length === 0) {
    return <div className="text-slate-400 text-sm">No recruiter UTM data yet.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          innerRadius={40}
          fill="#8884d8"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default UTMSourcesPieChart;
// src/components/recruiter/RecruiterTrafficLineChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

function RecruiterTrafficLineChart({ data }) {
  // Filter recruiter data
  const recruiterData = data.filter((d) => d.utm_source);

  // Aggregate visits by date
  const visitCounts = recruiterData.reduce((acc, curr) => {
    const date = dayjs(curr.timestamp).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Convert to array and sort by date
  const chartData = Object.entries(visitCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#cbd5e1", fontSize: 12 }}
          angle={-45}
          textAnchor="end"
        />
        <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
          labelStyle={{ color: "#94a3b8" }}
          itemStyle={{ color: "#facc15" }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#38bdf8"
          strokeWidth={3}
          dot={{ fill: "#38bdf8", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default RecruiterTrafficLineChart;
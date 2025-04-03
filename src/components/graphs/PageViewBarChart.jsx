import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PageViewBarChart({ data }) {
  const pageCounts = data.reduce((acc, curr) => {
    acc[curr.page] = (acc[curr.page] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(pageCounts).map(([page, count]) => ({
    page,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="page" angle={-15} textAnchor="end" tick={{ fill: '#ccc' }} />
        <YAxis tick={{ fill: '#ccc' }} />
        <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
        <Legend wrapperStyle={{ color: '#ccc' }} />
        <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PageViewBarChart;
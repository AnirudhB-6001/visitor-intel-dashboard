// File: src/components/GraphView.jsx

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function GraphView({ data }) {
  // Example: Count of visits per page
  const pageCounts = data.reduce((acc, curr) => {
    acc[curr.page] = (acc[curr.page] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(pageCounts).map(([page, count]) => ({
    page,
    count,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Page Visits Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="page" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphView;
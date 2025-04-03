import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DeviceLineChart({ data }) {
  const deviceMap = {};
  data.forEach((item, index) => {
    const time = index + 1;
    deviceMap[time] = deviceMap[time] || { time };
    deviceMap[time][item.device] = (deviceMap[time][item.device] || 0) + 1;
  });

  const chartData = Object.values(deviceMap);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="time" tick={{ fill: '#ccc' }} />
        <YAxis tick={{ fill: '#ccc' }} />
        <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
        <Legend wrapperStyle={{ color: '#ccc' }} />
        <Line type="monotone" dataKey="Desktop" stroke="#60a5fa" strokeWidth={2} />
        <Line type="monotone" dataKey="Mobile" stroke="#34d399" strokeWidth={2} />
        <Line type="monotone" dataKey="Tablet" stroke="#f472b6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DeviceLineChart;